import { type StyleValue, type Ref, inject } from 'vue'
import { type Validator, type Rule } from './Validator'
import { type ScrollIntoViewOptions } from '../../utils'
import { defaultConfig } from '../config'

export interface FormRules {
  [key: PropertyKey]: Rule | Rule[] | FormRules
}

export type FieldName = string | number | (string | number)[]

export type ValidateState = '' | 'success' | 'error' | 'validating'

export type TriggerType = 'change' | 'blur' | ('change' | 'blur')[]

export interface FieldValidateError {
  name: FieldName
  value: any
  message: string
}

export interface FormProps {
  rootStyle?: StyleValue
  rootClass?: string
  model?: Record<string, any>
  rules?: FormRules
  validateTrigger?: TriggerType
  validateOnRuleChange?: boolean

  direction?: 'horizontal' | 'vertical'
  labelWidth?: string
  labelAlign?: 'start' | 'center' | 'end'
  labelValign?: 'start' | 'center' | 'end'
  starPosition?: 'left' | 'right'
  contentPosition?: 'left' | 'right'

  hideStar?: boolean
  showError?: boolean
  scrollToFirstError?: boolean
  scrollIntoViewOptions?: ScrollIntoViewOptions
  scrollDuration?: number

  disabled?: boolean
  readonly?: boolean
  card?: boolean
}

export const defaultFormProps = defaultConfig.form as Omit<
  typeof defaultConfig.form,
  'validateTrigger'
>

export interface FormSlots {
  default?(props: Record<string, never>): any
}

export interface FormExpose {
  validate: (nameList?: FieldName[]) => Promise<void>
  reset: (nameList?: FieldName[]) => Promise<void>
  clearValidate: (nameList?: FieldName[]) => Promise<void>
  scrollToField: (name: FieldName) => void
}

export interface FormItemProps {
  rootStyle?: StyleValue
  rootClass?: string

  direction?: 'horizontal' | 'vertical'
  labelWidth?: string
  labelAlign?: 'start' | 'center' | 'end'
  labelValign?: 'start' | 'center' | 'end'
  starPosition?: 'left' | 'right'
  label?: string
  hideStar?: boolean
  contentPosition?: 'left' | 'right'

  required?: boolean | undefined
  name?: FieldName
  rules?: Rule | Rule[]
  validateTrigger?: TriggerType
  error?: string
  showError?: boolean
  inlaid?: boolean
}

export const defaultFormItemProps = () => ({
  ...defaultConfig.formItem,
  required: undefined,
})

export interface FormItemSlots {
  default?(props: Record<string, never>): any
  label?(props: Record<string, never>): any
  validate?(props: { state: ValidateState }): any
  error?(props: { message: string; showError: boolean }): any
}

export interface FormItemExpose {
  validate: (trigger?: string | string[]) => Promise<void>
  reset: () => Promise<void>
  clearValidate: () => void
  scrollToField: () => void
  validateMessage: Ref<string>
  validateState: Ref<ValidateState>
}

export interface FormContext {
  model: FormProps['model']
  rules: FormProps['rules']
  validateTrigger: FormProps['validateTrigger']
  direction: FormProps['direction']
  labelWidth: FormProps['labelWidth']
  labelAlign: FormProps['labelAlign']
  labelValign: FormProps['labelValign']
  starPosition: FormProps['starPosition']
  contentPosition: FormProps['contentPosition']
  hideStar: FormProps['hideStar']
  showError: FormProps['showError']
  scrollIntoViewOptions: FormProps['scrollIntoViewOptions']
  disabled: FormProps['disabled']
  readonly: FormProps['readonly']
  addField: (context: FormItemContext) => void
  removeField: (context: FormItemContext) => void
  validator: Validator
  scrollDuration: number
}

export interface FormItemContext {
  name: FormItemProps['name']
  validateMessage: string
  validateState: ValidateState
  validate: (trigger?: string | string[]) => Promise<void>
  reset: () => Promise<void>
  clearValidate: () => void
  scrollToField: () => void
  onBlur: () => void
  onChange: () => void
}

export const formContextSymbol = Symbol('form-context')

export const formItemContextSymbol = Symbol('form-item-context')

export function useFormContext() {
  return inject<FormContext | null>(formContextSymbol, null)
}

export function useFormItemContext() {
  return inject<FormItemContext | null>(formItemContextSymbol, null)
}
