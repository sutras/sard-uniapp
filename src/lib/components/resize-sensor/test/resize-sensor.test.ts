import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import ResizeSensor from '../resize-sensor.vue'

describe('ResizeSensor', () => {
  test('basic', async () => {
    const wrapper = mount(h(ResizeSensor))

    expect(wrapper.find('.sar-resize-sensor').exists()).toBeTruthy()
    expect(
      wrapper.find('.sar-resize-sensor__scroll-view').exists(),
    ).toBeTruthy()
    expect(wrapper.find('.sar-resize-sensor__increase').exists()).toBeTruthy()
    expect(wrapper.find('.sar-resize-sensor__decrease').exists()).toBeTruthy()
  })
})
