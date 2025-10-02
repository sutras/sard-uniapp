<template>
  <view :class="treeClass" :style="treeStyle">
    <view v-if="lazy && !!load" :class="bem.e('load-status')">
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
  classNames,
  stringifyStyle,
  createBem,
  type NodeRect,
  uniqid,
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
import { recurAncestor, recurDescendant, recurNodes } from './utils'
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
    recurAncestor(node.parent, (node) => {
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
  recurNodes(treeData.value, (node) => {
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

  treeData.value.forEach((node) => {
    recurDescendant(node, (node) => {
      if (node.expanded) {
        expandedKeys.push(node.key)
      }
    })
  })

  return expandedKeys
}

const setCheckedByNode = (node: TreeStateNode, checked: boolean) => {
  if (props.checkStrictly) {
    node.checked = checked
  } else {
    recurDescendant(node, (node) => {
      node.checked = checked
      node.indeterminate = false
    })
    updateAncestorChecked(node.parent)
  }
}

const updateAncestorChecked = (parentNode: TreeStateNode | null) => {
  if (!props.checkStrictly) {
    recurAncestor(parentNode, (node) => {
      const children = node.children || []

      const numChecked = children.filter((node) => node.checked).length
      node.checked = numChecked > 0 && numChecked === children.length
      node.indeterminate =
        !node.checked &&
        (numChecked > 0 || children.some((node) => node.indeterminate))
    })
  }
}

const setCheckedKeys = (keys: (string | number)[]) => {
  if (props.checkStrictly) {
    const mapKeys = keys.reduce<Record<string | number, true>>((map, key) => {
      map[key] = true
      return map
    }, {})

    recurNodes(treeData.value, (node) => {
      node.checked = mapKeys[node.key] ? true : false
    })
  } else {
    recurNodes(treeData.value, (node) => {
      node.checked = false
      node.indeterminate = false
    })

    keys.forEach((key) => {
      const node = treeMap[key]
      if (node && !node.checked) {
        setCheckedByNode(node, true)
      }
    })
  }
}

const setChecked = (key: string | number, checked: boolean) => {
  const node = treeMap[key]
  if (node) {
    setCheckedByNode(node, checked)
  }
}

const getCheckedKeys = () => {
  const checkedKeys: (number | string)[] = []

  treeData.value.forEach((node) => {
    recurDescendant(node, (node) => {
      if (node.checked) {
        checkedKeys.push(node.key)
      }
    })
  })

  return checkedKeys
}

const getHalfCheckedKeys = () => {
  const halfCheckedKeys: (number | string)[] = []

  treeData.value.forEach((node) => {
    recurDescendant(node, (node) => {
      if (node.indeterminate) {
        halfCheckedKeys.push(node.key)
      }
    })
  })

  return halfCheckedKeys
}

const prepend = (node: TreeStateNode, newNode: TreeStateNode) => {
  const children = (node.children ??= [])
  children.unshift(newNode)
  newNode.parent = node

  node.expanded = true
  updateAncestorChecked(node.parent)

  recurDescendant(newNode, (node) => {
    treeMap[node.key] = node
  })

  setRenderPosition()
}

const append = (node: TreeStateNode, newNode: TreeStateNode) => {
  const children = (node.children ??= [])
  children.push(newNode)
  newNode.parent = node

  node.expanded = true
  updateAncestorChecked(node.parent)

  recurDescendant(newNode, (node) => {
    treeMap[node.key] = node
  })

  setRenderPosition()
}

const appendRoot = (newNode: TreeStateNode) => {
  treeData.value.push(newNode)
  newNode.parent = null

  recurDescendant(newNode, (node) => {
    treeMap[node.key] = node
  })

  setRenderPosition()
}

const before = (node: TreeStateNode, newNode: TreeStateNode) => {
  const siblings = node.parent ? node.parent.children! : treeData.value
  siblings.splice(siblings.indexOf(node), 0, newNode)
  newNode.parent = node.parent

  updateAncestorChecked(node.parent)

  recurDescendant(newNode, (node) => {
    treeMap[node.key] = node
  })

  setRenderPosition()
}

const after = (node: TreeStateNode, newNode: TreeStateNode) => {
  const siblings = node.parent ? node.parent.children! : treeData.value
  siblings.splice(siblings.indexOf(node) + 1, 0, newNode)
  newNode.parent = node.parent

  updateAncestorChecked(node.parent)

  recurDescendant(newNode, (node) => {
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

  updateAncestorChecked(node.parent)

  recurDescendant(node, (node) => {
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
          recurNodes(node.children, (node) => {
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
        recurAncestor(node.parent, (node) => {
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
    {
      height: `calc(var(--sar-tree-node-height) * ${totalLevel.value})`,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
