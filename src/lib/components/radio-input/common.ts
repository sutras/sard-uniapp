import { type RadioGroupOption } from '../radio/common'
import { type PopoutInputProps } from '../popout-input/common'
import {
  type RadioPopoutEmits,
  type RadioPopoutProps,
  defaultRadioPopoutProps,
} from '../radio-popout/common'
import { defaultConfig } from '../config'

export type RadioInputOption = RadioGroupOption

export interface RadioInputProps
  extends RadioPopoutProps,
    Omit<PopoutInputProps, 'modelValue'> {
  valueOnClear?: () => any
}

export const defaultRadioInputProps = () => ({
  ...defaultRadioPopoutProps(),
  ...defaultConfig.radioInput,
})

export interface RadioInputEmits extends RadioPopoutEmits {}
