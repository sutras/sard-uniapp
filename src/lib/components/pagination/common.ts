import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface PaginationProps {
  rootStyle?: StyleValue
  rootClass?: string
  total?: number
  pageSize?: number
  current?: number
  pageCount?: number
  pageButtonCount?: number
  hideOnSinglePage?: boolean
  type?: 'simple' | 'multi'
  ellipsis?: boolean
  multiCount?: number
}

export const defaultPaginationProps = defaultConfig.pagination

export interface PaginationSlots {
  prev?(props: Record<string, never>): any
  next?(props: Record<string, never>): any
}

export interface PaginationEmits {
  (e: 'update:current', page: number): void
}

/**
 * @description: 获取页面范围
 * @param {number} current 当前页码
 * @param {number} pageCount 总页数
 * @param {number} pageItemCount 要展示的页数
 * @return {[number, number]}
 */
export function getPageRange(
  current: number,
  pageCount: number,
  pageItemCount: number,
) {
  let min = current - Math.ceil((pageItemCount - 1) / 2)
  let max = current + Math.floor((pageItemCount - 1) / 2)
  const minLack = 1 - min
  const maxLack = max - pageCount
  if (maxLack > 0) {
    min -= maxLack
  }
  if (min < 1) {
    min = 1
  }
  if (minLack > 0) {
    max += minLack
  }
  if (max > pageCount) {
    max = pageCount
  }

  return [min, max]
}
