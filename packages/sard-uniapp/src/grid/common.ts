import { type PropType, type StyleValue } from 'vue'

export interface GridProps {
  rootStyle?: StyleValue
  rootClass?: string
  columns?: number
  gap?: string
  bordered?: boolean
  square?: boolean
  clickable?: boolean
  reverse?: boolean
  direction?: 'horizontal' | 'vertical'
}

// const props = withDefaults(defineProps<GridProps>(), {
//   columns: 4,
//   direction: 'vertical',
// })

export const gridProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  columns: {
    type: Number,
    default: 4,
  },
  gap: String,
  bordered: Boolean,
  square: Boolean,
  clickable: Boolean,
  reverse: Boolean,
  direction: {
    type: String as PropType<NonNullable<GridProps['direction']>>,
    default: 'vertical',
  },
}

export interface GridSlots {
  default(props: Record<string, never>): any
}

export interface GridItemProps {
  rootStyle?: StyleValue
  rootClass?: string
  text?: string
  icon?: string
  iconSize?: string
  iconColor?: string
  iconFamily?: string
}

export const gridItemProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  text: String,
  icon: String,
  iconSize: String,
  iconColor: String,
  iconFamily: String,
}

export interface GridItemSlots {
  default(props: Record<string, never>): any
  icon(props: Record<string, never>): any
  text(props: Record<string, never>): any
}

export interface GridItemEmits {
  (e: 'click', event: any): void
}

export type GridContext = {
  columns: NonNullable<GridProps['columns']>
  gap: GridProps['gap']
  gutter: readonly [number, string]
}

export const gridSymbol = Symbol('grid')
