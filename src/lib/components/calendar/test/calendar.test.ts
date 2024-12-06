import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Calendar from '../calendar.vue'
import { type CalendarDay } from '../common'

describe('Calendar', () => {
  test('create', async () => {
    const now = new Date()

    const wrapper = mount(
      h(Calendar, {
        modelValue: new Date(now.getFullYear(), 0, 1),
      }),
    )

    expect(wrapper.find('.sar-calendar').exists()).toBe(true)
    let selected = wrapper.find('.sar-calendar__day_selected')
    expect(selected.exists()).toBe(true)
    expect(selected.text()).toBe('1')

    await wrapper.setProps({ modelValue: undefined })
    selected = wrapper.find('.sar-calendar__day_selected')
    expect(selected.exists()).toBe(false)

    await wrapper.setProps({
      modelValue: new Date(now.getFullYear(), 0, 15),
    })
    selected = wrapper.find('.sar-calendar__day_selected')
    expect(selected.exists()).toBe(true)
    expect(selected.text()).toBe('15')
  })

  test('multiple', async () => {
    const now = new Date()

    const wrapper = mount(
      h(Calendar, {
        modelValue: [
          new Date(now.getFullYear(), 0, 1),
          new Date(now.getFullYear(), 0, 3),
          new Date(now.getFullYear(), 0, 9),
        ],
        type: 'multiple',
      }),
    )

    expect(
      wrapper.findAll('.sar-calendar__day_selected').map((item) => item.text()),
    ).toEqual(['1', '3', '9'])
  })

  test('range', async () => {
    const now = new Date()

    const wrapper = mount(
      h(Calendar, {
        modelValue: [
          new Date(now.getFullYear(), 0, 4),
          new Date(now.getFullYear(), 0, 11),
        ],
        type: 'range',
      }),
    )

    expect(
      wrapper
        .findAll(
          '.sar-calendar__day_start, .sar-calendar__day_middle, .sar-calendar__day_end',
        )
        .map((item) => item.text().replace(/[\D]/g, '')),
    ).toEqual(['4', '5', '6', '7', '8', '9', '10', '11'])
  })

  test('minMax', async () => {
    const now = new Date()

    const wrapper = mount(
      h(Calendar, {
        min: new Date(now.getFullYear(), 0, 12),
        max: new Date(now.getFullYear(), 0, 16),
      }),
    )

    expect(
      wrapper
        .findAll('.sar-calendar__day')
        .filter(
          (item) => !item.classes().includes('sar-calendar__day_disabled'),
        )
        .map((item) => item.text()),
    ).toEqual(['12', '13', '14', '15', '16'])
  })

  test('disabled', async () => {
    const validDay = [2, 12, 22]
    const disabledDate = (date: Date) => {
      return !validDay.includes(date.getDate())
    }

    const wrapper = mount(
      h(Calendar, {
        disabledDate,
      }),
    )

    expect(
      wrapper
        .findAll('.sar-calendar__day')
        .filter(
          (item) => !item.classes().includes('sar-calendar__day_disabled'),
        )
        .map((item) => Number(item.text())),
    ).toEqual(validDay)
  })

  test('weekStartsOn', async () => {
    const wrapper = mount(
      h(Calendar, {
        weekStartsOn: 2,
      }),
    )

    expect(wrapper.find('.sar-calendar__week-item').text()).toBe('二')
  })

  test('formatter', async () => {
    const formatter = (day: CalendarDay) => {
      if (day.date.getDate() === 13) {
        day.bottom = '十三'
      }
      if (day.date.getDate() === 23) {
        day.top = '二十三'
      }
    }

    const wrapper = mount(
      h(Calendar, {
        formatter,
      }),
    )

    expect(wrapper.find('.sar-calendar__bottom').text()).toBe('十三')
    expect(wrapper.find('.sar-calendar__top').text()).toBe('二十三')
  })

  test('severalMonths', async () => {
    const wrapper = mount(
      h(Calendar, {
        min: new Date(2000, 0, 1),
        max: new Date(2000, 2, 15),
        severalMonths: true,
      }),
    )

    expect(wrapper.findAll('.sar-calendar__month').length).toBe(3)
  })
})
