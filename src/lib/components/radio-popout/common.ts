import { type RadioGroupProps } from '../radio/common'
import { type DefaultProps, defaultConfig } from '../config'
import { type TransitionHookEmits } from '../popup/common'
import { type FormPopoutProps } from '../../use/useFormPopout'

export interface RadioPopoutProps extends FormPopoutProps, RadioGroupProps {
  searchable?: boolean
  filterPlaceholder?: string
  iconPosition?: 'left' | 'right'
}

export const defaultRadioPopoutProps = (): DefaultProps<RadioPopoutProps> => ({
  validateEvent: true,
  type: 'circle',
  iconPosition: 'left',
  ...defaultConfig.radioPopout,
  options: () => [],
})

export interface RadioPopoutSlots {
  default?(props: Record<string, never>): any
}

export interface RadioPopoutEmits extends TransitionHookEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:model-value', value: any): void
  (e: 'change', value: any): void
  (e: 'confirm'): void
}

export interface RadioPopoutExpose {}
