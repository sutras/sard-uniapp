import { type Ref, computed, unref } from 'vue'
import { type UseLuckyDrawOptions, useLuckyDraw } from './useLuckyDraw'

export function getGridPrizeCount(row: number, column: number) {
  return row === 1 ? column : column === 1 ? row : row * 2 + column * 2 - 4
}

export function getGridCenterSize(row: number, column: number) {
  return {
    row: Math.max(row - 2, 0),
    column: Math.max(column - 2, 0),
  }
}

export function getGridIndex(row: number, column: number, index: number) {
  if (index < column) {
    return index
  }
  if (index % column === column - 1) {
    return column - 1 + ((index / column) >> 0)
  }
  if ((index / column) >> 0 === row - 1) {
    return column * 2 + row - 3 - (index % column)
  }
  if (index % column === 0) {
    return column * 2 + row * 2 - 4 - ((index / column) >> 0)
  }
  const rowNo = (index / column) >> 0
  const columnNo = index % column
  return ((rowNo - 1) * (column - 2) + columnNo) * -1
}

export interface UseLuckyGridOptions
  extends Omit<UseLuckyDrawOptions, 'count'> {
  row?: number | Ref<number>
  column?: number | Ref<number>
}

const defaultOptions = {
  row: 3,
  column: 3,
  endDelay: 500,
}

export function useLuckyGrid(options?: UseLuckyGridOptions) {
  const { row, column, ...restOptions } = Object.assign(
    {},
    defaultOptions,
    options,
  )

  const prizeCount = computed(() =>
    getGridPrizeCount(unref(row), unref(column)),
  )

  const grids = computed<number[]>(() => {
    if (prizeCount.value === 0) {
      return []
    }
    return Array(unref(row) * unref(column))
      .fill(0)
      .map((_, index) => getGridIndex(unref(row), unref(column), index))
  })

  const centerSize = computed(() => {
    return getGridCenterSize(unref(row), unref(column))
  })

  const { activeIndex, ...restResult } = useLuckyDraw({
    ...restOptions,
    count: prizeCount,
  })

  return {
    ...restResult,
    activeIndex: computed(() => {
      return activeIndex.value !== undefined
        ? activeIndex.value % prizeCount.value >> 0
        : undefined
    }),
    grids,
    centerSize,
  }
}

export type UseLuckyGridReturn = ReturnType<typeof useLuckyGrid>
