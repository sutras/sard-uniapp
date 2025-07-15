<template>
  <view :class="dndItemClass" :style="dndItemStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  type NodeRect,
  getBoundingClientRect,
} from '../../utils'
import {
  type DndItemProps,
  type DndItemSlots,
  type DndItemEmits,
  type DndItemExpose,
  dndItemContextKey,
} from './common'
import { type DndContext, dndContextKey, type DndItemInfo } from '../dnd/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<DndItemProps>(), {})

defineSlots<DndItemSlots>()

defineEmits<DndItemEmits>()

const bem = createBem('dnd-item')

// main

// context
const dndContext = inject<DndContext<any>>(dndContextKey)

if (!dndContext) {
  throw new Error('DndItem must be included in Dnd.')
}

// drag
const instance = getCurrentInstance()
const itemId = uniqid()

let dropItemInfo: DndItemInfo | null = null
let currentIndex = -1
let targetIndex = 0

const translateY = ref(0)

const getNodeRect = () => {
  return getBoundingClientRect(`.${itemId}`, instance)
}

onMounted(() => {
  dndContext.addRectItem(getNodeRect)
})

onBeforeUnmount(() => {
  dndContext.removeRectItem(getNodeRect)
})

let rectInfoList: { rect: NodeRect; itemInfo: DndItemInfo }[] | null = null

const immediateStart = async () => {
  Promise.all(dndContext.rectItems.map((getRect) => getRect())).then(
    (rects) => {
      rectInfoList = rects
        .sort((a, b) => a.top - b.top)
        .map((rect, i) => {
          return {
            rect,
            itemInfo: dndContext.list[i].itemInfo,
          }
        })
    },
  )
}

const start = async () => {
  dndContext.dragging = true
  const itemInfo = props.itemInfo
  itemInfo.dragging = true
}

const move = (delta: number) => {
  if (!rectInfoList) return

  if (currentIndex === -1) {
    currentIndex = rectInfoList.findIndex(
      (item) => item.itemInfo === props.itemInfo,
    )
    dndContext.currentHeight = rectInfoList[currentIndex].rect.height
    dndContext.dragStart(currentIndex)
  }

  translateY.value = delta

  const { rect } = rectInfoList[currentIndex]

  targetIndex = (() => {
    if (delta < 0) {
      const top = rect.top + delta
      for (let i = 0; i < currentIndex; i++) {
        const targetRect = rectInfoList[i].rect
        if (top < targetRect.top + targetRect.height / 2) {
          return i
        }
      }
    } else if (delta > 0) {
      const bottom = rect.bottom + delta
      for (let i = rectInfoList.length - 1; i > currentIndex; i--) {
        const targetRect = rectInfoList[i].rect
        if (bottom > targetRect.bottom - targetRect.height / 2) {
          return i
        }
      }
    }
    return currentIndex
  })()

  const targetItemInfo = rectInfoList[targetIndex].itemInfo

  if (dropItemInfo !== targetItemInfo) {
    rectInfoList.forEach((item, index) => {
      item.itemInfo.offset =
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
    if (dropItemInfo) {
      dndContext.dragMove(currentIndex, targetIndex)
    }
    dropItemInfo = targetItemInfo
  }
}

const end = () => {
  const _currentIndex = currentIndex
  const _targetIndex = dropItemInfo ? targetIndex : currentIndex
  rectInfoList = null
  dropItemInfo = null
  dndContext.dragging = false
  const itemInfo = props.itemInfo
  itemInfo.dragging = false
  translateY.value = 0
  currentIndex = -1
  dndContext.list.forEach(({ itemInfo }) => {
    itemInfo.offset = 0
  })
  dndContext.drop(_currentIndex, _targetIndex)
}

provide(dndItemContextKey, {
  immediateStart,
  start,
  move,
  end,
})

// others
defineExpose<DndItemExpose>({})

const dndItemClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('active', props.itemInfo.dragging),
    bem.m('passive', !props.itemInfo.dragging && dndContext.dragging),
    itemId,
    props.rootClass,
  )
})

const dndItemStyle = computed(() => {
  const y = props.itemInfo.dragging
    ? translateY.value
    : dndContext.currentHeight * props.itemInfo.offset

  return stringifyStyle(
    {
      transform: `translate3d(0,${y}px,0)`,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
