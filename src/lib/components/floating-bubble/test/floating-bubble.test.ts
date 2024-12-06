import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import FloatingBubble from '../floating-bubble.vue'
import Icon from '../../icon/icon.vue'

describe('FloatingBubble', () => {
  test('basic, event', async () => {
    const wrapper = mount(
      h(FloatingBubble, null, {
        default: () =>
          h(Icon, {
            family: 'demo-icons',
            name: 'chat-dots',
          }),
      }),
    )

    expect(wrapper.find('.sar-floating-bubble').exists()).toBeTruthy()

    expect(wrapper.find('.sar-icon').exists()).toBeTruthy()

    await wrapper.trigger('click')

    expect(wrapper.emitted().click).toBeTruthy()
  })

  test('offset', async () => {
    const wrapper = mount(
      h(
        FloatingBubble,
        { magnet: 'x' },
        {
          default: () =>
            h(Icon, {
              family: 'demo-icons',
              name: 'chat-dots',
            }),
        },
      ),
    )

    await wrapper.setProps({
      offset: {
        x: 100,
        y: 100,
      },
    })

    expect(
      wrapper
        .find('.sar-floating-bubble')
        .attributes()
        .style.includes('transform: translate3d(100px, 100px, 0);'),
    ).toBeTruthy()
  })
})
