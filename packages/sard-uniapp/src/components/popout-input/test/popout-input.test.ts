import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import PopoutInput from '../popout-input.vue'

describe('PopoutInput', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(
        PopoutInput,
        {
          title: '标题',
          modelValue: '123456',
        },
        () => h('div', { class: 'content' }, '内容'),
      ),
    )

    expect(wrapper.find('.sar-popout-input').find('input').element.value).toBe(
      '123456',
    )
    expect(wrapper.find('.sar-input.sar-input_inlaid').exists()).toBeTruthy()
    expect(wrapper.find('.sar-popout-input__arrow').exists()).toBeTruthy()
    expect(wrapper.find('.sar-popout-input__seal').exists()).toBeTruthy()

    await wrapper.find('.sar-input__clear').trigger('click')
    expect(wrapper.find('.sar-popout-input').find('input').element.value).toBe(
      '',
    )
  })
})
