import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import NavbarPit from '../navbar-pit.vue'

describe('NavbarPit', () => {
  test('basic', async () => {
    const wrapper = mount(h(NavbarPit))
    expect(wrapper.find('.sar-navbar-pit__content').exists()).toBeTruthy()
  })

  test('statusBar', async () => {
    const wrapper = mount(
      h(NavbarPit, {
        statusBar: true,
      }),
    )
    expect(wrapper.find('.sar-status-bar').exists()).toBeTruthy()
  })
})
