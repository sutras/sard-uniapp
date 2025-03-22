interface TouchInfo {
  x: number
  y: number
  historyX: number[]
  historyY: number[]
  historyTime: number[]
}

interface Point {
  x: number
  y: number
}

export function useInitialVelocity() {
  const touchInfo: TouchInfo = {
    x: 0,
    y: 0,
    historyX: [],
    historyY: [],
    historyTime: [],
  }

  function findDelta(point: Point) {
    return {
      x: point.x - touchInfo.x,
      y: point.y - touchInfo.y,
    }
  }

  function onStart(point: Point) {
    touchInfo.x = point.x
    touchInfo.y = point.y
    touchInfo.historyX = [0]
    touchInfo.historyY = [0]
    touchInfo.historyTime = [Date.now()]
  }

  function onMove(point: Point) {
    const delta = findDelta(point)

    touchInfo.historyX.push(delta.x)
    touchInfo.historyY.push(delta.y)
    touchInfo.historyTime.push(Date.now())

    while (touchInfo.historyTime.length > 10) {
      touchInfo.historyTime.shift()
      touchInfo.historyX.shift()
      touchInfo.historyY.shift()
    }
  }

  function onEnd() {
    const velocity = {
      x: 0,
      y: 0,
    }

    const length = touchInfo.historyTime.length

    if (length > 2) {
      let i = length - 1
      const time1 = touchInfo.historyTime[i]
      const x = touchInfo.historyX[i]
      const y = touchInfo.historyY[i]

      while (i > 0) {
        i--
        const time0 = touchInfo.historyTime[i]
        const time = time1 - time0
        if (time > 30 && time < 50) {
          velocity.x = (x - touchInfo.historyX[i]) / time
          velocity.y = (y - touchInfo.historyY[i]) / time
          break
        }
      }
    }

    touchInfo.historyTime = []
    touchInfo.historyX = []
    touchInfo.historyY = []

    return velocity
  }

  return {
    onStart,
    onMove,
    onEnd,
  }
}
