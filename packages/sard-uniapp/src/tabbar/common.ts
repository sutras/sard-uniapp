import { type PropType, type StyleValue } from 'vue'

export interface TabbarProps {
  rootStyle?: StyleValue
  rootClass?: string
  current?: number | string
  color?: string
  activeColor?: string
  bordered?: boolean
}

// const props = withDefaults(defineProps<TabbarProps>(), {
//   bordered: true,
// })

export const tabbarProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  current: [Number, String],
  color: String,
  activeColor: String,
  bordered: {
    type: Boolean,
    default: true,
  },
}

export interface TabbarSlots {
  default(props: Record<string, never>): any
}

export interface TabbarEmits {
  (e: 'update:current', current: number | string): void
}

export interface TabbarItemProps {
  rootStyle?: StyleValue
  rootClass?: string
  name?: string | number
  icon?: string
  iconFamily?: string
  iconSize?: string
  badge?: number | string
  dot?: boolean
  text?: string
}

export const tabbarItemProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  name: [Number, String],
  icon: String,
  iconFamily: String,
  iconSize: String,
  badge: [Number, String],
  dot: Boolean,
  text: String,
}

export interface TabbarItemSlots {
  default(props: Record<string, never>): any
  icon(props: Record<string, never>): any
}

export interface TabbarItemEmits {
  (e: 'click', event: any): void
}

export interface TabbarContext {
  color: TabbarProps['color']
  activeColor: TabbarProps['activeColor']
  current: any
  select: (name: string | number) => void
}

export const tabbarContextSymbol = Symbol('tabbar-context')
