import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import NotifyAgent from '../../notify-agent/notify-agent.vue'
import { notify } from '../../notify-agent/index'

describe('Notify', () => {
  test('basic', async () => {
    const wrapper = mount(h(NotifyAgent, {}))

    notify('这是一条通知')
    await Promise.resolve()
    expect(wrapper.find('.sar-notify').text()).toBe('这是一条通知')

    notify.success('这是一条成功通知')
    await Promise.resolve()
    expect(wrapper.find('.sar-notify.sar-notify_success').text()).toBe(
      '这是一条成功通知',
    )

    notify.warning('这是一条警告通知')
    await Promise.resolve()
    expect(wrapper.find('.sar-notify.sar-notify_warning').text()).toBe(
      '这是一条警告通知',
    )

    notify.error('这是一条错误通知')
    await Promise.resolve()
    expect(wrapper.find('.sar-notify.sar-notify_error').text()).toBe(
      '这是一条错误通知',
    )
  })

  test('color', async () => {
    const wrapper = mount(h(NotifyAgent, {}))

    notify('这是一条通知', {
      background: 'red',
    })
    await Promise.resolve()
    expect(wrapper.find('.sar-notify').attributes().style).includes(
      'background-color: red;',
    )
  })

  test('position', async () => {
    const wrapper = mount(h(NotifyAgent, {}))

    notify('这是一条通知', {
      position: 'bottom',
    })
    await Promise.resolve()
    expect(wrapper.find('.sar-notify.sar-notify_bottom').exists()).toBeTruthy()
  })
})
