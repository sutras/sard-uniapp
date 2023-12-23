import { type PropType, type StyleValue, type Ref } from 'vue'
import { defaultConfig } from '../config'

export interface DropdownProps {
  rootStyle?: StyleValue
  rootClass?: string
  direction?: 'down' | 'up'
  disabled?: boolean
  awayClosable?: boolean
  overlayClosable?: boolean
  duration?: number
}

// const props = withDefaults(defineProps<DropdownProps>(), {
//   direction: 'down',
//   disabled: false,
//   awayClosable: true,
//   overlayClosable: true,
// })

export const dropdownProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  direction: {
    type: String as PropType<NonNullable<DropdownProps['direction']>>,
    default: defaultConfig.dropdown.direction,
  },
  disabled: {
    type: Boolean,
    default: defaultConfig.dropdown.disabled,
  },
  awayClosable: {
    type: Boolean,
    default: defaultConfig.dropdown.awayClosable,
  },
  overlayClosable: {
    type: Boolean,
    default: defaultConfig.dropdown.overlayClosable,
  },
  duration: {
    type: Number,
    default: defaultConfig.dropdown.duration,
  },
}

export interface DropdownSlots {
  default(props: Record<string, never>): any
}

export interface DropdownOption {
  label?: string
  value?: any
}

export interface DropdownItemProps {
  rootStyle?: StyleValue
  rootClass?: string
  title?: string
  label?: string
  options?: DropdownOption[]
  disabled?: boolean
  modelValue?: any
  visible?: boolean
  separator?: string
  placeholder?: string
}

// const props = withDefaults(defineProps<DropdownItemProps>(), {
//   options: () => [],
// })

export const dropdownItemProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  title: String,
  label: String,
  options: {
    type: Array as PropType<NonNullable<DropdownItemProps['options']>>,
    default: () => [],
  },
  disabled: String,
  modelValue: null,
  visible: Boolean,
  separator: String,
  placeholder: String,
}

export interface DropdownItemSlots {
  default(props: Record<string, never>): any
}

export interface DropdownItemEmits {
  (e: 'update:model-value', value: any): void
  (e: 'update:visible', visible: boolean): void
}

export interface DropdownContext {
  direction: DropdownProps['direction']
  disabled: DropdownProps['disabled']
  awayClosable: DropdownProps['awayClosable']
  overlayClosable: DropdownProps['overlayClosable']
  duration: DropdownProps['duration']
  hideOthers: (instance: any) => void
  register: (
    instance: any,
    expose: {
      hide: () => void
      visible: Ref<boolean>
    },
  ) => void
  unregister: (instance: any) => void
}

export const dropdownContextSymbol = Symbol('dropdown-context')
