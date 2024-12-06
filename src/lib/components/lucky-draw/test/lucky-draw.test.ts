import { describe, expect, test } from 'vitest'
import { effectScope } from 'vue'

import {
  type UseLuckyGridOptions,
  type UseLuckyGridReturn,
  useLuckyGrid,
} from '../../../use/useLuckyGrid'
import {
  type UseLuckyWheelOptions,
  type UseLuckyWheelReturn,
  useLuckyWheel,
} from '../../../use/useLuckyWheel'
import {
  type UseSlotMachineOptions,
  type UseSlotMachineReturn,
  useSlotMachine,
} from '../../../use/useSlotMachine'

function testLuckyGrid(index: number, options?: UseLuckyGridOptions) {
  return new Promise<[number, UseLuckyGridReturn]>((resolve) => {
    const scope = effectScope()
    scope.run(() => {
      const ret = useLuckyGrid({
        accelTime: 150,
        decelTime: 150,
        endDelay: 0,
        complete: (index) => {
          resolve([index, ret])
          scope.stop()
        },
        ...options,
      })
      ret.play()
      ret.stop(index)
    })
  })
}

function testLuckyWheel(index: number, options?: UseLuckyWheelOptions) {
  return new Promise<[number, UseLuckyWheelReturn]>((resolve) => {
    const scope = effectScope()
    scope.run(() => {
      const ret = useLuckyWheel({
        accelTime: 150,
        decelTime: 150,
        endDelay: 0,
        complete: (index) => {
          resolve([index, ret])
          scope.stop()
        },
        ...options,
      })
      ret.play()
      ret.stop(index)
    })
  })
}

function testSlotMachine(index: number[], options?: UseSlotMachineOptions) {
  return new Promise<[number[], UseSlotMachineReturn]>((resolve) => {
    const scope = effectScope()
    scope.run(() => {
      const ret = useSlotMachine({
        columns: [8, 8, 8],
        accelTime: 150,
        decelTime: 150,
        staggerDelay: 50,
        endDelay: 0,
        complete: (index) => {
          resolve([index, ret])
          scope.stop()
        },
        ...options,
      })
      ret.play()
      ret.stop(index)
    })
  })
}

describe('LuckyDraw', () => {
  test('useLuckyGrid - base', async () => {
    expect((await testLuckyGrid(4))[0]).toBe(4)
    expect((await testLuckyGrid(6))[0]).toBe(6)
    expect((await testLuckyGrid(0))[0]).toBe(0)
  }, 10000)

  test('useLuckyGrid - grids & centerSize', async () => {
    let ret = (await testLuckyGrid(4))[1]
    expect(ret.grids.value).toEqual([0, 1, 2, 7, -1, 3, 6, 5, 4])
    expect(ret.centerSize.value).toEqual({ row: 1, column: 1 })

    ret = (
      await testLuckyGrid(4, {
        row: 4,
        column: 5,
      })
    )[1]
    expect(ret.grids.value).toEqual([
      0, 1, 2, 3, 4, 13, -1, -2, -3, 5, 12, -4, -5, -6, 6, 11, 10, 9, 8, 7,
    ])
    expect(ret.centerSize.value).toEqual({ row: 2, column: 3 })
  }, 10000)

  test('useLuckyWheel - base', async () => {
    expect((await testLuckyWheel(4))[0]).toBe(4)
    expect((await testLuckyWheel(6))[0]).toBe(6)
    expect((await testLuckyWheel(0))[0]).toBe(0)
  }, 10000)

  test('useLuckyWheel - degrees & sectorDegrees', async () => {
    const ret = (await testLuckyWheel(4))[1]
    expect(ret.sectorDegrees.value).toEqual(360 / 8)
    expect(ret.degrees.value % 360).toEqual((4 / 8) * 360)
  }, 10000)

  test('useSlotMachine - base', async () => {
    expect((await testSlotMachine([1, 3, 7]))[0]).toEqual([1, 3, 7])
    expect((await testSlotMachine([2, 7, 2]))[0]).toEqual([2, 7, 2])
    expect((await testSlotMachine([6, 3, 5]))[0]).toEqual([6, 3, 5])
  }, 10000)

  test('useSlotMachine - offset', async () => {
    const ret = (await testSlotMachine([7, 0, 3]))[1]
    expect(ret.offset.value).toEqual([700, 0, 300])
  }, 10000)
})
