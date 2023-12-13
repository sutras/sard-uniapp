import { type PropType, type StyleValue } from 'vue'
import { type TransitionHookName } from '../use'

export interface PopoutProps {
  rootStyle?: StyleValue
  rootClass?: string
  visible?: boolean
  title?: string
  type?: 'compact' | 'loose'
  showCancel?: boolean
  cancelText?: string
  showConfirm?: boolean
  confirmText?: string
  confirmDisabled?: boolean
  showClose?: boolean
  showFooter?: boolean
  overlayClosable?: boolean
  beforeClose?: (
    type: 'close' | 'cancel' | 'confirm',
  ) => boolean | undefined | Promise<any>
}

// const props = withDefaults(defineProps<PopoutProps>(), {
//   type: 'loose',
//   showClose: true,
//   overlayClosable: true,
//   showFooter: true,
//   showConfirm: true,
// })

export const popoutProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  visible: Boolean,
  title: String,
  type: {
    type: String as PropType<NonNullable<PopoutProps['type']>>,
    default: 'loose',
  },
  showCancel: Boolean,
  cancelText: String,
  showConfirm: {
    type: Boolean,
    default: true,
  },
  confirmText: String,
  confirmDisabled: Boolean,
  showClose: {
    type: Boolean,
    default: true,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  overlayClosable: {
    type: Boolean,
    default: true,
  },
  beforeClose: Function as PropType<PopoutProps['beforeClose']>,
}

export interface PopoutSlots {
  default(props: Record<string, never>): any
  title(props: Record<string, never>): any
  cancel(props: Record<string, never>): any
  confirm(props: Record<string, never>): any
  visible(props: { whole: boolean; already: boolean }): any
}

export interface PopoutEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'confirm'): void
  (e: 'visible-hook', name: TransitionHookName): void
}
