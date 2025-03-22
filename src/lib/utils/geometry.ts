export type ScrollIntoViewPosition = 'start' | 'center' | 'end' | 'nearest'

export interface ScrollIntoViewValueOptions {
  position?: ScrollIntoViewPosition
  startOffset?: number
  endOffset?: number
}

export interface ScrollIntoViewOptions {
  position?: ScrollIntoViewPosition
  startOffset?: number
  endOffset?: number
  duration?: number
}

/**    
```
                      page               
                     ╱ 
    ╭───────────────╮    viewport
  ╭─│─ ─ ─ ─ ─ ─ ─ ─│─╮ ╱  
  │ │ ╭───────────╮ │ │
  │ │ │  element  │ │ │
  │ │ ╰───────────╯ │ │
  ╰─│─ ─ ─ ─ ─ ─ ─ ─│─╯
    │               │
    │               │
    ╰───────────────╯
```

# 参数
- viewportHeight: viewport 高度
- viewportScrollTop: viewport 垂直滚动值
- elementHeight: element 高度
- elementOffsetTop: element 距离页面顶部距离

# 选项
- position: element 在视窗中的位置(start, center, end, nearest)
- startOffset: element 距离视窗顶部的偏移量
- endOffset: element 距离视窗底部的偏移量

# 结果值
- viewportScrollTop: viewport 新的垂直滚动值

*/
export function getScrollIntoViewValue(
  viewportHeight: number,
  viewportScrollTop: number,
  elementHeight: number,
  elementOffsetTop: number,
  options: ScrollIntoViewValueOptions = {},
) {
  const { startOffset = 0, endOffset = 0 } = options

  let position = options.position || 'nearest'

  const elementToViewportTopOffset =
    elementOffsetTop - viewportScrollTop - startOffset
  const elementToViewportBottomOffset =
    elementOffsetTop +
    elementHeight -
    viewportScrollTop -
    viewportHeight +
    endOffset

  if (position === 'nearest') {
    if (elementToViewportTopOffset >= 0 && elementToViewportBottomOffset <= 0) {
      return viewportScrollTop
    } else {
      position =
        Math.abs(elementToViewportTopOffset) >
        Math.abs(elementToViewportBottomOffset)
          ? 'end'
          : 'start'
    }
  }

  let nextScrollTop = 0

  switch (position) {
    case 'start':
      nextScrollTop = elementOffsetTop - startOffset
      break
    case 'center':
      nextScrollTop =
        elementOffsetTop -
        (viewportHeight - elementHeight - endOffset - startOffset) / 2 +
        startOffset
      break
    case 'end':
      nextScrollTop =
        elementOffsetTop + elementHeight - viewportHeight + endOffset
      break
  }

  return nextScrollTop
}

export interface NodeRect {
  top: number
  right: number
  bottom: number
  left: number
  height: number
  width: number
}

interface MatchScrollVisibleOptions {
  offset?: number
  errorValue?: number
}

/**
 * @description: 匹配元素列表中第一个位于滚动盒子可视区域的元素
 */
export async function matchScrollVisible(
  rects: NodeRect[],
  callback: (index: number) => unknown,
  options: MatchScrollVisibleOptions = {},
) {
  const { offset: optionOffset = 0, errorValue = 3 } = options
  const offset = optionOffset + errorValue

  const convertedRect = rects.map((rect, i) => {
    return {
      top: rect.top,
      bottom: i < rects.length - 1 ? rects[i + 1].top : 0,
    }
  })

  for (let i = 0, l = convertedRect.length; i < l; i++) {
    const rect = convertedRect[i]

    if (i === 0 && rect.top > offset) {
      return callback(0)
    }

    if (rect.top <= offset && rect.bottom > offset) {
      return callback(i)
    }

    if (i === l - 1 && rect.bottom <= offset) {
      return callback(i)
    }
  }
}

export function getAspectFillSize(
  origWidth: number,
  origHeight: number,
  containerWidth: number,
  containerHeight: number,
) {
  let width = 0
  let height = 0

  if (origWidth > 0 && origHeight > 0) {
    if (origWidth / origHeight > containerWidth / containerHeight) {
      height = containerHeight
      width = (origWidth / origHeight) * containerHeight
    } else {
      width = containerWidth
      height = (origHeight / origWidth) * containerWidth
    }
  }

  return [width, height] as [number, number]
}

export function getAspectFitSize(
  origWidth: number,
  origHeight: number,
  containerWidth: number,
  containerHeight: number,
) {
  let width = 0
  let height = 0

  if (origWidth > 0 && origHeight > 0) {
    if (origWidth / origHeight > containerWidth / containerHeight) {
      width = containerWidth
      height = (origHeight / origWidth) * containerWidth
    } else {
      height = containerHeight
      width = (origWidth / origHeight) * containerHeight
    }
  }

  return [width, height] as [number, number]
}

interface Point {
  x: number
  y: number
}

export function getTwoPointsDistance(p1: Point, p2: Point) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
}
