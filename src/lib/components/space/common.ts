import { type StyleValue } from 'vue'
import { type DefaultProps, defaultConfig } from '../config'

export type SpaceSize = 'small' | 'middle' | 'large'
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline'
export type SpaceJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'

export interface SpaceProps {
  rootStyle?: StyleValue
  rootClass?: string
  direction?: 'vertical' | 'horizontal'
  size?: SpaceSize | (string & {})
  align?: SpaceAlign | (string & {})
  justify?: SpaceJustify | (string & {})
  wrap?: boolean
}

export const spaceSizes = ['small', 'middle', 'large']

export const spaceMapAlign: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
}

export const spaceMapJustify: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
}

export const defaultSpaceProps = (): DefaultProps<SpaceProps> => ({
  direction: 'horizontal',
  size: 'middle',
  ...defaultConfig.space,
})

export interface SpaceSlots {
  default?(props: Record<string, never>): any
}
