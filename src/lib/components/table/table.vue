<template>
  <sar-table-fixation
    :table-width="tableWidth"
    :scroll-y="fixedRow"
    :height="height"
    :bordered="bordered"
    :underline="underline"
    @scroll-side="onScrollSide"
  >
    <view :id="tableId" :class="tableClass" :style="tableStyle">
      <slot></slot>
    </view>
  </sar-table-fixation>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  uniqid,
  getBoundingClientRect,
  isNullish,
} from '../../utils'
import {
  type TableProps,
  type TableSlots,
  type TableContext,
  tableContextSymbol,
  TableScrollSide,
  defaultTableProps,
} from './common'
import SarTableFixation from '../table-fixation/table-fixation.vue'
import { useWindowResize } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<TableProps>(), defaultTableProps)

defineSlots<TableSlots>()

const bem = createBem('table')

// main

// table width
const tableId = uniqid()
const instance = getCurrentInstance()

const tableWidth = ref(0)

const setTableRect = async () => {
  const tableRect = await getBoundingClientRect(`#${tableId}`, instance)
  tableWidth.value = tableRect.width
}

onMounted(() => {
  nextTick(setTableRect)
})

useWindowResize(setTableRect)

// fixed row
const fixedRow = computed(() => {
  return !isNullish(props.height)
})

// scroll side
const scrollSide = ref<TableScrollSide | null>(null)

const onScrollSide = (side: TableScrollSide | null) => {
  scrollSide.value = side
}

provide<TableContext>(tableContextSymbol, reactive({}))

// others
const tableClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('bordered', props.bordered),
    bem.m('underline', props.underline),
    bem.m('scroll-' + scrollSide.value, scrollSide.value),
    props.rootClass,
  )
})

const tableStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
