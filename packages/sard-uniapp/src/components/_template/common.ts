import { type PropType, type StyleValue } from 'vue'

export interface _TemplateProps {
  rootStyle?: StyleValue
  rootClass?: string
}

export const _templateProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
}

export interface _TemplateSlots {
  default(props: Record<string, never>): any
}

export interface _TemplateEmits {
  (e: 'click', event: any): void
}
