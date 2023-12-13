import { type PropType, type StyleValue } from 'vue'
import { type NodeRect } from '../utils'

export interface IndexesProps {
  rootStyle?: StyleValue
  rootClass?: string
  current?: number | string
}

export const indexesProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  current: [String, Number],
}

export interface IndexesSlots {
  default(props: Record<string, never>): any
}

export interface IndexesEmits {
  (e: 'change', name: number | string): void
}

export interface IndexesExpose {
  scrollTo: (name: string | number) => void
}

export interface IndexesAnchorProps {
  rootStyle?: StyleValue
  rootClass?: string
  name: string | number
}

export const indexesAnchorProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  name: {
    type: [String, Number] as PropType<IndexesAnchorProps['name']>,
    required: true as const,
  },
}

export interface IndexesAnchorSlots {
  default(props: Record<string, never>): any
}

export interface IndexesNavProps {
  anchors: (string | number)[]
  current?: string | number
}

export const indexesNavProps = {
  anchors: {
    type: Array as PropType<IndexesNavProps['anchors']>,
    required: true as const,
  },
  current: [Number, String],
}

export interface IndexesNavSlots {
  default(props: Record<string, never>): any
}

export interface IndexesNavEmits {
  (e: 'select', name: string | number): void
}

export interface IndexesContext {
  register: (
    name: string | number,
    expose: {
      getRect: () => Promise<NodeRect>
      id: string
    },
  ) => void

  unregister: (name: string | number) => void
}

export const indexesContextSymbol = Symbol('indexes-context')
