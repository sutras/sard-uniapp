import {
  type DatetimePickerProps,
  datetimePickerProps,
} from '../datetime-picker/common'
import { type PopoutInputProps, popoutInputProps } from '../popout-input/common'

export interface DatetimePickerInputProps
  extends DatetimePickerProps,
    Omit<PopoutInputProps, 'modelValue'> {
  visible?: boolean
  title?: string
  outletFormat?: string
}

export const datetimePickerInputProps = {
  ...popoutInputProps,
  ...datetimePickerProps,
  visible: Boolean,
  title: String,
  outletFormat: String,
}

export interface DatetimePickerInputEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', date: Date | undefined): void
}

export const mapTypeFormat = {
  y: 'YYYY',
  yM: 'YYYY-MM',
  yMd: 'YYYY-MM-DD',
  yMdhm: 'YYYY-MM-DD HH:mm',
  yMdhms: 'YYYY-MM-DD HH:mm:ss',
  hm: 'HH:mm',
  hms: 'HH:mm:ss',
}
