import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Tabbar from '../tabbar.vue'
import TabbarItem from '../../tabbar-item/tabbar-item.vue'

const createChildren = () => {
  return [
    h(TabbarItem, {
      name: 0,
      icon: 'house-door-fill',
      iconFamily: 'demo-icons',
      text: '首页',
    }),
    h(TabbarItem, {
      name: 1,
      icon: 'cart-fill',
      iconFamily: 'demo-icons',
      text: '购物车',
    }),
    h(TabbarItem, {
      name: 2,
      icon: 'chat-dots-fill',
      iconFamily: 'demo-icons',
      text: '消息',
    }),
    h(TabbarItem, {
      name: 3,
      icon: 'person-fill',
      iconFamily: 'demo-icons',
      text: '我的',
    }),
  ]
}

const createChildren2 = () => {
  return [
    h(TabbarItem, {
      name: 0,
      icon: 'house-door-fill',
      iconFamily: 'demo-icons',
      text: '首页',
    }),
    h(TabbarItem, {
      name: 1,
      icon: 'cart-fill',
      iconFamily: 'demo-icons',
      text: '购物车',
    }),
    h(TabbarItem, {
      name: 2,
      icon: 'chat-dots-fill',
      iconFamily: 'demo-icons',
      text: '消息',
      badge: 5,
    }),
    h(TabbarItem, {
      name: 3,
      icon: 'person-fill',
      iconFamily: 'demo-icons',
      text: '我的',
      dot: true,
    }),
  ]
}

const createChildren3 = () => {
  return [
    h(TabbarItem, {
      name: 0,
      icon: 'house-door-fill',
      iconFamily: 'demo-icons',
      text: '首页',
    }),
    h(TabbarItem, {
      name: 1,
      icon: 'cart-fill',
      iconFamily: 'demo-icons',
      text: '购物车',
    }),
    h(TabbarItem, null, () => h('div', { class: 'content' }, '内容')),
    h(TabbarItem, {
      name: 2,
      icon: 'chat-dots-fill',
      iconFamily: 'demo-icons',
      text: '消息',
      badge: 5,
    }),
    h(TabbarItem, {
      name: 3,
      icon: 'person-fill',
      iconFamily: 'demo-icons',
      text: '我的',
      dot: true,
    }),
  ]
}

describe('Tabbar', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(
        Tabbar,
        {
          current: 1,
        },
        createChildren,
      ),
    )

    expect(wrapper.findAll('.sar-tabbar__item')[1].classes()).includes(
      'sar-tabbar__item_current',
    )
    expect(
      wrapper.find('.sar-tabbar__item:nth-child(3) .sar-tabbar__text').text(),
    ).toBe('消息')
    expect(
      wrapper
        .find(
          '.sar-tabbar__item:nth-child(3) .sar-icon.demo-icons.demo-icons-chat-dots-fill',
        )
        .exists(),
    ).toBeTruthy()
  })

  test('color', async () => {
    const wrapper = mount(
      h(
        Tabbar,
        {
          current: 1,
          activeColor: 'red',
        },
        createChildren,
      ),
    )

    expect(
      wrapper.find('.sar-tabbar__item_current').attributes().style,
    ).includes('color: red;')
  })

  test('badge', async () => {
    const wrapper = mount(
      h(
        Tabbar,
        {
          current: 1,
          activeColor: 'red',
        },
        createChildren2,
      ),
    )

    expect(
      wrapper.find('.sar-tabbar__item:nth-child(3) .sar-badge').text(),
    ).toBe('5')
    expect(
      wrapper
        .find('.sar-tabbar__item:nth-child(4) .sar-badge.sar-badge_dot')
        .exists(),
    ).toBeTruthy()
  })

  test('bulge', async () => {
    const wrapper = mount(
      h(
        Tabbar,
        {
          current: 1,
        },
        createChildren3,
      ),
    )

    expect(wrapper.find('.sar-tabbar__item:nth-child(3) .content').text()).toBe(
      '内容',
    )
  })

  test('fixed', async () => {
    const wrapper = mount(
      h(
        Tabbar,
        {
          current: 1,
          fixed: true,
        },
        createChildren3,
      ),
    )

    expect(
      wrapper.find('.sar-tabbar').classes().includes('sar-tabbar_fixed'),
    ).toBeTruthy()
  })

  test('safeAreaInsetBottom', async () => {
    const wrapper = mount(
      h(
        Tabbar,
        {
          current: 1,
          safeAreaInsetBottom: true,
        },
        createChildren3,
      ),
    )

    expect(
      wrapper.find('.sar-tabbar').classes().includes('sar-tabbar_safe'),
    ).toBeTruthy()
  })
})
