<template>
  <view :class="treeClass" :style="treeStyle">
    <view
      v-if="
        lazy && !!load && (loadStatus !== 'loaded' || treeData.length === 0)
      "
      :class="bem.e('load-status')"
    >
      <sar-loading v-if="loadStatus === 'loading'" />
      <text
        v-else-if="loadStatus === 'error'"
        :class="bem.e('error')"
        @click="onErrorClick"
      >
        {{ t('error') }}
      </text>
      <text v-else-if="loadStatus === 'loaded' && treeData.length === 0">
        {{ t('noData') }}
      </text>
    </view>
    <template v-for="(node, index) of treeData" :key="node.key">
      <sar-tree-node v-if="node.visible" :index="index" :node="node" />
    </template>
  </view>

  <sar-popover
    v-if="editable"
    :options="popoverOptions"
    theme="dark"
    position="left"
    :controller="popover"
    direction="vertical"
    @select="onPopoverSelect"
  />

  <sar-dialog
    v-model:visible="dialogVisible"
    :title="currentEditTitle"
    :before-close="beforeClose"
    @visible-hook="onVisibleHook"
  >
    <view :class="bem.e('input-wrapper')">
      <sar-input
        v-model="currentEditValue"
        :placeholder="t('please')"
        :focus="focused"
      />
    </view>
  </sar-dialog>

  <sar-toast v-model:visible="toastVisible" :title="t('please')" />
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref, shallowRef, toRef, watch } from 'vue'
import {
  type NodeRect,
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  walkAncestor,
  walkNodes,
  walkDescendant,
  setCheckedRecursively,
  updateAncestorsChecked,
  initializeCheckNodes,
  getTreeCheckedKeys,
  getTreeHalfCheckedKeys,
} from '../../utils'
import {
  type TreeProps,
  type TreeEmits,
  type TreeExpose,
  type TreeNode,
  type TreeStateNode,
  type TreeContext,
  type TreeCleanNode,
  defaultNodeKeys,
  treeContextSymbol,
  defaultTreeProps,
} from './common'
import SarTreeNode from '../tree-node/tree-node.vue'
import SarPopover from '../popover/popover.vue'
import SarLoading from '../loading/loading.vue'
import { usePopover } from '../popover'
import SarInput from '../input/input.vue'
import { type MenuOption } from '../menu'
import SarDialog from '../dialog/dialog.vue'
import SarToast from '../toast/toast.vue'
import { type DialogProps } from '../dialog'
import { useTranslate } from '../locale'
import { type TransitionHookName } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<TreeProps>(), defaultTreeProps())

const emit = defineEmits<TreeEmits>()

const bem = createBem('tree')

const { t } = useTranslate('tree')

// main
const fieldKeys = computed(() => {
  return Object.assign({}, defaultNodeKeys, props.nodeKeys)
})

const treeData = ref<TreeStateNode[]>([])

let treeMap: Record<string | number, TreeStateNode> = {}

const totalLevel = ref(0)

// methods
const toTreeStateNodes = (nodes: TreeNode[], parent: TreeStateNode | null) => {
  return nodes.map((node): TreeStateNode => {
    const key = node[fieldKeys.value.key] ?? uniqid()
    const stateNode = reactive<TreeStateNode>({
      title: node[fieldKeys.value.title],
      key,
      expanded: props.defaultExpandAll ? true : false,
      checked: false,
      indeterminate: false,
      parent,
      level: 0,
      offsetLevel: 0,
      visible: true,
      disabled: !!node.disabled,
      isLeaf: node[fieldKeys.value.isLeaf],
      loadStatus: 'idle',
      depth: parent ? parent.depth + 1 : 0,
    })

    if (node.children && node.children.length) {
      stateNode.children = toTreeStateNodes(node.children, stateNode)
    }

    treeMap[key] = stateNode
    return stateNode
  })
}

const setExpandedByNode = (
  node: TreeStateNode,
  expanded: boolean,
  reflow = true,
) => {
  node.expanded = expanded
  if (node.expanded) {
    walkAncestor(node.parent, (node) => {
      node.expanded = true
    })

    if (props.accordion) {
      const siblings = node.parent ? node.parent.children! : treeData.value
      siblings.forEach((sibling) => {
        if (sibling !== node) {
          sibling.expanded = false
        }
      })
    }
  }

  if (reflow) {
    setRenderPosition()
  }
}

