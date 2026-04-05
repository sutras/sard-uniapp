import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'

import DateStrip from '../date-strip.vue'
import type { CalendarDay } from '../../calendar'
import * as domUtils from '../../../utils/dom'

const flush = async () => {
  await nextTick()
  vi.runAllTimers()
  await Promise.resolve()
}

const getDayNumbers = (wrapper: ReturnType<typeof mount>) => {
  return wrapper
    .findAll('.sar-date-strip__item')
    .filter((item) => !item.classes().includes('sar-date-strip__item_disabled'))
    .map((item) => item.find('.sar-date-strip__item-day').text())
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.spyOn(domUtils, 'getBoundingClientRect').mockResolvedValue({
    left: 0,
    top: 0,
    width: 100,
    height: 40,
  } as Awaited<ReturnType<typeof domUtils.getBoundingClientRect>>)
})

afterEach(() => {
  vi.runOnlyPendingTimers()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('DateStrip', () => {
  test('create', async () => {
    const wrapper = mount(
      h(DateStrip, {
        min: new Date(2024, 0, 1),
        max: new Date(2024, 0, 5),
        modelValue: new Date(2024, 0, 3),
      }),
    )

    await flush()

    expect(wrapper.find('.sar-date-strip').exists()).toBe(true)
    expect(wrapper.find('.sar-date-strip__item_selected').exists()).toBe(true)
    expect(wrapper.find('.sar-date-strip__item-day').text()).toBe('01-01')
  })

  test('multiple', async () => {
    const wrapper = mount(
      h(DateStrip, {
        min: new Date(2024, 0, 1),
        max: new Date(2024, 0, 5),
        type: 'multiple',
        modelValue: [new Date(2024, 0, 1), new Date(2024, 0, 4)],
      }),
    )

    await flush()

    expect(wrapper.findAll('.sar-date-strip__item_selected')).toHaveLength(2)
  })

  test('range', async () => {
    const wrapper = mount(
      h(DateStrip, {
        min: new Date(2024, 0, 1),
        max: new Date(2024, 0, 7),
        type: 'range',
        modelValue: [new Date(2024, 0, 2), new Date(2024, 0, 5)],
      }),
    )

    await flush()

    expect(wrapper.findAll('.sar-date-strip__item_start')).toHaveLength(1)
    expect(wrapper.findAll('.sar-date-strip__item_middle')).toHaveLength(2)
    expect(wrapper.findAll('.sar-date-strip__item_end')).toHaveLength(1)
  })

  test('disabled', async () => {
    const wrapper = mount(
      h(DateStrip, {
        min: new Date(2024, 0, 1),
        max: new Date(2024, 0, 5),
        disabledDate(date: Date) {
          return ![2, 4].includes(date.getDate())
        },
      }),
    )

    await flush()

    expect(getDayNumbers(wrapper)).toEqual(['01-02', '01-04'])
  })

  test('maxDays', async () => {
    const overMaxDays = vi.fn()
    const wrapper = mount(
      h(DateStrip, {
        min: new Date(2024, 0, 1),
        max: new Date(2024, 0, 5),
        type: 'multiple',
        maxDays: 2,
        overMaxDays,
      }),
    )

    await flush()

    const items = wrapper.findAll('.sar-date-strip__item')

    await items[0].trigger('click')
    await items[1].trigger('click')
    await items[2].trigger('click')
    await flush()

    expect(wrapper.findAll('.sar-date-strip__item_selected')).toHaveLength(2)
    expect(overMaxDays).toHaveBeenCalledTimes(1)
  })

  test('formatter', async () => {
    const formatter = (day: CalendarDay) => {
      if (day.date.getDate() === 2) {
        day.bottom = '自定义'
        day.className = 'custom-day'
      }
    }

    const wrapper = mount(
      h(DateStrip, {
        min: new Date(2024, 0, 1),
        max: new Date(2024, 0, 3),
        formatter,
      }),
    )

    await flush()

    expect(wrapper.find('.custom-day').exists()).toBe(true)
    expect(wrapper.find('.custom-day .sar-date-strip__item-info').text()).toBe(
      '自定义',
    )
  })

  test('showLunar', async () => {
    const wrapper = mount(
      h(DateStrip, {
        min: new Date(2024, 1, 10),
        max: new Date(2024, 1, 10),
        showLunar: true,
      }),
    )

    await flush()

    expect(wrapper.find('.sar-date-strip__item-info').text()).toBe('正月')
  })
})
