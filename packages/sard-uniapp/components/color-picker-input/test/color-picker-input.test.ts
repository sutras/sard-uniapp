import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import ColorPickerInput from '../color-picker-input.vue'

describe('ColorPickerInput', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(ColorPickerInput, {
        title: '请选择颜色',
        placeholder: '请选择颜色',
        modelValue: '#ff0000',
      }),
    )

    expect(wrapper.find('.sar-input').find('input').element.value).toBe(
      '#ff0000',
    )
    expect(wrapper.find('.sar-color-picker').exists()).toBe(false)

    await wrapper.setProps({
      visible: true,
    })

    expect(wrapper.find('.sar-color-picker').exists()).toBe(true)
  })
})
