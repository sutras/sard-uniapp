import { type CalendarProps, calendarProps } from '../calendar/common'
import { defaultConfig } from '../config'
import { type PopoutInputProps, popoutInputProps } from '../popout-input/common'

export interface CalendarInputProps
  extends CalendarProps,
    Omit<PopoutInputProps, 'modelValue' | 'loading'> {
  visible?: boolean
  title?: string
  showConfirm?: boolean
  validateEvent?: boolean
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
    default: defaultConfig.calendarInput.showConfirm,
  },
  validateEvent: {
    type: Boolean,
    default: defaultConfig.calendarInput.validateEvent,
  },
}

export interface CalendarInputEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: Date | Date[] | undefined): void
}
