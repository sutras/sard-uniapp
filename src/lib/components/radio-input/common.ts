import { type RadioGroupOption } from '../radio/common'
import { type PopoutInputProps } from '../popout-input/common'
import {
  type RadioPopoutEmits,
  type RadioPopoutProps,
  defaultRadioPopoutProps,
} from '../radio-popout/common'

export type RadioInputOption = RadioGroupOption

export interface RadioInputProps
  extends RadioPopoutProps,
    Omit<PopoutInputProps, 'modelValue'> {}

export const defaultRadioInputProps = defaultRadioPopoutProps

export interface RadioInputEmits extends RadioPopoutEmits {}
