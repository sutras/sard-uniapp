import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'
import { type InputProps } from '../input'
export interface PopoutInputProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: any
  placeholder?: string
  readonly?: boolean
  disabled?: boolean
  clearable?: boolean
  loading?: boolean
  multiline?: boolean
  arrow?: string
  arrowFamily?: string
  internalPrepend?: number
  internalAppend?: number
  internalArrow?: number
  inputProps?: InputProps
}

export const defaultPopoutInputProps = (): DefaultProps<PopoutInputProps> => ({
  arrow: 'caret-right',
  arrowFamily: 'sari',
  ...defaultConfig.popoutInput,
})

export interface PopoutInputEmits {
  (e: 'click', event: any): void
  (e: 'update:model-value', value: string): void
  (e: 'change', value: string): void
  (e: 'clear'): void
}

export interface PopoutInputSlots {
  prepend?(): any
  append?(): any
  arrow?(): any
}

export const popoutInputContextSymbol = Symbol('popout-input-context')
