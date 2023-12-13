import {
  type PropType,
  type StyleValue,
  inject,
  ref,
  provide,
  watch,
  reactive,
} from 'vue'
import { type TransitionHookName } from '../use'

export interface PopupProps {
  rootStyle?: StyleValue
  rootClass?: string
  visible?: boolean
  duration?: number | [number, number]
  effect?:
    | 'slide-top'
    | 'slide-right'
    | 'slide-bottom'
    | 'slide-left'
    | 'zoom'
    | 'fade'
  overlay?: boolean
  overlayClass?: string
  overlayStyle?: string
  background?: string
  transparent?: boolean
}

// const props = withDefaults(defineProps<PopupProps>(), {
//   overlay: true,
//   effect: 'fade',
//   duration: 300,
// })

export const popupProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  visible: Boolean,
  duration: {
    type: [Number, Array] as PropType<NonNullable<PopupProps['duration']>>,
    default: 300,
  },
  effect: {
    type: String as PropType<PopupProps['effect']>,
    default: 'fade',
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  overlayClass: String,
  overlayStyle: String,
  background: String,
  transparent: Boolean,
}

export interface PopupSlots {
  default(props: Record<string, never>): any
}

export interface PopupEmits {
  (e: 'overlay-click', event: any): void
  (e: 'before-enter'): void
  (e: 'enter'): void
  (e: 'after-enter'): void
  (e: 'enter-cancelled'): void
  (e: 'before-leave'): void
  (e: 'leave'): void
  (e: 'after-leave'): void
  (e: 'leave-cancelled'): void
  (e: 'visible-hook', name: TransitionHookName): void
}

export interface PopupContext {
  visibleState: TransitionHookName | undefined
}

export const popupContextSymbol = Symbol('popup-context')

export function usePopupVisibleHookProvide() {
  const visibleState = ref<TransitionHookName>()

  provide<PopupContext>(
    popupContextSymbol,
    reactive({
      visibleState,
    }),
  )

  function callVisibleHook(name: TransitionHookName) {
    visibleState.value = name
  }

  return callVisibleHook
}

export function usePopupEnter(callback: () => void) {
  const context = inject<PopupContext | null>(popupContextSymbol, null)
  if (context) {
    watch(
      () => context.visibleState,
      () => {
        if (context.visibleState === 'enter') {
          callback?.()
        }
      },
    )
  }
}
