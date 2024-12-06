import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Navbar from '../navbar.vue'
import NavbarItem from '../../navbar-item/navbar-item.vue'

describe('Navbar', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(Navbar, {
        title: '标题',
      }),
    )

    expect(wrapper.find('.sar-navbar__title').text()).toBe('标题')
  })

  test('item', async () => {
    const wrapper = mount(
      h(
        Navbar,
        {
          title: '标题',
        },
        {
          left() {
            return h(NavbarItem, null, () => 'left-item')
          },
          right() {
            return h(NavbarItem, null, () => 'right-item')
          },
        },
      ),
    )

    expect(wrapper.find('.sar-navbar__left .sar-navbar__item').text()).toBe(
      'left-item',
    )
    expect(wrapper.find('.sar-navbar__right .sar-navbar__item').text()).toBe(
      'right-item',
    )
  })

  test('flow', async () => {
    const wrapper = mount(
      h(
        Navbar,
        {
          title: '标题',
          flow: true,
        },
        {
          left() {
            return h(NavbarItem, null, () => 'left-item')
          },
          right() {
            return h(NavbarItem, null, () => 'right-item')
          },
        },
      ),
    )

    expect(wrapper.find('.sar-navbar.sar-navbar_flow').exists()).toBeTruthy()
  })

  test('custom', async () => {
    const wrapper = mount(
      h(
        Navbar,
        {
          title: '标题',
          flow: true,
        },
        {
          left() {
            return h(NavbarItem, null, () => 'left-item')
          },
          right() {
            return h(NavbarItem, null, () => 'right-item')
          },
          default() {
            return '默认内容'
          },
        },
      ),
    )

    expect(wrapper.find('.sar-navbar__content').text()).toBe('默认内容')
  })
})
