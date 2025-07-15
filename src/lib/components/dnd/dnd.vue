<template>
  <view :class="dndClass" :style="dndStyle">
    <slot :list="dndList"></slot>

    <!-- #ifdef MP-ALIPAY -->
    <view
      :class="
        classNames(
          bem.e('disable-scroll'),
          bem.em('disable-scroll', 'dragging', dragging),
        )
      "
    ></view>
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts" generic="T">
import { computed, provide, reactive, ref, unref, watch } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  arrayMove,
  NodeRect,
} from '../../utils'
import {
  type DndProps,
  type DndSlots,
  type DndEmits,
  type DndExpose,
  type DndListItem,
  dndContextKey,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<DndProps<T>>(), {})

defineSlots<DndSlots<T>>()

const emit = defineEmits<DndEmits<T>>()

const bem = createBem('dnd')

// main
const keyMap = new WeakMap<any, string>()

const innerList = ref(props.list || [])

watch(
  () => props.list,
  () => {
    innerList.value = props.list || []
  },
)

const dndList = computed(() => {
  return unref(innerList.value).map((item) => {
    const key = keyMap.get(item) || uniqid()
    keyMap.set(item, key)

    return reactive({
      data: item,
      itemInfo: reactive({
        offset: 0,
        dragging: false,
      }),
      key,
    })
  }) as DndListItem<T>[]
})

const dragStart = (itemIndex: number) => {
  emit('item-drag-start', { itemIndex })
}

const dragMove = (itemIndex: number, insertIndex: number) => {
  emit('item-drag-move', { itemIndex, insertIndex })
}

const drop = (itemIndex: number, insertIndex: number) => {
  if (itemIndex !== insertIndex) {
    innerList.value = arrayMove(props.list || [], itemIndex, insertIndex)
    emit('update:list', innerList.value as T[])
  }
  emit('item-drop', { itemIndex, insertIndex })
}

const dragging = ref(false)

const rectItems: (() => Promise<NodeRect>)[] = []

const addRectItem = (getRect: () => Promise<NodeRect>) => {
  if (!rectItems.includes(getRect)) {
    rectItems.push(getRect)
  }
}

const removeRectItem = (getRect: () => Promise<NodeRect>) => {
  if (rectItems.includes(getRect)) {
    rectItems.splice(rectItems.indexOf(getRect), 1)
  }
}

provide(
  dndContextKey,
  reactive({
    list: dndList,
    dragging,
    currentHeight: 0,
    dragStart,
    dragMove,
    drop,
    rectItems,
    addRectItem,
    removeRectItem,
  }),
)

// others
defineExpose<DndExpose>({})

const dndClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const dndStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
