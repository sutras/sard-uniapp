<template>
  <slot></slot>

  <sar-overlay
    :visible="innerVisible"
    :z-index="zIndex"
    :transparent="transparent"
    @click="onOverlayClick"
  />
  <view
    v-if="innerVisible || realVisible"
    :class="popoverClass"
    :style="popoverStyle"
    @animationend="onTransitionEnd"
  >
    <view :class="bem.e('content')" :id="contentId">
      <slot name="content">
        <sar-menu
          :options="options"
          :direction="direction"
          :theme="theme"
          @select="onSelect"
        />
      </slot>
    </view>
    <view :class="bem.e('arrow')" :style="stringifyStyle(arrowPositionStyle)" />
  </view>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  watch,
  getCurrentInstance,
  provide,
  nextTick,
  reactive,
  toRef,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  getBoundingClientRect,
  uniqid,
} from '../../utils'
import { useTransition, useZIndex } from '../../use'
import { getPopoverPosition } from './utils'
import SarOverlay from '../overlay/overlay.vue'
import SarMenu from '../menu/menu.vue'
import { type MenuOption } from '../menu/common'
import {
  type PopoverProps,
  type PopoverSlots,
  type PopoverEmits,
  type PopoverContext,
  type ReferenceExpose,
  popoverContextSymbol,
  popoverPropsDefaults,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<PopoverProps>(), popoverPropsDefaults)

defineSlots<PopoverSlots>()

const emit = defineEmits<PopoverEmits>()

const bem = createBem('popover')

// main

// visible
const innerVisible = ref(props.visible)
const transitionVisible = ref(false)
const instance = getCurrentInstance()
const contentId = uniqid()

const popperPositionStyle = ref({
  top: '0',
  left: '0',
})

const arrowPositionStyle = ref({
  top: '0',
  left: '0',
})

const getAndSetPosition = async () => {
  const [referenceRect, contentRect] = await Promise.all([
    getReferenceRect(),
    getBoundingClientRect(`#${contentId}`, instance),
  ])

  if (referenceRect) {
    const [popperPosition, arrowPosition] = getPopoverPosition(
      referenceRect,
      contentRect,
      {
        position: props.position,
        refGap: props.refGap,
        viewportGap: props.viewportGap,
        arrowSize: 15,
      },
    )

    popperPositionStyle.value = {
      top: `calc(${popperPosition.top}px + var(--window-top))`,
      left: popperPosition.left + 'px',
    }

    arrowPositionStyle.value = {
      top: arrowPosition.top + 'px',
      left: arrowPosition.left + 'px',
    }

    transitionVisible.value = true
  }
}

const { realVisible, transitionClass, onTransitionEnd } = useTransition(
  reactive({
    visible: transitionVisible,
    duration: toRef(() => props.duration),
    prefix: bem.m(''),
  }),
)

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
  },
)

watch(innerVisible, () => {
  if (innerVisible.value) {
    nextTick(() => {
      getAndSetPosition()
    })
  } else {
    transitionVisible.value = false
  }
})

const onOverlayClick = () => {
  innerVisible.value = false
  emit('update:visible', false)
}

const onSelect = (option: MenuOption) => {
  innerVisible.value = false
  emit('select', option)
  emit('update:visible', false)
}

// reference
let referenceExpose: ReferenceExpose

const context: PopoverContext = {
  show() {
    innerVisible.value = true
    emit('update:visible', true)
  },
  register(expose) {
    referenceExpose = expose
  },
}
provide<PopoverContext>(popoverContextSymbol, context)

watch(
  () => props.controller,
  () => {
    if (props.controller) {
      props.controller._inject(context)
    }
  },
  {
    immediate: true,
  },
)

const getReferenceRect = () => {
  if (referenceExpose) {
    return referenceExpose.getRect()
  }
}

// zIndex
const [zIndex, increaseZIndex] = useZIndex()

watch(innerVisible, () => {
  if (innerVisible.value) {
    increaseZIndex()
  }
})

// others
const popoverClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(props.theme),
    bem.m(props.direction),
    transitionClass.value,
    props.rootClass,
  )
})

const popoverStyle = computed(() => {
  return stringifyStyle(
    {
      zIndex: zIndex.value,
      transformOrigin: `${arrowPositionStyle.value.left} ${arrowPositionStyle.value.top}`,
      opacity: realVisible.value ? 1 : 0,
      animationDuration: props.duration + 'ms',
    },
    popperPositionStyle.value,
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
