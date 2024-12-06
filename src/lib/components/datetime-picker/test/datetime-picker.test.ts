import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import DatetimePicker from '../datetime-picker.vue'

describe('DatetimePicker', () => {
  test('create', async () => {
    const wrapper = mount(
      h(DatetimePicker, {
        type: 'yMd',
        modelValue: new Date(2024, 0, 25),
        min: new Date(2024, 0, 25),
        max: new Date(2024, 0, 25),
      }),
    )

    expect(
      wrapper
        .findAll('.sar-picker__item')
        .map((el) => el.text())
        .join(''),
    ).toBe('2024年01月25日')
  })

  test('type', async () => {
    const wrapper = mount(
      h(DatetimePicker, {
        type: 'hms',
        modelValue: new Date(2024, 0, 25, 9, 30, 24),
        min: new Date(2024, 0, 25, 9, 30, 24),
        max: new Date(2024, 0, 25, 9, 30, 24),
      }),
    )

    expect(
      wrapper
        .findAll('.sar-picker__item')
        .map((el) => el.text())
        .join(''),
    ).toBe('09时30分24秒')

    const wrapper2 = mount(
      h(DatetimePicker, {
        type: 'Mdh',
        modelValue: new Date(2024, 0, 25, 9),
        min: new Date(2024, 0, 25, 9),
        max: new Date(2024, 0, 25, 9),
      }),
    )

    expect(
      wrapper2
        .findAll('.sar-picker__item')
        .map((el) => el.text())
        .join(''),
    ).toBe('01月25日09时')
  })

  test('filter', async () => {
    const wrapper = mount(
      h(DatetimePicker, {
        modelValue: new Date(2024, 0, 25),
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
    ).toBe('2024年01月26日')
  })

  test('formatter', async () => {
    const wrapper = mount(
      h(DatetimePicker, {
        modelValue: new Date(2024, 0, 25),
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
    ).toBe('2024year1month25day')
  })
})