const toggleExpandedByNode = (node: TreeStateNode) => {
  setExpandedByNode(node, !node.expanded)
}

const setExpanded = (key: string | number, expanded: boolean) => {
  const node = treeMap[key]
  if (node && node.expanded !== expanded) {
    setExpandedByNode(node, expanded)
  }
}

const toggleExpanded = (key: string | number) => {
  const node = treeMap[key]
  if (node) {
    toggleExpandedByNode(node)
  }
}

const setExpandedKeys = (keys: (string | number)[]) => {
  walkNodes(treeData.value, (node) => {
    node.expanded = false
  })

  keys.forEach((key) => {
    const node = treeMap[key]
    if (node && !node.expanded) {
      setExpandedByNode(node, true, false)
    }
  })

  setRenderPosition()
}

const getExpandedKeys = () => {
  const expandedKeys: (number | string)[] = []

  walkNodes(treeData.value, (node) => {
    if (node.expanded) {
      expandedKeys.push(node.key)
    }
  })

  return expandedKeys
}

const setCheckedByNode = (node: TreeStateNode, checked: boolean) => {
  setCheckedRecursively(node, checked, props.checkStrictly)
}

const bubbleChecked = (parentNode: TreeStateNode | null) => {
  updateAncestorsChecked(parentNode, props.checkStrictly)
}

const setCheckedKeys = (keys: (string | number)[]) => {
  initializeCheckNodes(treeData.value, treeMap, keys, props.checkStrictly)
}

const setChecked = (key: string | number, checked: boolean) => {
  const node = treeMap[key]
  if (node) {
    setCheckedByNode(node, checked)
  }
}

const getCheckedKeys = () => {
  return getTreeCheckedKeys(treeData.value)
}

const getHalfCheckedKeys = () => {
  return getTreeHalfCheckedKeys(treeData.value)
}

const prepend = (node: TreeStateNode, newNode: TreeStateNode) => {
  const children = (node.children ??= [])
  children.unshift(newNode)
  newNode.parent = node

  node.expanded = true
  bubbleChecked(node.parent)

  walkDescendant(newNode, (node) => {
    treeMap[node.key] = node
  })

  setRenderPosition()
}

const append = (node: TreeStateNode, newNode: TreeStateNode) => {
  const children = (node.children ??= [])
  children.push(newNode)
  newNode.parent = node

  node.expanded = true
  bubbleChecked(node.parent)

  walkDescendant(newNode, (node) => {
    treeMap[node.key] = node
  })

  setRenderPosition()
}

const appendRoot = (newNode: TreeStateNode) => {
  treeData.value.push(newNode)
  newNode.parent = null

  walkDescendant(newNode, (node) => {
    treeMap[node.key] = node
  })

  setRenderPosition()
}

const before = (node: TreeStateNode, newNode: TreeStateNode) => {
  const siblings = node.parent ? node.parent.children! : treeData.value
  siblings.splice(siblings.indexOf(node), 0, newNode)
  newNode.parent = node.parent

  bubbleChecked(node.parent)

  walkDescendant(newNode, (node) => {
    treeMap[node.key] = node
  })

  setRenderPosition()
}

const after = (node: TreeStateNode, newNode: TreeStateNode) => {
  const siblings = node.parent ? node.parent.children! : treeData.value
  siblings.splice(siblings.indexOf(node) + 1, 0, newNode)
  newNode.parent = node.parent

  bubbleChecked(node.parent)

  walkDescendant(newNode, (node) => {
    treeMap[node.key] = node
  })

  setRenderPosition()
}

const remove = (node: TreeStateNode, reflow = true) => {
  const siblings = node.parent ? node.parent.children! : treeData.value
  siblings.splice(siblings.indexOf(node), 1)
  if (siblings.length === 0 && node.parent) {
    node.parent.children = undefined
  }

  bubbleChecked(node.parent)

  walkDescendant(node, (node) => {
    delete treeMap[node.key]
  })

  if (reflow) {
    setRenderPosition()
  }
}

