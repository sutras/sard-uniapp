import { type PropType, type StyleValue } from 'vue'

export interface MenuOption {
  text?: string
  disabled?: boolean
  icon?: string
  iconFamily?: string
}

export interface MenuProps {
  rootStyle?: StyleValue
  rootClass?: string
  options?: MenuOption[]
  direction?: 'vertical' | 'horizontal'
  theme?: 'dark' | 'light'
}

// const props = withDefaults(defineProps<MenuProps>(), {
//   options: () => [],
// })

export const menuProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  options: {
    type: Array as PropType<NonNullable<MenuProps['options']>>,
    default: () => [],
  },
  direction: String as PropType<MenuProps['direction']>,
  theme: String as PropType<MenuProps['theme']>,
}

export interface MenuEmits {
  (e: 'select', option: MenuOption): void
}

export interface MenuItemProps {
  text?: string
  disabled?: boolean
  icon?: string
  iconFamily?: string
  withIcon?: boolean
  direction?: 'vertical' | 'horizontal'
}

export const menuItemProps = {
  text: String,
  disabled: Boolean,
  icon: String,
  iconFamily: String,
  withIcon: Boolean,
  direction: String as PropType<MenuItemProps['direction']>,
}

export interface MenuItemEmits {
  (e: 'click', event: any): void
}
