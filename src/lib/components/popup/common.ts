import { type StyleValue, inject, ref, provide, watch, reactive } from 'vue'
import { type TransitionHookName } from '../../use'
import { defaultConfig } from '../config'

export interface PopupProps {
  rootStyle?: StyleValue
  rootClass?: string
  visible?: boolean
  duration?: number
  effect?:
    | 'slide-top'
    | 'slide-right'
    | 'slide-bottom'
    | 'slide-left'
    | 'zoom'
    | 'fade'
    | 'full-fade'
  overlay?: boolean
  overlayClass?: string
  overlayStyle?: string
  background?: string
  transparent?: boolean
  keepRender?: boolean
  overlayClosable?: boolean
  lockScroll?: boolean
}

export const defaultPopupProps = defaultConfig.popup

export interface PopupSlots {
  default?(props: Record<string, never>): any
}

export interface TransitionHookEmits {
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

export interface TransitionHookCallbacks {
  onVisibleHook?: (name: TransitionHookName) => void
  onBeforeEnter?: () => void
  onEnter?: () => void
  onAfterEnter?: () => void
  onEnterCancelled?: () => void
  onBeforeLeave?: () => void
  onLeave?: () => void
  onAfterLeave?: () => void
  onLeaveCancelled?: () => void
}

export interface PopupEmits extends TransitionHookEmits {
  (e: 'overlay-click', event: any): void
  (e: 'update:visible', visible: boolean): void
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

export function useInPopup() {
  return !!inject<PopupContext | null>(popupContextSymbol, null)
}
