import {
  type FormExpose,
  type FormProps,
  type FormSlots,
  type FormItemProps,
  type FormItemExpose,
  type ValidateState,
} from '../form/common'

export interface FormPlainProps extends FormProps {}

export interface FormPlainSlots extends FormSlots {}

export interface FormPlainExpose extends FormExpose {}

export interface FormItemPlainProps extends FormItemProps {}

export interface FormItemPlainSlotsProps {
  fieldId: string
  validateState: ValidateState
  shouldShowStar: boolean
  validateMessage: string
  shouldShowError: boolean
  direction: FormProps['direction']
  labelAlign: FormProps['labelAlign']
  labelValign: FormProps['labelValign']
  starPosition: FormProps['starPosition']
  labelWidth: FormProps['labelWidth']
}

export interface FormItemPlainSlots {
  default?(props: Record<string, never>): any
  custom?(props: FormItemPlainSlotsProps): any
}

export interface FormItemPlainExpose extends FormItemExpose {}
