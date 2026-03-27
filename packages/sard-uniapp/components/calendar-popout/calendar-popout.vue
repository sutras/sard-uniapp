<template>
  <sar-popout
    v-model:visible="innerVisible"
    :title="$slots.title ? '' : title"
    :show-confirm="showConfirm"
    :confirm-disabled="confirmDisabled"
    :root-class="popoutClass"
    :root-style="popoutStyle"
    @confirm="onConfirm"
    @visible-hook="onVisibleHook"
  >
    <template #title-prepend>
      <slot name="title-prepend"></slot>
    </template>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #visible="{ already }">
      <sar-calendar
        v-if="already"
        v-bind="omittedProps"
        :model-value="popoutValue"
        @change="onChange"
      />
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SarPopout from '../popout/popout.vue'
import SarCalendar from '../calendar/calendar.vue'
import {
  type CalendarPopoutProps,
  type CalendarPopoutEmits,
  defaultCalendarPopoutProps,
} from './common'
import { omitFormPopoutProps, useFormPopout } from '../../use'

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
const omittedProps = omitFormPopoutProps(props)

const { innerVisible, popoutValue, onChange, onConfirm, onVisibleHook } =
  useFormPopout(props, emit, {
    onChange() {
      if (!props.showConfirm && !confirmDisabled.value) {
        onConfirm(false)
        innerVisible.value = false
      }
    },
  })

const confirmDisabled = computed(() => {
  const value = popoutValue.value
  return !value || (Array.isArray(value) && value.length === 0)
})
</script>
