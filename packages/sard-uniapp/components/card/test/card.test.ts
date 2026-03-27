import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Card from '../card.vue'
import { sleep } from '../../../utils'

describe('Card', () => {
  test('create', async () => {
    const wrapper = mount(
      h(
        Card,
        {
          title: '标题',
          extra: '额外内容',
          footer: '底部',
        },
        () => h('div', null, '内容'),
      ),
    )

    expect(wrapper.find('.sar-card__title').text()).toBe('标题')
    expect(wrapper.find('.sar-card__extra').text()).toBe('额外内容')
    expect(wrapper.find('.sar-card__body').text()).toBe('内容')
    expect(wrapper.find('.sar-card__footer').text()).toBe('底部')
  })

  test('borderless', async () => {
    const wrapper = mount(
      h(
        Card,
        {
          title: '标题',
          extra: '额外内容',
          footer: '底部',
          hideFooterBorder: true,
          hideHeaderBorder: true,
        },
        () => h('div', null, '内容'),
      ),
    )

    expect(
      wrapper.find('.sar-card').classes().includes('sar-card_head-borderless'),
    ).toBeTruthy()

    expect(
      wrapper.find('.sar-card').classes().includes('sar-card_foot-borderless'),
    ).toBeTruthy()
  })

  test('collapsed', async () => {
    const wrapper = mount(
      h(
        Card,
        {
          title: '标题',
          extra: '额外内容',
          footer: '底部',
          collapsed: false,
          style: {
            '--sar-collapse-transition-duration': '0s',
          },
        },
        () => h('div', null, '内容'),
      ),
    )

    expect(wrapper.find('.sar-collapse').attributes().style).includes(
      'height: auto; overflow: visible;',
    )

    await wrapper.setProps({
      collapsed: true,
    })

    await sleep(50)

    expect(wrapper.find('.sar-collapse').attributes().style).includes(
      'height: 0px; overflow: hidden;',
    )
  })
})
