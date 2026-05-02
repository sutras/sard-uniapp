import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'
import { shuffle } from '../../utils'

export interface KeyboardProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'number' | 'digit' | 'idcard' | 'random' | 'plate'
  mode?: KeyboardPlateMode
  disabledKey?: (key: string) => boolean
}

export const defaultKeyboardProps = (): DefaultProps<KeyboardProps> => ({
  type: 'number',
  mode: 'chinese',
  ...defaultConfig.keyboard,
})

export interface KeyboardSlots {
  default?(props: Record<string, never>): any
}
export type KeyboardPlateMode = 'chinese' | 'english'
export interface KeyboardEmits {
  (e: 'input', key: string): void
  (e: 'delete'): void
  (e: 'toggle', mode: KeyboardPlateMode): void
  (e: 'update:mode', mode: KeyboardPlateMode): void
}

export interface KeyBoardExpose {
  shuffle: () => void
  toggle: (mode?: KeyboardPlateMode) => void
}

const oneToNineChars = '123456789'
const oneToZeroChars = oneToNineChars + '0'
const provinceChars =
  '京津渝沪冀晋辽吉黑苏浙皖闽赣鲁豫鄂湘粤琼川贵云陕甘青蒙桂宁新藏'
const suffixChars = '使领警学港澳'
const englishChars = 'QWERTYUIOPASDFGHJKLZXCVBNM'

export const plateProvinceKeys = provinceChars.split('')
export const plateSuffixKeys = suffixChars.split('')
export const plateEnglishLetterKeys = englishChars.split('')

const numberOneToNine = oneToNineChars.split('')
const numberOneToZero = oneToZeroChars.split('')

export const numberKeys = numberOneToZero
export const digitKeys = [...numberOneToNine, '.', '0']
export const idcardKeys = [...numberOneToNine, 'X', '0']

export const chineseKeys = [...plateProvinceKeys, ...plateSuffixKeys]

export const englishKeys = [...numberOneToZero, ...plateEnglishLetterKeys]

export function getRandomKeys() {
  return shuffle(numberKeys.slice())
}
