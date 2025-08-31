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
        <sar-icon family="sari" name="list" />
        <view :class="bem.e('level-btn')">
          <sar-icon v-if="isLastNode" family="sari" name="left" />
          <sar-icon v-if="index !== 0" family="sari" name="right" />
        </view>
      </view>
    </view>
  </view>

  <template
    v-if="!isLeaf && node.expanded && node.children && node.children.length > 0"
  >
    <template v-for="(node, index) of node.children" :key="node.key">
      <sar-tree-node v-if="node.visible" :index="index" :node="node" />
    </template>
  </template>

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
import { usePopover } from '../popover'
import { getNodeLevel, recurDescendant } from '../tree/utils'
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

let dropTargetNode: TreeStateNode | undefined
let dropPosition: number | undefined

const dragging = ref(false)
let nodeRect: NodeRect | undefined

const translateY = ref(0)

let obviousNodes: TreeStateNode[] = []

const onDragStart = () => {
  obviousNodes = []
  treeContext.treeData.forEach((node) => {
    recurDescendant(node, (node) => {
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

  if (dropTargetNode !== targetNode) {
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
    dropTargetNode = targetNode
    dropPosition = targetNode === props.node ? 0 : offset.y < 0 ? -1 : 1
  }
}

const onDragEnd = () => {
  if (dropTargetNode && dropPosition && dropTargetNode !== props.node) {
    treeContext.drop(props.node, dropTargetNode, dropPosition)
  }
  dropTargetNode = undefined
  dropPosition = undefined

  obviousNodes.forEach((node) => {
    node.offsetLevel = 0
  })
  translateY.value = 0
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
    dragging.value = true
    treeContext.setExpandedByNode(props.node, false)
    onDragStart()
  },
  move: (_, { delta }) => {
    if (nodeRect) {
      onDragMove(delta)
    }
  },
  end: () => {
    dragging.value = false
    onDragEnd()
  },
  duration: 150,
})

const onDragTouchStart = async (event: TouchEvent) => {
  onDragSimulatedPressTouchStart(event)
  onDragSimulatedClickTouchStart(event)
  nodeRect = await getBoundingClientRect(`.${nodeId}`, instance)
}

const onDragTouchMove = (event: TouchEvent) => {
  onDragSimulatedPressTouchMove(event)
}

const onDragTouchEnd = (event: TouchEvent) => {
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

const onPopoverSelect = (option: MenuOption) => {
  switch (option.id) {
    case 'left':
      treeContext.levelup(props.node)
      break
    case 'right':
      treeContext.leveldown(props.node)
      break
  }
}

// expand
const isLeaf = computed(() => {
  return !props.node.children || props.node.children.length === 0
})

const onNodeClick = (event: any) => {
  if (!isLeaf.value) {
    treeContext.toggleExpandedByNode(props.node)
  }
  if (canSingleSelectable.value && treeContext.leafOnly) {
    treeContext.singleSelect(props.node)
  }
  treeContext.nodeClick(props.node, event)
}

const nodeActive = ref(false)

const onNodeTouchStart = () => {
  if (!isLeaf.value || (canSingleSelectable.value && treeContext.leafOnly)) {
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
  return treeContext.singleSelectable && (!treeContext.leafOnly || isLeaf.value)
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
    nodeId,
  )
})

const nodeStyle = computed(() => {
  return stringifyStyle({
    transform: `translate3d(0,calc(var(--sar-tree-node-height) * ${
      props.node.level + props.node.offsetLevel
    } + ${dragging.value ? translateY.value : 0}px),0)`,
    opacity: nodeOpacity.value,
  })
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
    bem.em('arrow', 'is-leaf', isLeaf.value),
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
