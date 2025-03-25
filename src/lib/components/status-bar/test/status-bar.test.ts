import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import StatusBar from '../status-bar.vue'
import { h } from 'vue'

describe('StatusBar', () => {
  test('basic', async () => {
    const wrapper = mount(h(StatusBar, {}))

    expect(wrapper.find('.sar-status-bar').attributes().style).toBe(
      'height: 0px;',
    )
  })
})