const levelup = (node: TreeStateNode) => {
  if (node.parent) {
    remove(node, false)
    after(node.parent, node)
  }
}

const leveldown = (node: TreeStateNode) => {
  const siblings = node.parent ? node.parent.children! : treeData.value
  const index = siblings.indexOf(node)
  if (index > 0) {
    remove(node, false)
    const prevNode = siblings[index - 1]
    prevNode.expanded = true
    append(prevNode, node)
  }
}

const drop = (
  dropOriginNode: TreeStateNode,
  dropTargetNode: TreeStateNode,
  position: number,
) => {
  remove(dropOriginNode, false)
  if (position === -1) {
    before(dropTargetNode, dropOriginNode)
  } else {
    if (dropTargetNode.children && dropTargetNode.expanded) {
      prepend(dropTargetNode, dropOriginNode)
    } else {
      after(dropTargetNode, dropOriginNode)
    }
  }
}

const addRootNode = () => {
  currentEditValue.value = ''
  currentEditType.value = 'root'
  dialogVisible.value = true
}

const getCleanTreeData = () => {
  function recur(nodes: TreeStateNode[]) {
    return nodes.map((node): TreeCleanNode => {
      const cleanNode: TreeCleanNode = {
        title: node.title,
        key: node.key,
      }
      if (node.children) {
        cleanNode.children = recur(node.children)
      }
      return cleanNode
    })
  }

  return recur(treeData.value)
}

const setRenderPosition = () => {
  let count = 0
  function recur(nodes: TreeStateNode[], parent: TreeStateNode | null) {
    nodes.forEach((node) => {
      node.depth = parent ? parent.depth + 1 : 0
      if (node.visible) {
        node.level = count++
      }
      if (node.children && node.expanded) {
        recur(node.children, node)
      }
    })
  }
  recur(treeData.value, null)
  totalLevel.value = count
}

const toggleCheck = (node: TreeStateNode, checked: boolean) => {
  setCheckedByNode(node, checked)
  emit('check', {
    checked,
    node,
  })
}

// initial
const loadStatus = ref<'idle' | 'loading' | 'error' | 'loaded'>('loaded')

const initialize = async () => {
  if (props.lazy && props.load) {
    try {
      loadStatus.value = 'loading'
      const data = await props.load()
      loadStatus.value = 'loaded'
      initializeTree(data)
    } catch {
      loadStatus.value = 'error'
    }
  } else {
    initializeTree(props.data)
  }
}

const initializeTree = (data: TreeNode[]) => {
  treeData.value = toTreeStateNodes(data, null)

  if (props.defaultCheckedKeys && props.defaultCheckedKeys.length > 0) {
    setCheckedKeys(props.defaultCheckedKeys)
  }
  if (props.defaultExpandedKeys && props.defaultExpandedKeys.length > 0) {
    setExpandedKeys(props.defaultExpandedKeys)
  }
  setRenderPosition()
}

const onErrorClick = () => {
  initialize()
}

watch(
  () => props.data,
  () => {
    initializeTree(props.data)
  },
)

initialize()

// edit
const popoverOptions = [
  { id: 'sibling', icon: 'plus', text: t('addSibling') },
  { id: 'child', icon: 'plus', text: t('addChild') },
  { id: 'minus', icon: 'minus', text: t('removeNode') },
  { id: 'edit', icon: 'pencil-square', text: t('edit') },
]

const popover = usePopover()

let currentEditNode: TreeStateNode | undefined
const currentEditType = ref<'sibling' | 'child' | 'minus' | 'edit' | 'root'>()
const currentEditValue = ref('')

const mapEditTypeTitle = {
  sibling: t('addSibling'),
  child: t('addChild'),
  root: t('addRoot'),
  edit: t('edit'),
  minus: '',
}
const currentEditTitle = computed(() => {
  return mapEditTypeTitle[currentEditType.value!]
})

const dialogVisible = ref(false)
const toastVisible = ref(false)

