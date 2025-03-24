<template>
  <view
    :class="navClass"
    :style="navStyle"
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
          bem.em('nav-item', 'active', name === innerCurrent),
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
        {{ innerCurrent }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, getCurrentInstance, reactive, watch } from 'vue'
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
let moved = false

const innerCurrent = ref<number | string | undefined>()

watch(
  () => props.current,
  (current) => {
    innerCurrent.value = current
  },
  {
    immediate: true,
  },
)

const getNavRect = async () => {
  navRect.value = await getBoundingClientRect(`.${navId}`, instance)
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
    innerCurrent.value !== undefined
      ? props.anchors.indexOf(innerCurrent.value)
      : -1
  if (index < 0) {
    index = 0
  }

  return index * itemSize + itemSize / 2 + 'px'
})

const calcPosition = (touch: Touch) => {
  if (!navRect.value) {
    return
  }
  const offsetY = touch.clientY - navRect.value.top
  const itemIndex = minmax(
    Math.floor(offsetY / itemSize),
    0,
    props.anchors.length - 1,
  )
  const current = props.anchors[itemIndex]

  if (current !== innerCurrent.value) {
    innerCurrent.value = current
    emit('select', current)
  }
}

const onTouchStart = async (event: TouchEvent) => {
  hintVisible.value = true
  moved = false
  await getNavRect()
  if (!moved) {
    calcPosition(event.touches[0])
  }
}

const onTouchMove = (event: TouchEvent) => {
  moved = true
  if (!navRect.value) {
    return
  }

  calcPosition(event.touches[0])
}

const onTouchEnd = () => {
  hintVisible.value = false
  navRect.value = undefined
}

const onMouseDown = useMouseDown(onTouchStart, onTouchMove, onTouchEnd)

// others
const navClass = computed(() => {
  return classNames(bem.e('nav'), navId)
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
