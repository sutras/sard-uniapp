import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import DatetimeRangePickerInput from '../datetime-range-picker-input.vue'

describe('DatetimeRangePickerInput', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(DatetimeRangePickerInput, {
        modelValue: [new Date(2024, 0, 25), new Date(2024, 0, 25)],
      }),
    )

    expect(wrapper.find('.sar-input').find('input').element.value).toBe(
      '2024-01-25 至 2024-01-25',
    )
    expect(wrapper.find('.sar-picker').exists()).toBe(false)

    await wrapper.setProps({
      visible: true,
    })
    expect(wrapper.find('.sar-picker').exists()).toBe(true)

    await wrapper.setProps({
      modelValue: [new Date(2024, 1, 26), new Date(2024, 1, 26)],
    })
    expect(wrapper.find('.sar-input').find('input').element.value).toBe(
      '2024-02-26 至 2024-02-26',
    )

    await wrapper.setProps({
      modelValue: undefined,
    })
    expect(wrapper.find('.sar-input').find('input').element.value).toBe('')
  })
})
