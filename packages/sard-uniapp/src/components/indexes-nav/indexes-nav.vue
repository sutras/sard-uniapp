<template>
  <view
    :class="navClass"
    :style="navStyle"
    :id="navId"
    @touchstart="onTouchStart"
    @touchmove.stop.prevent="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    @mousedown="onMouseDown"
  >
    <view
      v-for="(name, i) in anchors"
      :key="i"
      :class="
        classNames(
          bem.e('nav-item'),
          bem.em('nav-item', 'active', name === current),
        )
      "
    >
      {{ name }}
    </view>
    <view
      v-if="realVisible"
      :class="classNames(bem.e('hint'), transitionClass)"
      :style="
        stringifyStyle({
          top: hintTop,
        })
      "
      @transitionend="onTransitionEnd"
    >
      <view :class="bem.e('hint-text')">
        {{ current }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, getCurrentInstance, reactive } from 'vue'
import {
  type NodeRect,
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
  minmax,
} from '../../utils'
import {
  type IndexesNavProps,
  type IndexesNavSlots,
  type IndexesNavEmits,
} from '../indexes/common'
import { useMouseDown, useTransition } from '../../use'
import { defaultConfig } from '../config'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<IndexesNavProps>(), {})

defineSlots<IndexesNavSlots>()

const emit = defineEmits<IndexesNavEmits>()

const bem = createBem('indexes')

// main
const instance = getCurrentInstance()

const itemSize = 20
const navId = uniqid()
const navRect = ref<NodeRect>()
const hintVisible = ref(false)
let currentItemIndex: null | number = null
let moved = false

const getNavRect = async () => {
  navRect.value = await getBoundingClientRect(`#${navId}`, instance)
}

const { realVisible, transitionClass, onTransitionEnd } = useTransition(
  reactive({
    visible: hintVisible,
    duration: defaultConfig.indexes.hintDuration,
    prefix: bem.em('hint', ''),
  }),
)

const hintTop = computed(() => {
  let index =
    props.current !== undefined ? props.anchors.indexOf(props.current) : -1
  if (index < 0) {
    index = 0
  }

  return index * itemSize + itemSize / 2 + 'px'
})

const update = (touch: Touch) => {
  if (!navRect.value) {
    return
  }
  const offsetY = touch.clientY - navRect.value.top
  const itemIndex = minmax(
    Math.floor(offsetY / itemSize),
    0,
    props.anchors.length - 1,
  )
  if (itemIndex !== currentItemIndex) {
    currentItemIndex = itemIndex
    emit('select', props.anchors[itemIndex])
  }
}

const onTouchStart = async (event: TouchEvent) => {
  hintVisible.value = true
  await getNavRect()
  if (!moved) {
    update(event.touches[0])
  }
}

const onTouchMove = (event: TouchEvent) => {
  moved = true
  if (!navRect.value) {
    return
  }

  update(event.touches[0])
}

const onTouchEnd = () => {
  hintVisible.value = false
  moved = false
  navRect.value = undefined
  currentItemIndex = null
}

const onMouseDown = useMouseDown(onTouchStart, onTouchMove, onTouchEnd)

// others
const navClass = computed(() => {
  return classNames(bem.e('nav'))
})

const navStyle = computed(() => {
  return stringifyStyle({
    '--sar-indexes-nav-item-size': `${itemSize}px`,
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
