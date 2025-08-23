export type ScrollIntoViewPosition = 'start' | 'center' | 'end' | 'nearest'

export interface ScrollIntoViewOptions {
  position?: ScrollIntoViewPosition
  startOffset?: number
  endOffset?: number
  duration?: number
}

/**
 * 根据最后位置计算 page 滚动到顶部的值。
 *
 * 也可计算水平方向的滚动值。
 *
 *                      page
 *                     ╱
 *    ╭───────────────╮    viewport
 *  ╭─│─ ─ ─ ─ ─ ─ ─ ─│─╮ ╱
 *  │ │ ╭───────────╮ │ │
 *  │ │ │  element  │ │ │
 *  │ │ ╰───────────╯ │ │
 *  ╰─│─ ─ ─ ─ ─ ─ ─ ─│─╯
 *    │               │
 *    │               │
 *    ╰───────────────╯
 *
 * @param {number} viewportHeight viewport 高度
 * @param {number} viewportScrollTop viewport 垂直滚动值
 * @param {number} elementHeight element 高度
 * @param {number} elementOffsetTop element 距离页面顶部距离
 * @param {string} options.position element 在 viewport 中的位置，可选：'start' | 'center' | 'end' | 'nearest'
 * @param {number} options.startOffset element 距离视窗顶部的偏移量
 * @param {number} options.endOffset element 距离视窗底部的偏移量
 * @return {number} viewport 新的垂直滚动值
 */
export function getScrollIntoViewValue(
  viewportHeight: number,
  viewportScrollTop: number,
  elementHeight: number,
  elementOffsetTop: number,
  options: ScrollIntoViewOptions = {},
): number {
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

export interface MatchScrollVisibleOptions {
  offset?: number
  errorValue?: number
}

/**
 * 匹配元素列表中第一个位于滚动盒子可视区域的元素
 *
 * @param {array} rects NodeRect 类型数组
 * @param {function} callback 匹配成功时调用，会接收匹配的元素的下标
 * @param {number} options.offset 偏移量
 * @param {number} options.errorValue 容错值
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

/**
 * 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
 */
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

/**
 * 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
 */
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

export interface Point {
  x: number
  y: number
}

/**
 * 获取两点间的距离
 */
export function getTwoPointsDistance(p1: Point, p2: Point) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
}

interface Rect {
  x: number
  y: number
  width: number
  height: number
}
/**
 * @description: 根据原始坐标尺寸和缩放后的坐标尺寸算出转换的原点
 * @param {Rect} rect
 * @param {Rect} scaleRect
 * @return {[number, number]}
 */
export function getTransformOrigin(
  rect: Rect,
  scaleRect: Rect,
): [number, number] {
  const ratio = scaleRect.width / rect.width
  const originX =
    (rect.x + rect.width / 2 - scaleRect.x - scaleRect.width / 2) /
      (ratio - 1) +
    rect.width / 2
  const originY =
    (rect.y + rect.height / 2 - scaleRect.y - scaleRect.height / 2) /
      (ratio - 1) +
    rect.height / 2
  return [originX, originY]
}

/**
 * 获取一个矩形以中心点为原点旋转一定角度后的矩形
 */
export function getRotatedRect(width: number, height: number, rotate: number) {
  function normalizeAngle0To180(angle: number) {
    let normalized = ((angle % 360) + 360) % 360

    if (normalized > 180) {
      normalized -= 180
    }

    return normalized
  }

  rotate = normalizeAngle0To180(rotate)

  const radian = (rotate * Math.PI) / 180
  const sin = Math.abs(Math.sin(radian))
  const cos = Math.abs(Math.cos(radian))
  const w1 = sin * height
  const w2 = cos * width
  const h1 = cos * height
  const h2 = sin * width

  return {
    w1: rotate >= 90 ? w2 : w1,
    w2: rotate >= 90 ? w1 : w2,
    h1: rotate >= 90 ? h2 : h1,
    h2: rotate >= 90 ? h1 : h2,
    width: w1 + w2,
    height: h1 + h2,
  }
}
