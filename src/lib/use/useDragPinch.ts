import { getTwoPointsDistance } from '../utils'
import { useInitialVelocity } from './useInitialVelocity'
import { useMouseDown } from './useMouseDown'

interface Point {
  x: number
  y: number
}

function getPoint(touch: Touch): Point {
  return {
    x: touch.clientX,
    y: touch.clientY,
  }
}

function getCenterPoint(touches: TouchList) {
  const points = Array.from(touches).map(getPoint)

  const firstPoint = points[0]

  if (points.length === 0) {
    return firstPoint
  }

  return points.slice(1).reduce((centerPoint, point) => {
    return {
      x: (point.x - centerPoint.x) / 2 + centerPoint.x,
      y: (point.y - centerPoint.y) / 2 + centerPoint.y,
    }
  }, firstPoint)
}

function getScalePoints(touches: TouchList) {
  const points = Array.from(touches).map(getPoint)

  if (points.length < 2) {
    return null
  } else if (points.length === 2) {
    return points
  }

  const centerPoint = points.slice(1, -1).reduce((centerPoint, point) => {
    return {
      x: (point.x - centerPoint.x) / 2 + centerPoint.x,
      y: (point.y - centerPoint.y) / 2 + centerPoint.y,
    }
  }, points[0])

  return [centerPoint, points[points.length - 1]]
}

export interface UseTouchOptions {
  onOffset?: (offsetX: number, offsetY: number) => void
  onScale?: (originX: number, originY: number, scale: number) => void
  onCapture?: () => void
  onRelease?: (v: { x: number; y: number }) => void
}

export function useDragPinch(options: UseTouchOptions) {
  const { onOffset, onScale, onCapture, onRelease } = options

  const initVelocity = useInitialVelocity()

  let prevCenter = {
    x: 0,
    y: 0,
  }

  let prevScalePoints: Point[] | null = null

  const onTouchStart = (event: TouchEvent) => {
    if (event.touches.length === 1) {
      initVelocity.onStart(getPoint(event.touches[0]))
    }

    prevCenter = getCenterPoint(event.touches)
    prevScalePoints = getScalePoints(event.touches)

    onCapture?.()
  }

  const onTouchMove = (event: TouchEvent) => {
    const currCenterPoint = getCenterPoint(event.touches)

    const offsetX = currCenterPoint.x - prevCenter.x
    const offsetY = currCenterPoint.y - prevCenter.y
    prevCenter = currCenterPoint
    onOffset?.(offsetX, offsetY)

    const currScalePoints = getScalePoints(event.touches)
    if (prevScalePoints && currScalePoints) {
      const prevDistance = getTwoPointsDistance(
        ...(prevScalePoints as [Point, Point]),
      )
      const currDistance = getTwoPointsDistance(
        ...(currScalePoints as [Point, Point]),
      )
      const scale = (currDistance - prevDistance) / prevDistance
      onScale?.(currCenterPoint.x, currCenterPoint.y, scale)
    }
    prevScalePoints = currScalePoints

    if (event.touches.length === 1) {
      initVelocity.onMove(getPoint(event.touches[0]))
    }
  }

  const onTouchEnd = (event: TouchEvent) => {
    prevCenter = getCenterPoint(event.touches)
    prevScalePoints = getScalePoints(event.touches)

    if (event.touches.length === 0) {
      const velocity = initVelocity.onEnd()

      onRelease?.(velocity)
    }
  }

  const onMouseDown = useMouseDown(onTouchStart, onTouchMove, onTouchEnd)

  return {
    onMouseDown,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}
