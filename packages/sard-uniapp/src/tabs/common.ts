import { type PropType, type StyleValue } from 'vue'
import { type NodeRect } from '../utils'

export interface TabOption {
  rootStyle?: StyleValue
  rootClass?: string
  title?: string
  name?: string | number
  disabled?: boolean
}

export interface TabsProps {
  rootStyle?: StyleValue
  rootClass?: string
  current?: string | number
  list?: TabOption[]
  type?: 'line' | 'pill' | 'card'
  scrollable?: boolean
}

// const props = withDefaults(defineProps<TabsProps>(), {
//   type: 'line',
// })

export const tabsProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  current: [String, Number] as PropType<TabsProps['current']>,
  list: Array as PropType<TabsProps['list']>,
  type: {
    type: String as PropType<TabsProps['type']>,
    default: 'line',
  },
  scrollable: Boolean,
}

export interface TabsSlots {
  default(props: Record<string, never>): any
}

export interface TabsEmits {
  (e: 'update:current', name: string | number): void
}

export interface TabProps {
  rootStyle?: StyleValue
  rootClass?: string
  title?: string
  name: string | number
  disabled?: boolean
}

export const tabProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  title: String,
  name: {
    type: [String, Number] as PropType<TabProps['name']>,
    required: true as const,
  },
  disabled: Boolean,
}

export interface TabSlots {
  default(props: Record<string, never>): any
}

export interface TabEmits {
  (e: 'click', event: any): void
}

export interface TabContext {
  current: any
  select: (name: string | number, rect?: NodeRect) => void
  register: (
    name: string | number,
    expose: {
      getRect: () => Promise<NodeRect>
    },
  ) => void

  unregister: (name: string | number) => void
}

export const tabContextSymbol = Symbol('tab-context')
