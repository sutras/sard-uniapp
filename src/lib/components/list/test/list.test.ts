import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import List from '../list.vue'
import ListItem from '../../list-item/list-item.vue'

describe('List', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(List, null, () => [
        h(ListItem, {
          title: '标题',
          value: '值',
          description: '描述',
        }),
      ]),
    )

    expect(wrapper.find('.sar-list-item__title').text()).toBe('标题描述')
    expect(wrapper.find('.sar-list-item__description').text()).toBe('描述')
    expect(wrapper.find('.sar-list-item__value').text()).toBe('值')
  })

  test('hoverArrow', async () => {
    const wrapper = mount(
      h(List, null, () => [
        h(ListItem, {
          hover: true,
          arrow: true,
          title: '标题',
        }),
      ]),
    )
    expect(wrapper.find('.sar-list-item').classes()).includes(
      'sar-list-item_hover',
    )
    expect(wrapper.find('.sar-list-item__arrow').exists()).toBe(true)
  })

  test('icon', async () => {
    const wrapper = mount(
      h(List, null, () => [
        h(ListItem, {
          iconFamily: 'demo-icons',
          iconColor: '#4994EC',
          icon: 'arrow-down-square-fill',
        }),
      ]),
    )

    expect(wrapper.find('.sar-list-item__icon').exists()).toBe(true)
    expect(
      wrapper
        .find('.sar-icon.demo-icons.demo-icons-arrow-down-square-fill')
        .exists(),
    ).toBe(true)
  })

  test('iconSlot', async () => {
    const wrapper = mount(
      h(List, null, () => [
        h(ListItem, null, {
          icon() {
            return '图标'
          },
        }),
      ]),
    )

    expect(wrapper.find('.sar-list-item__icon').exists()).toBe(true)
    expect(wrapper.find('.sar-list-item__icon').text()).toBe('图标')
  })

  test('slot', async () => {
    const wrapper = mount(
      h(List, null, () => [
        h(ListItem, null, {
          title() {
            return '标题'
          },
          value() {
            return '值'
          },
        }),
      ]),
    )

    expect(wrapper.find('.sar-list-item__title').text()).toBe('标题')
    expect(wrapper.find('.sar-list-item__value').text()).toBe('值')
  })

  test('defaultSlot', async () => {
    const wrapper = mount(
      h(List, null, () => [
        h(ListItem, null, {
          title() {
            return '标题'
          },
          default() {
            return '默认插槽'
          },
        }),
      ]),
    )

    expect(wrapper.find('.sar-list-item__title').exists()).toBeFalsy()
    expect(
      wrapper.find('.sar-list-item.sar-list-item_custom').exists(),
    ).toBeTruthy()
    expect(wrapper.find('.sar-list-item').text()).toBe('默认插槽')
  })

  test('group', async () => {
    const wrapper = mount(
      h(
        List,
        {
          title: '分组标题',
          description: '分组描述',
          card: true,
        },
        () => [
          h(ListItem, {
            title: '标题',
            value: '值',
          }),
          h(ListItem, {
            title: '标题',
            value: '值',
          }),
        ],
      ),
    )

    expect(wrapper.find('.sar-list.sar-list_card').exists()).toBeTruthy()
  })
})
