import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import CalendarInput from '../calendar-input.vue'

describe('CalendarInput', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(CalendarInput, {
        title: '请选择',
        placeholder: '请选择日期',
        modelValue: new Date(2000, 0, 15),
      }),
    )

    expect(wrapper.find('.sar-input').find('input').element.value).toBe(
      '2000-01-15',
    )
    expect(wrapper.find('.sar-calendar').exists()).toBe(false)

    await wrapper.setProps({
      visible: true,
    })
    expect(wrapper.find('.sar-calendar').exists()).toBe(true)

    await wrapper.setProps({
      modelValue: new Date(2010, 6, 12),
    })
    expect(wrapper.find('.sar-input').find('input').element.value).toBe(
      '2010-07-12',
    )

    await wrapper.setProps({
      modelValue: undefined,
    })
    expect(wrapper.find('.sar-input').find('input').element.value).toBe('')
  })

  test('range', async () => {
    const wrapper = mount(
      h(CalendarInput, {
        title: '请选择',
        placeholder: '请选择日期',
        type: 'range',
        modelValue: [new Date(2000, 0, 15), new Date(2000, 3, 12)],
      }),
    )

    expect(wrapper.find('.sar-input').find('input').element.value).toBe(
      '2000-01-15 至 2000-04-12',
    )
  })

  test('multiple', async () => {
    const wrapper = mount(
      h(CalendarInput, {
        title: '请选择',
        placeholder: '请选择日期',
        type: 'multiple',
        modelValue: [
          new Date(2000, 0, 15),
          new Date(2000, 0, 16),
          new Date(2000, 0, 21),
        ],
      }),
    )

    expect(wrapper.find('.sar-input').find('input').element.value).toBe(
      '选择了3个日期',
    )
  })
})
