import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import ToastAgent from '../../toast-agent/toast-agent.vue'
import { toast } from '../../toast-agent/index'

describe('Toast', () => {
  test('basic', async () => {
    const wrapper = mount(h(ToastAgent, {}))

    toast('文本提示')
    await Promise.resolve()
    expect(wrapper.find('.sar-toast__title').text()).toBe('文本提示')

    toast.success('成功')
    await Promise.resolve()
    expect(
      wrapper.find('.sar-toast__icon .sar-icon.sari.sari-success').exists(),
    ).toBeTruthy()
    expect(wrapper.find('.sar-toast__title').text()).toBe('成功')

    toast.fail('失败')
    await Promise.resolve()
    expect(
      wrapper.find('.sar-toast__icon .sar-icon.sari.sari-fail').exists(),
    ).toBeTruthy()
    expect(wrapper.find('.sar-toast__title').text()).toBe('失败')

    toast.loading('加载中')
    await Promise.resolve()
    expect(wrapper.find('.sar-toast__icon .sar-loading').exists()).toBeTruthy()
    expect(wrapper.find('.sar-toast__title').text()).toBe('加载中')
  })

  test('position', async () => {
    const wrapper = mount(h(ToastAgent, {}))

    toast('顶部位置', {
      position: 'top',
    })
    await Promise.resolve()
    expect(wrapper.find('view').attributes().style).includes(
      'top: var(--sar-toast-top)',
    )
    expect(wrapper.find('.sar-toast__title').text()).toBe('顶部位置')

    toast('底部位置', {
      position: 'bottom',
    })
    await Promise.resolve()
    expect(wrapper.find('view').attributes().style).includes(
      'top: auto; bottom: var(--sar-toast-bottom)',
    )
    expect(wrapper.find('.sar-toast__title').text()).toBe('底部位置')
  })

  test('loadingOverlay', async () => {
    const wrapper = mount(h(ToastAgent, {}))

    toast.loading('加载中', {
      overlay: true,
    })
    await Promise.resolve()
    expect(wrapper.find('.sar-overlay').exists()).toBeTruthy()

    toast.loading('加载中', {
      overlay: true,
      transparent: true,
    })
    await Promise.resolve()
    expect(
      wrapper.find('.sar-overlay.sar-overlay_transparent').exists(),
    ).toBeTruthy()
  })
})
