<template>
  <view :class="indexesClass" :style="indexesStyle">
    <scroll-view
      :class="bem.e('scroll-view')"
      :id="scrollViewId"
      scroll-y
      :scroll-top="scrollTop"
      @scroll="onScroll"
    >
      <view>
        <slot></slot>
      </view>
    </scroll-view>
    <sar-indexes-nav
      :anchors="anchorNames"
      :current="innerCurrent"
      @select="onNavSelect"
    />
  </view>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  provide,
  watch,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  isNullish,
  uniqid,
  getBoundingClientRect,
} from '../../utils'
import {
  type IndexesProps,
  type IndexesSlots,
  type IndexesEmits,
  type IndexesContext,
  type IndexesExpose,
  indexesContextSymbol,
} from './common'
import { useScrollSpy } from '../../use'
import SarIndexesNav from '../indexes-nav/indexes-nav.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<IndexesProps>(), {})

defineSlots<IndexesSlots>()

const emit = defineEmits<IndexesEmits>()

const bem = createBem('indexes')

// main
const scrollViewId = uniqid()

const instance = getCurrentInstance()

const {
  scrollTop,
  innerCurrent,
  anchorRectList,
  register,
  unregister,
  onScroll,
  scrollTo,
  update,
  initialize,
} = useScrollSpy({
  defaultCurrent: props.current,
  getSpiedRect() {
    return getBoundingClientRect(`#${scrollViewId}`, instance)
  },
  onChange(name) {
    emit('change', name)
  },
})

provide<IndexesContext>(indexesContextSymbol, {
  register,
  unregister,
})

onMounted(() => {
  nextTick(() => {
    initialize()
  })
})

watch(
  () => props.current,
  () => {
    if (
      !isNullish(props.current) &&
      anchorNames.value.includes(props.current) &&
      props.current !== innerCurrent.value
    ) {
      innerCurrent.value = props.current
      scrollTo(props.current)
    }
  },
)

// nav
const anchorNames = computed(() => {
  return anchorRectList.value.map((item) => item[0])
})

const onNavSelect = (name: string | number) => {
  innerCurrent.value = name
  scrollTo(name)
  emit('change', name)
}

// others
const indexesClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const indexesStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

defineExpose<IndexesExpose>({
  scrollTo,
  update,
})
</script>

<style lang="scss">
@import './index.scss';
</style>
