import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface SearchProps {
  rootStyle?: StyleValue
  rootClass?: string
  modelValue?: string
  placeholder?: string
  shape?: 'round' | 'square'
  background?: string
  inputBackground?: string
  inputColor?: string
  readonly?: boolean
  disabled?: boolean
  align?: 'left' | 'center' | 'right'
  cancel?: string
  search?: string
  focus?: boolean
}

export const defaultSearchProps = defaultConfig.search

export interface SearchSlots {
  prepend?(props: Record<string, never>): any
  append?(props: Record<string, never>): any
  'input-prepend'?(props: Record<string, never>): any
  'input-append'?(props: Record<string, never>): any
}

export interface SearchEmits {
  (e: 'update:model-value', value: string): void
  (e: 'cancel'): void
  (e: 'search', value: string): void
  (e: 'click', event: any): void
  (e: 'clear'): void
  (e: 'focus', event: any): void
  (e: 'blur', event: any): void
}
