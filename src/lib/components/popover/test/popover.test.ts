import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Popover from '../popover.vue'
import PopoverReference from '../../popover-reference/popover-reference.vue'

const options = [
  {
    text: '选项1',
  },
  {
    text: '选项2',
  },
  {
    text: '选项3',
  },
]

describe('Popover', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(
        Popover,
        {
          options,
        },
        () => h(PopoverReference, null, () => h('button', null, '按钮')),
      ),
    )

    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.sar-popover').exists()).toBeTruthy()
    expect(wrapper.findAll('.sar-menu__text')[1].text()).toBe('选项2')
  })

  test('dark', async () => {
    const wrapper = mount(
      h(
        Popover,
        {
          options,
          theme: 'dark',
        },
        () => h(PopoverReference, null, () => h('button', null, '按钮')),
      ),
    )

    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.sar-menu_dark').exists()).toBeTruthy()
  })

  test('icon', async () => {
    const wrapper = mount(
      h(
        Popover,
        {
          options: [
            {
              text: '选项1',
              icon: 'upc-scan',
              iconFamily: 'demo-icons',
            },
            {
              text: '选项2',
              icon: 'camera',
              iconFamily: 'demo-icons',
            },
            {
              text: '选项3',
            },
          ],
        },
        () => h(PopoverReference, null, () => h('button', null, '按钮')),
      ),
    )

    await wrapper.find('button').trigger('click')
    expect(
      wrapper
        .findAll('.sar-menu__icon')[0]
        .find('.sar-icon.demo-icons-upc-scan')
        .exists(),
    ).toBeTruthy()
  })

  test('disabled', async () => {
    const wrapper = mount(
      h(
        Popover,
        {
          options: [
            {
              text: '选项1',
              disabled: true,
            },
            {
              text: '选项2',
              disabled: true,
            },
            {
              text: '选项3',
            },
          ],
        },
        () => h(PopoverReference, null, () => h('button', null, '按钮')),
      ),
    )

    await wrapper.find('button').trigger('click')
    expect(wrapper.findAll('.sar-menu__item')[0].classes()).includes(
      'sar-menu__item_disabled',
    )
  })

  test('horizontal', async () => {
    const wrapper = mount(
      h(
        Popover,
        {
          options: [
            {
              text: '选项1',
              icon: 'upc-scan',
              iconFamily: 'demo-icons',
            },
            {
              text: '选项2',
            },
            {
              text: '选项3',
            },
          ],
          direction: 'horizontal',
        },
        () => h(PopoverReference, null, () => h('button', null, '按钮')),
      ),
    )

    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.sar-menu.sar-menu_horizontal').exists()).toBeTruthy()
  })

  test('content', async () => {
    const wrapper = mount(
      h(
        Popover,
        {
          visible: true,
        },
        {
          default() {
            return h(PopoverReference, null, () => h('button', null, '按钮'))
          },
          content() {
            return h('div', { class: 'content' }, '内容')
          },
        },
      ),
    )

    expect(wrapper.find('.sar-popover__content > .content').text()).toBe('内容')
  })
})
