import { type StyleValue, type Ref } from 'vue'
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

export const defaultDropdownProps = defaultConfig.dropdown

export interface DropdownSlots {
  default?(props: Record<string, never>): any
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

export const defaultDropdownItemProps = {
  options: () => [],
}

export interface DropdownItemSlots {
  default?(props: Record<string, never>): any
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
