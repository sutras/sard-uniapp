import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import ScrollList from '../scroll-list.vue'

describe('ScrollList', () => {
  test('basic', async () => {
    const wrapper = mount(h(ScrollList, {}, () => '内容'))

    expect(wrapper.find('.sar-scroll-list__content').text()).toBe('内容')
    expect(
      wrapper.find('.sar-scroll-list__scrollbar-thumb').exists(),
    ).toBeTruthy()
  })

  test('Color', async () => {
    const wrapper = mount(
      h(
        ScrollList,
        {
          scrollbarBg: 'red',
          thumbBg: 'blue',
        },
        () => '内容',
      ),
    )

    expect(
      wrapper.find('.sar-scroll-list__scrollbar').attributes().style,
    ).includes('background-color: red')
    expect(
      wrapper.find('.sar-scroll-list__scrollbar-thumb').attributes().style,
    ).includes('background-color: blue')
  })
})
