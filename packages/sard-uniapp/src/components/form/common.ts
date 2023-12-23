import { type PropType, type StyleValue, type Ref, inject } from 'vue'
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

  showError?: boolean
  scrollToFirstError?: boolean
  scrollIntoViewOptions?: ScrollIntoViewOptions

  disabled?: boolean
  readonly?: boolean
  card?: boolean
}

// const props = withDefaults(defineProps<FormProps>(), {
//   direction: 'horizontal',
//   labelAlign: 'start',
//   labelValign: 'center',
//   starPosition: 'left',
//   showError: true,
//   validateTrigger: 'change',
//   disabled: undefined,
//   readonly: undefined,
//   validateOnRuleChange: true,
// })

export const formProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  model: Object as PropType<FormProps['model']>,
  rules: Object as PropType<FormProps['rules']>,
  validateTrigger: {
    type: [String, Array] as PropType<
      NonNullable<FormProps['validateTrigger']>
    >,
    default: defaultConfig.form.validateTrigger,
  },
  validateOnRuleChange: {
    type: Boolean,
    default: defaultConfig.form.validateOnRuleChange,
  },

  direction: {
    type: String as PropType<NonNullable<FormProps['direction']>>,
    default: defaultConfig.form.direction,
  },
  labelWidth: String,
  labelAlign: {
    type: String as PropType<NonNullable<FormProps['labelAlign']>>,
    default: defaultConfig.form.labelAlign,
  },
  labelValign: {
    type: String as PropType<NonNullable<FormProps['labelValign']>>,
    default: defaultConfig.form.labelValign,
  },
  starPosition: {
    type: String as PropType<NonNullable<FormProps['starPosition']>>,
    default: defaultConfig.form.starPosition,
  },

  showError: {
    type: Boolean,
    default: defaultConfig.form.showError,
  },
  scrollToFirstError: Boolean,
  scrollIntoViewOptions: Object as PropType<FormProps['scrollIntoViewOptions']>,

  disabled: {
    type: Boolean,
    default: undefined,
  },
  readonly: {
    type: Boolean,
    default: undefined,
  },
  card: Boolean,
}

export interface FormSlots {
  default(props: Record<string, never>): any
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
  showStar?: boolean

  label?: string
  required?: boolean | undefined
  name?: FieldName
  rules?: Rule | Rule[]
  validateTrigger?: TriggerType
  error?: string
  showError?: boolean
  inlaid?: boolean
}

// const props = withDefaults(defineProps<FormItemProps>(), {
//   required: undefined,
//   showError: undefined,
//   showStar: undefined,
// })

export const formItemProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,

  direction: String as PropType<NonNullable<FormItemProps['direction']>>,
  labelWidth: String,
  labelAlign: String as PropType<NonNullable<FormItemProps['labelAlign']>>,
  labelValign: String as PropType<NonNullable<FormItemProps['labelValign']>>,
  starPosition: String as PropType<NonNullable<FormItemProps['starPosition']>>,
  showStar: {
    type: Boolean,
    default: undefined,
  },

  label: String,
  required: {
    type: Boolean,
    default: undefined,
  },
  name: [String, Number, Array] as PropType<FormItemProps['name']>,
  rules: [Object, Array] as PropType<FormItemProps['rules']>,
  validateTrigger: [String, Array] as PropType<
    FormItemProps['validateTrigger']
  >,
  error: String,
  showError: {
    type: Boolean,
    default: undefined,
  },
  inlaid: Boolean,
}

export interface FormItemSlots {
  default(props: Record<string, never>): any
  validate(props: { state: ValidateState }): any
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
  showError: FormProps['showError']
  scrollIntoViewOptions: FormProps['scrollIntoViewOptions']
  disabled: FormProps['disabled']
  readonly: FormProps['readonly']
  addField: (context: FormItemContext) => void
  removeField: (context: FormItemContext) => void
  validator: Validator
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
