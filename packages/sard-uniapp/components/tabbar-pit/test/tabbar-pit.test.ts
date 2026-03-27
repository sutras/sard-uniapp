import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import TabbarPit from '../tabbar-pit.vue'

describe('TabbarPit', () => {
  test('basic', async () => {
    const wrapper = mount(h(TabbarPit))
    expect(wrapper.find('.sar-tabbar-pit').exists()).toBeTruthy()
  })

  test('safeAreaInsetBottom', async () => {
    const wrapper = mount(
      h(TabbarPit, {
        safeAreaInsetBottom: true,
      }),
    )
    expect(
      wrapper.find('.sar-tabbar-pit').classes().includes('sar-tabbar-pit_safe'),
    ).toBeTruthy()
  })
})
