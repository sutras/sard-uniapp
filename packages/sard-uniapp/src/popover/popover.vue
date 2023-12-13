<template>
  <slot></slot>

  <Overlay
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
        <Menu
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

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import {
  computed,
  ref,
  watch,
  getCurrentInstance,
  StyleValue,
  provide,
  nextTick,
  reactive,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  getBoundingClientRect,
  uniqid,
} from '../utils'
import { useTransition, useZIndex } from '../use'
import { type Position, getPopoverPosition } from './utils'
import Overlay from '../overlay/overlay.vue'
import Menu from '../menu/menu.vue'
import { type MenuOption } from '../menu/common'
import {
  type PopoverContext,
  type ReferenceExpose,
  popoverContextSymbol,
} from './common'
import { PopoverController } from './usePopover'

export interface PopoverProps {
  rootStyle?: StyleValue
  rootClass?: string
  visible?: boolean
  options?: MenuOption[]
  position?: Position
  direction?: 'vertical' | 'horizontal'
  theme?: 'dark' | 'light'
  refGap?: number
  viewportGap?: number
  transparent?: boolean
  controller?: PopoverController
}

export interface PopoverEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'select', option: MenuOption): void
}

// interface PopoverSlots {
//   default(props: Record<string, never>): any
//   content(props: Record<string, never>): any
// }
// defineSlots<PopoverSlots>()

const props = withDefaults(defineProps<PopoverProps>(), {
  refGap: 10,
  viewportGap: 10,
  position: 'bottom',
  direction: 'vertical',
  theme: 'light',
  transparent: true,
})

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
    duration: 300,
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
    },
    popperPositionStyle.value,
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@use './index.scss';
</style>
