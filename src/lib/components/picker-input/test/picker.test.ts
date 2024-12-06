import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import PickerInput from '../picker-input.vue'

describe('PickerInput', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(PickerInput, {
        modelValue: 'female',
        columns: [
          {
            value: 'male',
            label: '男性',
          },
          {
            value: 'female',
            label: '女性',
          },
          {
            value: 'others',
            label: '其他',
          },
        ],
      }),
    )

    expect(wrapper.find('.sar-input').find('input').element.value).toBe('女性')
    expect(wrapper.find('.sar-picker').exists()).toBe(false)

    await wrapper.setProps({
      visible: true,
    })
    expect(wrapper.find('.sar-picker').exists()).toBe(true)

    await wrapper.setProps({
      modelValue: 'male',
    })
    expect(wrapper.find('.sar-input').find('input').element.value).toBe('男性')

    await wrapper.setProps({
      modelValue: undefined,
    })
    expect(wrapper.find('.sar-input').find('input').element.value).toBe('')
  })
})
