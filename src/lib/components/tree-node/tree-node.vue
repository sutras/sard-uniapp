<template>
  <view
    :class="nodeClass"
    :style="nodeStyle"
    @touchstart="onNodeTouchStart"
    @touchend="onNodeTouchEnd"
    @touchcancel="onNodeTouchEnd"
    @mousedown="onNodeMouseDown"
    @click="onNodeClick"
  >
    <view :style="indentStyle"></view>
    <view :class="arrowClass">
      <sar-icon family="sari" name="right" />
    </view>
    <sar-loading
      v-if="node.loadStatus === 'loading'"
      :class="bem.e('loading')"
    />
    <view
      v-if="treeContext.selectable || canSingleSelectable"
      :class="selectionClass"
      @touchstart.stop="onSelectionTouchStart"
      @touchend.stop="onSelectionTouchEnd"
      @touchcancel.stop="onSelectionTouchEnd"
      @mousedown.stop="onSelectionMouseDown"
      @click.stop
    >
      <sar-checkbox
        v-if="treeContext.selectable"
        readonly
        :checked="node.checked"
        :indeterminate="node.indeterminate"
        :disabled="node.disabled"
      />
      <sar-radio
        v-if="canSingleSelectable"
        readonly
        :checked="isSingleChecked"
        :disabled="node.disabled"
      />
    </view>
    <view :class="bem.e('title')">
      {{ node.title }}
    </view>
    <view
      v-if="treeContext.draggable || treeContext.editable"
      :class="bem.e('toolbar')"
    >
      <view
        v-if="treeContext.editable"
        :id="editId"
        :class="editClass"
        @touchstart.stop.prevent="onEditTouchStart"
        @touchend="onEditTouchEnd"
        @touchcancel="onEditTouchEnd"
        @mousedown.stop="onEditMouseDown"
        @click.stop
      >
        <sar-icon family="sari" name="pencil-square" />
      </view>
      <view
        v-if="treeContext.draggable"
        :class="bem.e('drag')"
        :id="dragId"
        @touchstart.stop.prevent="onDragTouchStart"
        @touchmove.stop.prevent="onDragTouchMove"
        @touchend="onDragTouchEnd"
        @touchcancel="onDragTouchEnd"
        @mousedown.stop="onDragMouseDown"
        @click.stop
      >
        <sar-loading v-if="dropLoading" />
        <template v-else>
          <sar-icon family="sari" name="list" />
          <view :class="bem.e('level-btn')">
            <sar-icon v-if="isLastNode" family="sari" name="left" />
            <sar-icon v-if="index !== 0" family="sari" name="right" />
          </view>
        </template>
      </view>
      <view></view>
    </view>
  </view>

  <template
    v-if="
      treeContext.draggable &&
      !isMergedLeaf &&
      node.expanded &&
      node.children &&
      node.children.length > 0
    "
  >
    <template v-for="(node, index) of node.children" :key="node.key">
      <sar-tree-node v-if="node.visible" :index="index" :node="node" />
    </template>
  </template>

  <sar-collapse
    v-if="
      !treeContext.draggable &&
      !isMergedLeaf &&
      node.children &&
      node.children.length > 0
    "
    lazy
    destroy-on-close
    :visible="node.expanded"
  >
    <template v-for="(node, index) of node.children" :key="node.key">
      <sar-tree-node v-if="node.visible" :index="index" :node="node" />
    </template>
  </sar-collapse>

  <sar-popover
    v-if="treeContext.draggable"
    :options="popoverOptions"
    theme="dark"
    position="left"
    :controller="popover"
    direction="horizontal"
    @select="onPopoverSelect"
  />
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, inject, onMounted, ref } from 'vue'
import {
  type Point,
  type NodeRect,
  classNames,
  createBem,
  getBoundingClientRect,
  clamp,
  stringifyStyle,
  uniqid,
  getNodeLevel,
  walkDescendant,
} from '../../utils'
import {
  type TreeContext,
  type TreeNodeProps,
  type TreeStateNode,
  treeContextSymbol,
} from '../tree/common'
import { useMouseDown, useSimulatedClick, useSimulatedPress } from '../../use'
import SarIcon from '../icon/icon.vue'
import SarCheckbox from '../checkbox/checkbox.vue'
import SarRadio from '../radio/radio.vue'
import SarPopover from '../popover/popover.vue'
import SarLoading from '../loading/loading.vue'
import SarCollapse from '../collapse/collapse.vue'
import { usePopover } from '../popover'
import { type MenuOption } from '../menu/common'