const onPopoverSelect = (option: MenuOption) => {
  currentEditType.value = option.id

  if (currentEditNode) {
    switch (option.id) {
      case 'sibling':
      case 'child':
      case 'edit':
        currentEditValue.value =
          option.id === 'edit' ? String(currentEditNode.title) : ''
        dialogVisible.value = true
        break
      case 'minus':
        remove(currentEditNode)
        break
    }
  }
}

const beforeClose: DialogProps['beforeClose'] = (type) => {
  if (type === 'confirm') {
    if (currentEditValue.value.trim() === '') {
      toastVisible.value = true
      return false
    }

    switch (currentEditType.value) {
      case 'sibling':
      case 'child':
      case 'root': {
        const newNode = reactive<TreeStateNode>({
          title: currentEditValue.value,
          key: uniqid(),
          expanded: false,
          checked: false,
          indeterminate: false,
          parent: null,
          level: 0,
          offsetLevel: 0,
          visible: true,
          disabled: false,
          isLeaf: false,
          loadStatus: 'idle',
          depth: 0,
        })
        switch (currentEditType.value) {
          case 'sibling':
            after(currentEditNode!, newNode)
            break
          case 'child':
            append(currentEditNode!, newNode)
            break
          case 'root':
            appendRoot(newNode)
            break
        }
        break
      }
      case 'edit':
        currentEditNode!.title = currentEditValue.value
        break
    }
  }
}

const edit = (node: TreeStateNode, getEditRect: () => Promise<NodeRect>) => {
  currentEditNode = node
  popover.show(getEditRect)
}

const focused = ref(false)

const onVisibleHook = (name: TransitionHookName) => {
  focused.value = name === 'after-enter'
}

// filter
function defaultFilterMethod(value: string, node: TreeStateNode) {
  return String(node.title).includes(value)
}

function filter(searchString: string) {
  const filterMethod = props.filterMethod || defaultFilterMethod

  function recur(nodes: TreeStateNode[]) {
    nodes.forEach((node) => {
      node.visible = filterMethod(searchString, node)

      if (node.children) {
        if (node.visible && props.filterMode === 'lenient') {
          walkNodes(node.children, (node) => {
            node.visible = true
          })
        } else {
          recur(node.children)
        }

        if (!node.visible && node.children.some((node) => node.visible)) {
          node.visible = true
        }
      }

      if (node.visible) {
        walkAncestor(node.parent, (node) => {
          node.expanded = true
        })
      }
    })
  }

  recur(treeData.value)

  setRenderPosition()
}

// 单选
const currentKey = shallowRef(props.current)

watch(
  () => props.current,
  () => {
    currentKey.value = props.current
  },
)

const singleSelect = (node: TreeStateNode) => {
  if (currentKey.value !== node.key) {
    currentKey.value = node.key
    emit('update:current', node.key, node)
    emit('select', node.key, node)
  }
}

const nodeClick = (node: TreeStateNode, event: any) => {
  emit('node-click', {
    node,
    event,
  })
}

const context = reactive({
  selectable: toRef(() => props.selectable),
  draggable: toRef(() => props.draggable),
  editable: toRef(() => props.editable),
  autoHeight: toRef(() => props.autoHeight),
  singleSelectable: toRef(() => props.singleSelectable),
  leafOnly: toRef(() => props.leafOnly),
  treeData: toRef(() => treeData.value),
  load: toRef(() => props.load),
  lazy: toRef(() => props.lazy),
  setExpandedByNode,
  toggleExpandedByNode,
  setCheckedByNode,
  levelup,
  leveldown,
  drop,
  toggleCheck,
  edit,
  currentKey,
  singleSelect,
  nodeClick,
  toTreeStateNodes,
  setRenderPosition,
})

// others
provide<TreeContext>(treeContextSymbol, context)

defineExpose<TreeExpose>({
  setExpanded,
  toggleExpanded,
  setExpandedKeys,
  getExpandedKeys,
  getCheckedKeys,
  getHalfCheckedKeys,
  setCheckedKeys,
  setChecked,
  filter,
  addRootNode,
  getCleanTreeData,
})

const treeClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const treeStyle = computed(() => {
  return stringifyStyle(
    props.draggable
      ? {
          height: `calc(var(--sar-tree-node-height) * ${totalLevel.value})`,
        }
      : null,
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
