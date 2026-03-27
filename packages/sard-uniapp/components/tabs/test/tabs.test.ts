import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Tabs from '../tabs.vue'
import Tab from '../../tab/tab.vue'

const list = [
  {
    title: '标签0',
  },
  {
    title: '标签1',
  },
  {
    title: '标签2',
  },
]

describe('Tabs', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(Tabs, {
        list,
      }),
    )

    expect(wrapper.find('.sar-tabs__tab:nth-child(2)').text()).toBe('标签1')
    expect(wrapper.find('.sar-tabs__line').exists()).toBeTruthy()
  })

  test('scrollable', async () => {
    const wrapper = mount(
      h(Tabs, {
        list: Array(10)
          .fill(0)
          .map((_, i) => {
            return {
              title: `标签${i}`,
            }
          }),
        scrollable: true,
      }),
    )

    expect(wrapper.find('.sar-tabs__scroll').attributes()['scroll-x']).toBe(
      'true',
    )
  })

  test('disabled', async () => {
    const wrapper = mount(
      h(Tabs, {
        list: [
          {
            title: '标签0',
          },
          {
            title: '标签1',
            disabled: true,
          },
          {
            title: '标签2',
          },
        ],
      }),
    )

    expect(
      wrapper
        .find('.sar-tabs__tab:nth-child(2).sar-tabs__tab_disabled')
        .exists(),
    ).toBeTruthy()
  })

  test('pill', async () => {
    const wrapper = mount(
      h(Tabs, {
        type: 'pill',
        list: Array(10)
          .fill(0)
          .map((_, i) => {
            return {
              title: `标签${i}`,
            }
          }),
      }),
    )

    expect(wrapper.find('.sar-tabs.sar-tabs_pill').exists()).toBeTruthy()
  })

  test('custom', async () => {
    const wrapper = mount(
      h(Tabs, {}, () => [
        h(Tab, { name: '0' }, () => h('div', { class: 'content' }, '内容1')),
        h(Tab, { name: '1' }, () => h('div', { class: 'content' }, '内容2')),
      ]),
    )

    expect(wrapper.find('.sar-tabs__tab:nth-child(1) .content').text()).toBe(
      '内容1',
    )
    expect(wrapper.find('.sar-tabs__tab:nth-child(2) .content').text()).toBe(
      '内容2',
    )
  })
})
