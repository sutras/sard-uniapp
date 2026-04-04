import { type StyleValue } from 'vue'
import {
  type CanvasTextAlign,
  type BarcodeFormat,
  type BarcodeTextPosition,
  type CanvasFontStyle,
  type CanvasFontWeight,
} from '../../utils'
import { type DefaultProps, defaultConfig } from '../config'

export interface BarcodeProps {
  rootStyle?: StyleValue
  rootClass?: string
  value?: string
  format?: BarcodeFormat
  width?: number
  height?: number
  color?: string
  background?: string
  displayValue?: boolean
  textPosition?: BarcodeTextPosition
  textAlign?: CanvasTextAlign
  textMargin?: number
  fontStyle?: CanvasFontStyle
  fontWeight?: CanvasFontWeight
  fontSize?: number
  fontFamily?: string
  margin?: number
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  showMenuByLongpress?: boolean
}

export const defaultBarcodeProps = (): DefaultProps<BarcodeProps> => ({
  value: '',
  format: 'CODE128',
  width: 2,
  height: 100,
  color: '#000',
  background: '#fff',
  displayValue: true,
  textPosition: 'bottom',
  textAlign: 'center',
  textMargin: 5,
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: 14,
  fontFamily: 'monospace',
  margin: 10,
  showMenuByLongpress: false,
  ...defaultConfig.barcode,
})

export interface BarcodeEmits {
  (e: 'success', tempFilePath: string): void
}
