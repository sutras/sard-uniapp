<template>
  <view :class="datetimeRangePickerClass" :style="datetimeRangePickerStyle">
    <sar-tabs v-model:current="tabsCurrent" :list="tabsList" scrollable />

    <view :class="bem.e('container')">
      <view
        :class="bem.e('wrapper')"
        :style="
          stringifyStyle({
            transform: `translateX(${-Number(tabsCurrent) * 100}%)`,
          })
        "
      >
        <view :class="bem.e('pane')">
          <sar-datetime-picker
            v-bind="datetimePickerProps"
            v-model="startValue"
            @change="onChange"
          />
        </view>
        <view :class="bem.e('pane')">
          <sar-datetime-picker
            v-bind="datetimePickerProps"
            v-model="endValue"
            :min="startValue"
            @change="onChange"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  omit,
  toDate,
} from '../../utils'
import SarDatetimePicker from '../datetime-picker/datetime-picker.vue'
import SarTabs from '../tabs/tabs.vue'
import {
  type DatetimeRangePickerProps,
  type DatetimeRangePickerSlots,
  type DatetimeRangePickerEmits,
  defaultDatetimeRangePickerProps,
} from './common'
import {
  getMaxDate,
  getMinDate,
  normalizeRangeValue,
} from '../datetime-picker/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<DatetimeRangePickerProps>(),
  defaultDatetimeRangePickerProps,
)

defineSlots<DatetimeRangePickerSlots>()

const emit = defineEmits<DatetimeRangePickerEmits>()

const bem = createBem('datetime-range-picker')

// main
const datetimePickerProps = computed(() => {
  return omit(props, ['modelValue'])
})

// tabs
const tabsList = computed(() => {
  return [
    {
      title: props.tabs?.[0],
    },
    {
      title: props.tabs?.[1],
    },
  ]
})

const tabsCurrent = ref(0)

// value
const minDate = computed(() =>
  toDate(props.min || getMinDate(), props.valueFormat),
)

const maxDate = computed(() => {
  const maxDate = toDate(props.max || getMaxDate(), props.valueFormat)
  return maxDate < minDate.value ? new Date(minDate.value) : maxDate
})

const startValue = ref<string | Date>()
const endValue = ref<string | Date>()

watch(
  () => props.modelValue,
  (value) => {
    const [start, end] = normalizeRangeValue(
      minDate.value,
      maxDate.value,
      value,
      props.valueFormat,
    )
    startValue.value = start
    endValue.value = end
  },
  {
    immediate: true,
  },
)

const onChange = () => {
  if (startValue.value && endValue.value) {
    const emitValue = [startValue.value, endValue.value]
    emit('update:model-value', emitValue)
    emit('change', emitValue)
  }
}

// others
const datetimeRangePickerClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const datetimeRangePickerStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
