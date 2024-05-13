import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface KeyboardProps {
  rootStyle?: StyleValue
  rootClass?: string
  type?: 'number' | 'digit' | 'idcard' | 'random' | 'plate'
}

export const keyboardPropsDefaults = defaultConfig.keyboard

export interface KeyboardSlots {
  default?(props: Record<string, never>): any
}

export interface KeyboardEmits {
  (e: 'input', key: string): void
  (e: 'delete'): void
}

export interface KeyBoardExpose {
  shuffle: () => void
  toggle: () => void
}

export const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
export const digitKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0']
export const idcardKeys = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'X',
  '0',
]

export const chineseKeys = [
  '京',
  '津',
  '渝',
  '沪',
  '冀',
  '晋',
  '辽',
  '吉',
  '黑',
  '苏',
  '浙',
  '皖',
  '闽',
  '赣',
  '鲁',
  '豫',
  '鄂',
  '湘',
  '粤',
  '琼',
  '川',
  '贵',
  '云',
  '陕',
  '甘',
  '青',
  '蒙',
  '桂',
  '宁',
  '新',
  '藏',
  '港',
  '澳',
  '使',
  '领',
  '警',
  '学',
]

export const englishKeys = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
]

export function shuffle(arr: any[]) {
  const newArr = arr.slice()
  for (let i = arr.length - 1; i >= 0; i--) {
    const randomIndex = ~~(Math.random() * (i + 1))
    const randomItem = newArr[randomIndex]
    newArr[randomIndex] = newArr[i]
    newArr[i] = randomItem
  }
  return newArr
}

export function getRandomKeys() {
  return shuffle(numberKeys)
}
