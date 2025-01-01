import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export type SpaceSize = 'small' | 'middle' | 'large'
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline'

export interface SpaceProps {
  rootStyle?: StyleValue
  rootClass?: string
  direction?: 'vertical' | 'horizontal'
  size?: SpaceSize | (string & {})
  align?: SpaceAlign | (string & {})
  wrap?: boolean
}

export const spaceSizes = ['small', 'middle', 'large']

export const spaceMapAlign: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
}

export const defaultSpaceProps = defaultConfig.space

export interface SpaceSlots {
  default?(props: Record<string, never>): any
}
