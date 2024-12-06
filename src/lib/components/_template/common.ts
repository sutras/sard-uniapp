import { type StyleValue } from 'vue'

export interface _TemplateProps {
  rootStyle?: StyleValue
  rootClass?: string
}

export interface _TemplateSlots {
  default?(props: Record<string, never>): any
}

export interface _TemplateEmits {
  (e: 'click', event: any): void
}

export interface _TemplateExpose {
  reset: () => void
}
