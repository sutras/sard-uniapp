import { minmax } from '../../utils'

export type Position =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'

export interface Rect {
  width: number
  height: number
  top: number
  right: number
  bottom: number
  left: number
}

export type Direction = 'top' | 'right' | 'bottom' | 'left'

export type Side = 'start' | 'center' | 'end'

export type Axis = 'top' | 'left'

const directions = ['top', 'right', 'bottom', 'left'] as const

function getReverseDirection(direction: Direction) {
  const index = directions.indexOf(direction)
  return directions[index + 2] ?? directions[index - 2]
}

function getAxis(direction: Direction) {
  return ['top', 'bottom'].includes(direction) ? 'left' : 'top'
}

function getCrossAxis(axis: Axis) {
  return axis === 'top' ? 'left' : 'top'
}

function getSizeNameByAxis(axis: Axis) {
  return axis === 'top' ? 'height' : 'width'
}

function getArrowCrossOffset(direction: Direction, rect: Rect) {
  const strategies = {
    top() {
      return rect.height
    },
    right() {
      return 0
    },
    bottom() {
      return 0
    },
    left() {
      return rect.width
    },
  }
  return strategies[direction]()
}

export function getPopoverPosition(
  refRect: Rect,
  popperRect: Rect,
  {
    refGap,
    position,
    viewportGap,
    arrowSize,
  }: {
    position: Position
    refGap: number
    viewportGap: number
    arrowSize: number
  },
) {
  const breadth = popperRect.width + refGap
  const thickness = popperRect.height + refGap

  const systemInfo = uni.getSystemInfoSync()
  const windowWidth = systemInfo.windowWidth
  const windowHeight = systemInfo.windowHeight

  const gapBoundaries = {
    top: refRect.top - thickness - viewportGap,
    right: windowWidth - refRect.right - breadth - viewportGap,
    bottom: windowHeight - refRect.bottom - thickness - viewportGap,
    left: refRect.left - breadth - viewportGap,
  }

  // 确定方位
  let [direction, side] = position.split('-') as [Direction, Side]

  // 适当反转
  if (gapBoundaries[direction] < 0) {
    direction = getReverseDirection(direction)
    if (gapBoundaries[direction] < 0) {
      direction = getReverseDirection(direction)
    }
  }

  // 确定端点
  side = side || 'center'

  // 确定轴
  const axis = getAxis(direction)
  const crossAxis = getCrossAxis(axis)

  // 确定尺寸
  const axisSizeName = getSizeNameByAxis(axis)
  const crossAxisSizeName = getSizeNameByAxis(crossAxis)

  const axisWindowSize = axis === 'top' ? windowHeight : windowWidth
  const crossAxisWindowSize = axis === 'top' ? windowWidth : windowHeight

  const popperStyle = {
    top: 0,
    left: 0,
  }

  function getSideOffset() {
    const strategies = {
      start() {
        return refRect[axis]
      },
      center() {
        return (
          refRect[axis] - (popperRect[axisSizeName] - refRect[axisSizeName]) / 2
        )
      },
      end() {
        return (
          refRect[axis] - (popperRect[axisSizeName] - refRect[axisSizeName])
        )
      },
    }
    const offset = strategies[side]()

    // 确保处于屏幕内
    return minmax(
      offset,
      viewportGap,
      axisWindowSize - popperRect[axisSizeName] - viewportGap,
    )
  }

  function getDirectionOffset() {
    const strategies = {
      top() {
        return refRect.top - refGap - popperRect.height
      },
      right() {
        return refRect.right + refGap
      },
      bottom() {
        return refRect.bottom + refGap
      },
      left() {
        return refRect.left - refGap - popperRect.width
      },
    }
    const offset = strategies[direction]()

    // 确保处于屏幕内
    return minmax(
      offset,
      viewportGap,
      crossAxisWindowSize - popperRect[crossAxisSizeName] - viewportGap,
    )
  }

  popperStyle[crossAxis] = getDirectionOffset()
  popperStyle[axis] = getSideOffset()

  const finalPopperRect = {
    top: popperStyle.top,
    left: popperStyle.left,
    bottom: popperStyle.top + popperRect.height,
    right: popperStyle.left + popperRect.width,
  }

  const arrowStyle: {
    top: number
    left: number
  } = {
    top: 0,
    left: 0,
  }

  function getArrowOffset() {
    const reverseDirection = getReverseDirection(axis)

    let extra = refRect[axis] - finalPopperRect[axis]
    if (extra < 0) {
      extra = 0
    }

    const intersection =
      Math.min(refRect[reverseDirection], finalPopperRect[reverseDirection]) -
      Math.max(refRect[axis], finalPopperRect[axis])

    const offset = extra + intersection / 2

    // 确保箭头位于popper之内
    return minmax(offset, arrowSize, popperRect[axisSizeName] - arrowSize)
  }

  arrowStyle[axis] = getArrowOffset()
  arrowStyle[crossAxis] = getArrowCrossOffset(direction, popperRect)

  return [popperStyle, arrowStyle] as const
}
