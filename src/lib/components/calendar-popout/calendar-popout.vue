<template>
  <sar-popout
    v-model:visible="innerVisible"
    :title="title"
    :show-confirm="showConfirm"
    :confirm-disabled="confirmDisabled"
    :root-class="popoutClass"
    :root-style="popoutStyle"
    @confirm="onConfirm"
  >
    <template #visible="{ already }">
      <sar-calendar
        v-if="already"
        :model-value="popoutValue"
        :type="type"
        :min="min"
        :max="max"
        :current-date="currentDate"
        :disabled-date="disabledDate"
        :max-days="maxDays"
        :over-max-days="overMaxDays"
        :week-starts-on="weekStartsOn"
        :formatter="formatter"
        :allow-same-day="allowSameDay"
        :several-months="severalMonths"
        :value-format="valueFormat"
        @change="onChange"
      />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import SarPopout from '../popout/popout.vue'
import SarCalendar from '../calendar/calendar.vue'
import {
  type CalendarPopoutProps,
  type CalendarPopoutEmits,
  defaultCalendarPopoutProps,
} from './common'
import { useFormItemContext } from '../form/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<CalendarPopoutProps>(),
  defaultCalendarPopoutProps(),
)

const emit = defineEmits<CalendarPopoutEmits>()

// main

// visible
const innerVisible = ref(props.visible)

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
  },
)

watch(innerVisible, () => {
  emit('update:visible', innerVisible.value)
})

// value
const formItemContext = useFormItemContext()

const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue
    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

const popoutValue = ref(props.modelValue)

watch(innerValue, () => {
  popoutValue.value = innerValue.value
})

const confirmDisabled = computed(() => {
  const value = popoutValue.value
  return !value || (Array.isArray(value) && value.length === 0)
})

const onChange = (value: any) => {
  popoutValue.value = value

  if (!props.showConfirm && !confirmDisabled.value) {
    onConfirm()
    innerVisible.value = false
  }
}

const onConfirm = () => {
  if (popoutValue.value !== innerValue.value) {
    innerValue.value = popoutValue.value
    emit('update:model-value', innerValue.value)
    emit('change', innerValue.value)
  }
}
</script>
