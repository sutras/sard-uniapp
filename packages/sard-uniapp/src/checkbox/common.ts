import { type PropType, type StyleValue } from 'vue'

export type IconType = 'square' | 'circle'

export interface CheckboxProps {
  rootStyle?: StyleValue
  rootClass?: string
  checked?: boolean
  value?: any
  label?: string
  disabled?: boolean
  readonly?: boolean
  size?: string
  type?: IconType
  checkedColor?: string
  validateEvent?: boolean
}

export const checkboxProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  checked: Boolean,
  value: null,
  label: String,
  disabled: {
    type: Boolean,
    default: undefined,
  },
  readonly: {
    type: Boolean,
    default: undefined,
  },
  size: String,
  type: String as PropType<CheckboxProps['type']>,
  checkedColor: String,
  validateEvent: {
    type: Boolean,
    default: true,
  },
}

// const props = withDefaults(defineProps<CheckboxProps>(), {
//   disabled: undefined,
//   readonly: undefined,
//   validateEvent: true,
// })

export interface CheckboxSlots {
  default(props: Record<string, never>): any
  icon(props: { checked: boolean }): any
}

export interface CheckboxEmits {
  (e: 'click', event: any): void
  (e: 'update:checked', checked: boolean): void
}

export interface CheckboxGroupProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: any[]
  disabled?: boolean
  readonly?: boolean
  size?: string
  type?: IconType
  checkedColor?: string
  direction?: 'horizontal' | 'vertical'
  validateEvent?: boolean
}

// const props = withDefaults(defineProps<CheckboxGroupProps>(), {
//   direction: 'vertical',
//   validateEvent: true,
// })

export const checkboxGroupProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  modelValue: Array as PropType<CheckboxGroupProps['modelValue']>,
  disabled: Boolean,
  readonly: Boolean,
  size: String,
  type: String as PropType<CheckboxGroupProps['type']>,
  checkedColor: String,
  direction: {
    type: String as PropType<CheckboxGroupProps['direction']>,
    default: 'vertical',
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
}

export interface CheckboxGroupSlots {
  default(props: Record<string, never>): any
  custom(props: { toggle: (value: any) => void; value: any[] }): any
}

export interface CheckboxGroupEmits {
  (e: 'click', event: any): void
  (e: 'update:model-value', value: any[]): void
}

export interface CheckboxContext {
  disabled: CheckboxGroupProps['disabled']
  readonly: CheckboxGroupProps['readonly']
  size: CheckboxGroupProps['size']
  type: CheckboxGroupProps['type']
  checkedColor: CheckboxGroupProps['checkedColor']
  value: any[]
  toggle: (value: any) => void
}

export const checkboxContextSymbol = Symbol('checkbox-context')

export const mapTypeIcon = {
  square: ['square', 'check-square-fill'],
  circle: ['circle', 'check-circle-fill'],
}
