import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import DatetimeRangePicker from '../datetime-range-picker.vue'

describe('DatetimeRangePicker', () => {
  test('create', async () => {
    const wrapper = mount(
      h(DatetimeRangePicker, {
        type: 'yMd',
        modelValue: [new Date(2024, 0, 25), new Date(2024, 0, 25)],
        min: new Date(2024, 0, 25),
        max: new Date(2024, 0, 25),
      }),
    )

    expect(
      wrapper
        .findAll('.sar-picker__item')
        .map((el) => el.text())
        .join(''),
    ).toBe('2024年01月25日2024年01月25日')
  })

  test('type', async () => {
    const wrapper = mount(
      h(DatetimeRangePicker, {
        type: 'hms',
        modelValue: [
          new Date(2024, 0, 25, 9, 30, 24),
          new Date(2024, 0, 25, 9, 30, 24),
        ],
        min: new Date(2024, 0, 25, 9, 30, 24),
        max: new Date(2024, 0, 25, 9, 30, 24),
      }),
    )

    expect(
      wrapper
        .findAll('.sar-picker__item')
        .map((el) => el.text())
        .join(''),
    ).toBe('09时30分24秒09时30分24秒')

    const wrapper2 = mount(
      h(DatetimeRangePicker, {
        type: 'Mdh',
        modelValue: [new Date(2024, 0, 25, 9), new Date(2024, 0, 25, 9)],
        min: new Date(2024, 0, 25, 9),
        max: new Date(2024, 0, 25, 9),
      }),
    )

    expect(
      wrapper2
        .findAll('.sar-picker__item')
        .map((el) => el.text())
        .join(''),
    ).toBe('01月25日09时01月25日09时')
  })

  test('filter', async () => {
    const wrapper = mount(
      h(DatetimeRangePicker, {
        modelValue: [new Date(2024, 0, 25), new Date(2024, 0, 25)],
        min: new Date(2024, 0, 25),
        max: new Date(2024, 0, 26),
        filter: (letter, value: number) => {
          if (letter === 'd') {
            return value % 2 === 0
          }
          return true
        },
      }),
    )

    expect(
      wrapper
        .findAll('.sar-picker__item')
        .map((el) => el.text())
        .join(''),
    ).toBe('2024年01月26日2024年01月26日')
  })

  test('formatter', async () => {
    const wrapper = mount(
      h(DatetimeRangePicker, {
        modelValue: [new Date(2024, 0, 25), new Date(2024, 0, 25)],
        min: new Date(2024, 0, 25),
        max: new Date(2024, 0, 25),
        formatter: (letter, option) => {
          if (letter === 'M') {
            return option.value + 'month'
          }
          if (letter === 'd') {
            return option.value + 'day'
          }
          if (letter === 'y') {
            return option.value + 'year'
          }
        },
      }),
    )

    expect(
      wrapper
        .findAll('.sar-picker__item')
        .map((el) => el.text())
        .join(''),
    ).toBe('2024year1month25day2024year1month25day')
  })
})
