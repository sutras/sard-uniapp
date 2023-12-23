import { defaultConfig } from '../config'
import { type PickerProps, pickerProps } from '../picker/common'
import { type PopoutInputProps, popoutInputProps } from '../popout-input/common'

export interface PickerInputProps
  extends PickerProps,
    Omit<PopoutInputProps, 'modelValue'> {
  visible?: boolean
  title?: string
  validateEvent?: boolean
}

// const props = withDefaults(defineProps<PickerInputProps>(), {
//   columns: () => [],
//   immediateChange: false,
//   validateEvent: true,
// })

export const pickerInputProps = {
  ...popoutInputProps,
  ...pickerProps,
  visible: Boolean,
  title: String,
  validateEvent: {
    type: Boolean,
    default: defaultConfig.pickerInput.validateEvent,
  },
}

export interface PickerInputEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: any): void
}