defineOptions({
  name: 'SarTreeNode',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<TreeNodeProps>(), {})

const bem = createBem('tree')

// main
const treeContext = inject<TreeContext>(treeContextSymbol) as TreeContext

const level = computed(() => {
  return getNodeLevel(props.node)
})

const nodeOpacity = ref(0)

onMounted(() => {
  setTimeout(() => {
    nodeOpacity.value = 1
  }, 30)
})

// drag
const instance = getCurrentInstance()
const nodeId = uniqid()

const allowDrag = computed(() => {
  return !treeContext.allowDrag || treeContext.allowDrag(props.node)
})

let dropNode: TreeStateNode | undefined
let dropPosition: number | undefined

const dragging = ref(false)
let nodeRect: NodeRect | undefined
const dropLoading = ref(false)

const translateY = ref(0)

let obviousNodes: TreeStateNode[] = []

const onDragStart = () => {
  dragging.value = true

  obviousNodes = []
  treeContext.treeData.forEach((node) => {
    walkDescendant(node, (node) => {
      obviousNodes.push(node)
      if (!node.expanded) {
        return true
      }
    })
  })
}

const onDragMove = (offset: Point) => {
  translateY.value = offset.y

  const nodeHeight = nodeRect!.height

  const currentIndex = obviousNodes.findIndex((node) => node === props.node)

  const offsetIndex =
    Math.floor(Math.abs(offset.y) / nodeHeight + 0.5) * (offset.y < 0 ? -1 : 1)

  const targetIndex = clamp(
    currentIndex + offsetIndex,
    0,
    obviousNodes.length - 1,
  )

  const targetNode = obviousNodes[targetIndex]

  if (dropNode !== targetNode) {
    obviousNodes.forEach((node, index) => {
      node.offsetLevel =
        index < currentIndex
          ? index >= targetIndex
            ? 1
            : 0
          : index > currentIndex
            ? index <= targetIndex
              ? -1
              : 0
            : 0
    })
    dropNode = targetNode
    dropPosition = targetNode === props.node ? 0 : offset.y < 0 ? -1 : 1
  }
}

const onDragEnd = async () => {
  try {
    dropLoading.value = true
    if (dropNode && dropPosition && dropNode !== props.node) {
      await treeContext.drop(props.node, dropNode, dropPosition)
    }
  } catch {
    void 0
  } finally {
    dropLoading.value = false
    dragging.value = false
    dropNode = undefined
    dropPosition = undefined
    obviousNodes.forEach((node) => {
      node.offsetLevel = 0
    })
    translateY.value = 0
  }
}

const [onDragSimulatedClickTouchStart, onDragSimulatedClickTouchEnd] =
  useSimulatedClick(() => {
    if (popoverOptions.value.length > 0) {
      popover.show()
    }
  }, 300)

const [
  onDragSimulatedPressTouchStart,
  onDragSimulatedPressTouchMove,
  onDragSimulatedPressTouchEnd,
] = useSimulatedPress({
  start: () => {
    treeContext.setExpandedByNode(props.node, false)
    onDragStart()
  },
  move: (_, { delta }) => {
    if (nodeRect) {
      onDragMove(delta)
    }
  },
  end: () => {
    onDragEnd()
  },
  duration: 150,
})

const onDragTouchStart = async (event: TouchEvent) => {
  if (!allowDrag.value || dropLoading.value) return

  onDragSimulatedPressTouchStart(event)
  onDragSimulatedClickTouchStart(event)
  nodeRect = await getBoundingClientRect(`.${nodeId}`, instance)
}

const onDragTouchMove = (event: TouchEvent) => {
  if (!allowDrag.value || dropLoading.value) return

  onDragSimulatedPressTouchMove(event)
}

const onDragTouchEnd = (event: TouchEvent) => {
  if (!allowDrag.value || dropLoading.value) return

  nodeRect = undefined

  onDragSimulatedClickTouchEnd(event)
  onDragSimulatedPressTouchEnd()
}

const onDragMouseDown = useMouseDown(
  onDragTouchStart,
  onDragTouchMove,
  onDragTouchEnd,
)

// level
const dragId = uniqid()

const popover = usePopover(`#${dragId}`)

const isLastNode = computed(() => {
  return (
    props.node.parent && props.node.parent.children!.length - 1 === props.index
  )
})

const popoverOptions = computed(() => {
  const options: { icon: string; id: string }[] = []
  if (isLastNode.value) {
    options.push({ icon: 'left', id: 'left' })
  }
  if (props.index !== 0) {
    options.push({ icon: 'right', id: 'right' })
  }
  return options
})

const onPopoverSelect = async (option: MenuOption) => {
  try {
    dropLoading.value = true

    switch (option.id) {
      case 'left':
        await treeContext.levelup(props.node)
        break
      case 'right':
        await treeContext.leveldown(props.node)
        break
    }
  } catch {
    void 0
  } finally {
    dropLoading.value = false
  }
}

// expand
const isMergedLeaf = computed(() => {
  const { children, isLeaf } = props.node
  return treeContext.lazy && treeContext.load
    ? isLeaf
    : !children || children.length === 0
})

const onNodeClick = async (event: any) => {
  if (dropLoading.value) return

  const node = props.node
  const { loadStatus, isLeaf } = node
  if (loadStatus === 'loading') {
    return
  }

  if (
    treeContext.lazy &&
    treeContext.load &&
    !isLeaf &&
    loadStatus === 'idle'
  ) {
    try {
      node.loadStatus = 'loading'
      const treeNodes = (await treeContext.load(node)) || []
      node.loadStatus = 'loaded'
      node.children = treeContext.toTreeStateNodes(treeNodes, node)
      if (node.children.length === 0) {
        node.isLeaf = true
      } else {
        treeContext.setRenderPosition()
        if (node.checked) {
          treeContext.setCheckedByNode(props.node, true)
        }
      }
    } catch {
      node.loadStatus = 'idle'
      return
    }
  }

  if (!isMergedLeaf.value) {
    treeContext.toggleExpandedByNode(node)
  }
  if (treeContext.selectable && !node.disabled && isMergedLeaf.value) {
    treeContext.toggleCheck(node, !node.checked)
  }
  if (canSingleSelectable.value && !node.disabled && isMergedLeaf.value) {
    treeContext.singleSelect(node)
  }
  treeContext.nodeClick(node, event)
}

const nodeActive = ref(false)

const onNodeTouchStart = () => {
  if (dropLoading.value) return

  if (
    !isMergedLeaf.value ||
    (canSingleSelectable.value && treeContext.leafOnly)
  ) {
    nodeActive.value = true
  }
}

const onNodeTouchEnd = () => {
  nodeActive.value = false
}

const onNodeMouseDown = useMouseDown(
  onNodeTouchStart,
  undefined,
  onNodeTouchEnd,
)

// select
const canSingleSelectable = computed(() => {
  return (
    treeContext.singleSelectable &&
    (!treeContext.leafOnly || isMergedLeaf.value)
  )
})

const isSingleChecked = computed(
  () => props.node.key === treeContext.currentKey,
)

const [onSelectionTouchStart, onSelectionTouchEnd] = useSimulatedClick(() => {
  if (!props.node.disabled) {
    if (treeContext.selectable) {
      treeContext.toggleCheck(props.node, !props.node.checked)
    }
    if (canSingleSelectable.value) {
      treeContext.singleSelect(props.node)
    }
  }
})

const onSelectionMouseDown = useMouseDown(
  onSelectionTouchStart,
  undefined,
  onSelectionTouchEnd,
)

// edit
const editId = uniqid()

const getEditRect = async () => {
  return getBoundingClientRect(`#${editId}`, instance)
}

const [onEditTouchStart, onEditTouchEnd] = useSimulatedClick(() => {
  if (dropLoading.value) return

  treeContext.edit(props.node, getEditRect)
})

const onEditMouseDown = useMouseDown(
  onEditTouchStart,
  undefined,
  onEditTouchEnd,
)

// others
const nodeClass = computed(() => {
  return classNames(
    bem.e('node'),
    bem.em('node', 'dragging', dragging.value),
    bem.em('node', 'selectable', treeContext.selectable),
    bem.em('node', 'active', nodeActive.value),
    bem.em('node', 'current', isSingleChecked.value),
    bem.em('node', 'draggable', treeContext.draggable),
    bem.em('node', 'disallowed', !allowDrag.value),
    bem.em(
      'node',
      'truncated',
      treeContext.draggable || !treeContext.autoHeight,
    ),
    nodeId,
  )
})

const nodeStyle = computed(() => {
  return treeContext.draggable
    ? stringifyStyle({
        transform: `translate3d(0,calc(var(--sar-tree-node-height) * ${
          props.node.level + props.node.offsetLevel
        } + ${dragging.value ? translateY.value : 0}px),0)`,
        opacity: nodeOpacity.value,
      })
    : ''
})

const editClass = computed(() => {
  return classNames(bem.e('edit'))
})

const indentStyle = computed(() => {
  return stringifyStyle({
    width: `calc(var(--sar-tree-indent-width) * ${level.value})`,
    transition: `width 300ms`,
  })
})

const arrowClass = computed(() => {
  return classNames(
    bem.e('arrow'),
    bem.em('arrow', 'expanded', props.node.expanded),
    bem.em('arrow', 'is-leaf', isMergedLeaf.value),
  )
})

const selectionClass = computed(() => {
  return classNames(
    bem.e('selection'),
    bem.em('selection', 'disabled', props.node.disabled),
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
