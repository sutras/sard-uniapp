import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import BackTop from '../back-top.vue'

describe('BackTop', () => {
  test('position', async () => {
    const wrapper = mount(
      h(BackTop, {
        right: '100px',
        bottom: '100px',
      }),
    )

    expect(wrapper.find('.sar-back-top').attributes().style).toBe(
      'right: 100px; bottom: 100px;',
    )
  })

  test('scrollTop', async () => {
    const wrapper = mount(
      h(BackTop, {
        scrollTop: 0,
      }),
    )

    expect(
      wrapper.find('.sar-back-top').classes().includes('sar-back-top_visible'),
    ).toBeFalsy()

    await wrapper.setProps({ scrollTop: 300 })

    expect(
      wrapper.find('.sar-back-top').classes().includes('sar-back-top_visible'),
    ).toBeTruthy()
  })

  test('visibleHeight', async () => {
    const wrapper = mount(
      h(BackTop, {
        visibleHeight: 200,
      }),
    )

    expect(
      wrapper.find('.sar-back-top').classes().includes('sar-back-top_visible'),
    ).toBeFalsy()

    await wrapper.setProps({ visibleHeight: 0 })

    expect(
      wrapper.find('.sar-back-top').classes().includes('sar-back-top_visible'),
    ).toBeTruthy()
  })

  test('slot', async () => {
    const wrapper = mount(h(BackTop, null, () => '回到顶部'))

    expect(wrapper.text()).toBe('回到顶部')
  })

  test('click', async () => {
    const wrapper = mount(h(BackTop))

    await wrapper.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
