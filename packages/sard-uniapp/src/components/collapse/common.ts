import { type PropType, type StyleValue } from 'vue'

export interface CollapseProps {
  rootStyle?: StyleValue
  rootClass?: string
  contentClass?: string
  contentStyle?: string
  visible?: boolean
}

export const collapseProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  contentClass: String,
  contentStyle: String,
  visible: Boolean,
}

export interface CollapseSlots {
  default(props: Record<string, never>): any
}
