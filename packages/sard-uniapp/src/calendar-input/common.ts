import { type CalendarProps, calendarProps } from '../calendar/common'
import { type PopoutInputProps, popoutInputProps } from '../popout-input/common'

export interface CalendarInputProps
  extends CalendarProps,
    Omit<PopoutInputProps, 'modelValue'> {
  visible?: boolean
  title?: string
  showConfirm?: boolean
}

// const props = withDefaults(defineProps<CalendarInputProps>(), {
//   showConfirm: true,
//   type: 'single',
//   maxDays: Number.MAX_SAFE_INTEGER,
//   weekStartsOn: 0,
//   validateEvent: true,
// })

export const calendarInputProps = {
  ...popoutInputProps,
  ...calendarProps,
  visible: Boolean,
  title: String,
  showConfirm: {
    type: Boolean,
    default: true,
  },
}

export interface CalendarInputEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: Date | Date[] | undefined): void
}
