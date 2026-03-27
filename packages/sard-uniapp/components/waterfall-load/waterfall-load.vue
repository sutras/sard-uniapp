<template>
  <view :class="waterfallLoadClass" :style="waterfallLoadStyle">
    <view :class="bem.e('content')">
      <slot :on-load="onLoad" :overtime="overtime"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { classNames, createBem, stringifyStyle } from '../../utils'
import {
  type WaterfallLoadProps,
  type WaterfallLoadSlots,
  type WaterfallLoadEmits,
  type WaterfallLoadExpose,
} from './common'
import { useTimeout } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<WaterfallLoadProps>(), {})

defineSlots<WaterfallLoadSlots>()

const emit = defineEmits<WaterfallLoadEmits>()

const bem = createBem('waterfall-load')

// main
let loaded = false

const overtime = ref(false)

const currWidth = ref(props.width || 320)
const currHeight = ref(props.height || 240)

const paddingTop = computed(
  () => (currHeight.value / currWidth.value) * 100 + '%',
)

const { start } = useTimeout(
  () => {
    if (!loaded) {
      overtime.value = true
      emit('load')
    }
  },
  () => props.maxWait || 0,
)

const onLoad = ({ detail }: any) => {
  loaded = true
  if (!overtime.value) {
    if (detail.width) {
      currWidth.value = detail.width
      currHeight.value = detail.height
    }
    emit('load')
  }
}

onMounted(() => {
  start()
})

// others
defineExpose<WaterfallLoadExpose>({})

const waterfallLoadClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const waterfallLoadStyle = computed(() => {
  return stringifyStyle(
    {
      paddingTop: paddingTop.value,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
