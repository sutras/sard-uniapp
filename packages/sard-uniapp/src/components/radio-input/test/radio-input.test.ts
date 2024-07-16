import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import RadioInput from '../radio-input.vue'

const options = Array(10)
  .fill(0)
  .map((_, i) => {
    return {
      value: `option${i + 1}`,
      label: `选项${i + 1}`,
    }
  })

describe('RadioInput', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(RadioInput, {
        options,
        modelValue: 'option3',
      }),
    )

    expect(wrapper.find('.sar-input').find('input').element.value).toBe('选项3')
    expect(wrapper.find('.sar-radio-group').exists()).toBe(false)

    await wrapper.setProps({
      visible: true,
    })
    expect(wrapper.find('.sar-radio-group').exists()).toBe(true)

    await wrapper.setProps({
      modelValue: 'option6',
    })
    expect(wrapper.find('.sar-input').find('input').element.value).toBe('选项6')

    await wrapper.setProps({
      modelValue: undefined,
    })
    expect(wrapper.find('.sar-input').find('input').element.value).toBe('')
  })
})
