import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Overlay from '../overlay.vue'

describe('Overlay', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(Overlay, {
        visible: true,
      }),
    )

    await Promise.resolve()

    expect(wrapper.find('.sar-overlay').exists()).toBeTruthy()
  })
})
