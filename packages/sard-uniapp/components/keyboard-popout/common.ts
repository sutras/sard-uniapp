import { type DefaultProps, defaultConfig } from '../config'
import {
  type KeyboardProps,
  type KeyboardPlateMode,
  type KeyBoardExpose,
} from '../keyboard/common'
import { type TransitionHookEmits } from '../popup/common'
import { type FormPopoutProps } from '../../use/useFormPopout'

export interface KeyboardPopoutProps extends FormPopoutProps, KeyboardProps {
  transparent?: boolean
}

export const defaultKeyboardPopoutProps =
  (): DefaultProps<KeyboardPopoutProps> => ({
    transparent: false,
    showConfirm: true,
    showCancel: true,
    ...defaultConfig.keyboard,
    ...defaultConfig.keyboardPopout,
  })

export interface KeyboardPopoutSlots {
  default?(props: Record<string, never>): any
}

export interface KeyboardPopoutEmits extends TransitionHookEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'confirm'): void
  (e: 'back-press'): void
  (e: 'input', key: string): void
  (e: 'delete'): void
  (e: 'toggle', mode: KeyboardPlateMode): void
  (e: 'update:mode', mode: KeyboardPlateMode): void
}

export interface KeyboardPopoutExpose extends KeyBoardExpose {}
