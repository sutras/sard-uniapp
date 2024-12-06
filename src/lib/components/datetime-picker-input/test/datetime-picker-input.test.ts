import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import DatetimePickerInput from '../datetime-picker-input.vue'

describe('DatetimePickerInput', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(DatetimePickerInput, {
        modelValue: new Date(2024, 0, 25),
      }),
    )

    expect(wrapper.find('.sar-input').find('input').element.value).toBe(
      '2024-01-25',
    )
    expect(wrapper.find('.sar-picker').exists()).toBe(false)

    await wrapper.setProps({
      visible: true,
    })
    expect(wrapper.find('.sar-picker').exists()).toBe(true)

    await wrapper.setProps({
      modelValue: new Date(2024, 1, 26),
    })
    expect(wrapper.find('.sar-input').find('input').element.value).toBe(
      '2024-02-26',
    )

    await wrapper.setProps({
      modelValue: undefined,
    })
    expect(wrapper.find('.sar-input').find('input').element.value).toBe('')
  })
})
