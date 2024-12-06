import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Result from '../result.vue'

describe('Result', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(Result, {
        title: '成功',
        description: '请根据提示进行操作',
      }),
    )

    expect(wrapper.find('.sar-result__title').text()).toBe('成功')
    expect(wrapper.find('.sar-result__description').text()).toBe(
      '请根据提示进行操作',
    )

    const statusList = ['success', 'info', 'warning', 'error', 'question']
    for (const status of statusList) {
      await wrapper.setProps({
        status,
      })

      expect(
        wrapper.find(`.sar-result__icon.sar-result__icon_${status}`).exists(),
      ).toBeTruthy()
    }
  })

  test('extra', async () => {
    const wrapper = mount(
      h(
        Result,
        {
          title: '成功',
          description: '请根据提示进行操作',
        },
        () => h('div', { class: 'content' }, '内容'),
      ),
    )

    expect(wrapper.find('.sar-result__extra .content').text()).toBe('内容')
  })

  test('icon', async () => {
    const wrapper = mount(
      h(
        Result,
        {
          title: '成功',
          description: '请根据提示进行操作',
          icon: 'emoji-smile',
          iconFamily: 'demo-icons',
          iconColor: 'red',
        },
        () => h('div', { class: 'content' }, '内容'),
      ),
    )

    expect(
      wrapper.find('.sar-icon.demo-icons.demo-icons-emoji-smile').attributes()
        .style,
    ).includes('color: red;')
  })
})
