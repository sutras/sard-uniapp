import { type PropType, type StyleValue } from 'vue'

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
}

// const props = withDefaults(defineProps<SearchProps>(), {
//   shape: 'square',
// })

export const searchProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  modelValue: String,
  placeholder: String,
  shape: {
    type: String as PropType<NonNullable<SearchProps['shape']>>,
    default: 'square',
  },
  background: String,
  inputBackground: String,
  inputColor: String,
  readonly: Boolean,
  disabled: Boolean,
  align: String as PropType<SearchProps['align']>,
  cancel: String,
  search: String,
}

export interface SearchSlots {
  prepend(props: Record<string, never>): any
  append(props: Record<string, never>): any
  'input-prepend'(props: Record<string, never>): any
  'input-append'(props: Record<string, never>): any
}

export interface SearchEmits {
  (e: 'update:model-value', value: string): void
  (e: 'cancel'): void
  (e: 'search', value: string): void
}
