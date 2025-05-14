import { type DatetimePickerProps } from '../datetime-picker/common'
import { type PopoutInputProps } from '../popout-input/common'
import { defaultConfig } from '../config'
import { type StyleValue } from 'vue'

export interface DatetimePickerInputProps
  extends DatetimePickerProps,
    Omit<PopoutInputProps, 'modelValue' | 'loading'> {
  visible?: boolean
  title?: string
  outletFormat?: string
  valueFormat?: string
  validateEvent?: boolean
  popoutClass?: string
  popoutStyle?: StyleValue
}

export const defaultDatetimePickerInputProps = () => ({
  ...defaultConfig.datetimePicker,
  ...defaultConfig.datetimePickerInput,
})

export interface DatetimePickerInputEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', date: Date | string | undefined): void
  (e: 'change', date: Date | string | undefined): void
}

export const mapTypeFormat = {
  y: 'YYYY',
  yM: 'YYYY-MM',
  yMd: 'YYYY-MM-DD',
  yMdh: 'YYYY-MM-DD HH',
  yMdhm: 'YYYY-MM-DD HH:mm',
  yMdhms: 'YYYY-MM-DD HH:mm:ss',
  hm: 'HH:mm',
  hms: 'HH:mm:ss',
}
