<template>
  <scroll-view
    :class="classNames(props.rootClass, scrollViewId)"
    :style="rootStyle"
    scroll-y
    :scroll-top="scrollTop"
    :upper-threshold="upperThreshold"
    :lower-threshold="lowerThreshold"
    @scroll="onScroll"
    @scrolltoupper="onScrolltoupper"
    @scrolltolower="onScrolltolower"
  >
    <view>
      <slot></slot>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  provide,
  reactive,
  toRef,
  watch,
} from 'vue'
import {
  isNullish,
  uniqid,
  getBoundingClientRect,
  classNames,
} from '../../utils'
import {
  type ScrollSpyProps,
  type ScrollSpySlots,
  type ScrollSpyEmits,
  type ScrollSpyContext,
  type ScrollSpyExpose,
  scrollSpyContextSymbol,
} from './common'
import { useScrollSpy } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<ScrollSpyProps>(), {
  upperThreshold: 50,
  lowerThreshold: 50,
})

defineSlots<ScrollSpySlots>()

const emit = defineEmits<ScrollSpyEmits>()

// main
const scrollViewId = uniqid()

const instance = getCurrentInstance()

const {
  scrollTop,
  innerCurrent,
  anchorRectList,
  register,
  unregister,
  onScroll: onScrollAlias,
  scrollTo,
  update,
  initialize,
} = useScrollSpy(
  reactive({
    startOffset: toRef(() => props.offset) as unknown as number,
    defaultCurrent: props.current,
    getSpiedRect() {
      return getBoundingClientRect(`.${scrollViewId}`, instance)
    },
    onChange(name) {
      emit('update:current', name)
      emit('change', name)
    },
  }),
)

const onScrolltoupper = () => {
  emit('scrolltoupper')
}

const onScrolltolower = () => {
  emit('scrolltolower')
}

const onScroll = (event: any) => {
  emit('scroll', event)
  onScrollAlias(event)
}

provide<ScrollSpyContext>(scrollSpyContextSymbol, {
  register,
  unregister,
})

onMounted(() => {
  initialize()
})

watch(
  () => props.current,
  () => {
    if (
      !isNullish(props.current) &&
      anchorRectList.value.find((item) => item[0] === props.current) &&
      props.current !== innerCurrent.value
    ) {
      innerCurrent.value = props.current
      scrollTo(props.current)
    }
  },
)

defineExpose<ScrollSpyExpose>({
  scrollTo,
  update,
})
</script>
