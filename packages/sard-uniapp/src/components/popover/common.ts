import { type PropType, type StyleValue } from 'vue'
import { type MenuOption } from '../menu/common'
import { type NodeRect } from '../../utils'
import { PopoverController } from './usePopover'
import { type Position } from './utils'
import { defaultConfig } from '../config'

export interface PopoverProps {
  rootStyle?: StyleValue
  rootClass?: string
  visible?: boolean
  options?: MenuOption[]
  position?: Position
  direction?: 'vertical' | 'horizontal'
  theme?: 'dark' | 'light'
  refGap?: number
  viewportGap: number
  transparent: boolean
  controller: PopoverController
}

// const props = withDefaults(defineProps<PopoverProps>(), {
//   refGap: 10,
//   viewportGap: 10,
//   position: 'bottom',
//   direction: 'vertical',
//   theme: 'light',
//   transparent: true,
// })

export const popoverProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  visible: Boolean,
  options: Array as PropType<PopoverProps['options']>,
  position: {
    type: String as PropType<NonNullable<PopoverProps['position']>>,
    default: defaultConfig.popover.position,
  },
  direction: {
    type: String as PropType<NonNullable<PopoverProps['direction']>>,
    default: defaultConfig.popover.direction,
  },
  theme: {
    type: String as PropType<NonNullable<PopoverProps['theme']>>,
    default: defaultConfig.popover.theme,
  },
  refGap: {
    type: Number,
    default: defaultConfig.popover.refGap,
  },
  viewportGap: {
    type: Number,
    default: defaultConfig.popover.viewportGap,
  },
  transparent: {
    type: Boolean,
    default: defaultConfig.popover.transparent,
  },
  duration: {
    type: Number,
    default: defaultConfig.popover.duration,
  },
  controller: Object as PropType<PopoverProps['controller']>,
}

// interface PopoverSlots {
//   default(props: Record<string, never>): any
//   content(props: Record<string, never>): any
// }
// defineSlots<PopoverSlots>()

export interface PopoverEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'select', option: MenuOption): void
}

export interface ReferenceExpose {
  getRect: () => NodeRect | Promise<NodeRect> | undefined
}

export interface PopoverReferenceProps {
  rootStyle?: StyleValue
  rootClass?: string
}

export const popoverReferenceProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
}

export interface PopoverReferenceSlots {
  default(props: Record<string, never>): any
}

export interface PopoverReferenceEmits {
  (e: 'click', event: any): void
}

export interface PopoverContext {
  show: () => void
  register: (expose: ReferenceExpose) => void
}

export const popoverContextSymbol = Symbol('popover-context')
