import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Fab from '../fab.vue'
import { type FabItem } from '../common'

const itemList: FabItem[] = [
  { name: '首页', iconFamily: 'demo-icons', icon: 'house-door' },
  { name: '分享', iconFamily: 'demo-icons', icon: 'share' },
  { name: '收藏', iconFamily: 'demo-icons', icon: 'star' },
]

const colouredItemList: FabItem[] = [
  {
    name: '首页',
    iconFamily: 'demo-icons',
    icon: 'house-door',
    background: 'rgb(59, 190, 136)',
  },
  {
    name: '分享',
    iconFamily: 'demo-icons',
    icon: 'share',
    background: 'rgb(247, 149, 59)',
  },
  {
    name: '收藏',
    iconFamily: 'demo-icons',
    icon: 'star',
    color: 'red',
    background: 'rgb(52, 147, 240)',
  },
]

describe('Fab', () => {
  test('basic, event', async () => {
    const wrapper = mount(
      h(Fab, {
        itemList: itemList,
      }),
    )

    expect(wrapper.find('.sar-fab').exists()).toBeTruthy()

    expect(
      wrapper
        .find('.sar-fab__content')
        .attributes()
        .style.includes('display: none'),
    ).toBeTruthy()

    expect(
      wrapper
        .find(
          '.sar-fab__content .sar-fab-item:nth-child(2) > .sar-fab-item__name',
        )
        .text(),
    ).toEqual('分享')

    expect(
      wrapper
        .find('.sar-fab-item:nth-child(3) .sar-icon')
        .attributes()
        .class.includes('demo-icons-star'),
    ).toBeTruthy()

    await wrapper.find('.sar-fab-item_entry').trigger('click')

    expect(wrapper.emitted().click).toBeTruthy()

    expect(wrapper.find('.sar-overlay').exists()).toBeTruthy()

    expect(
      wrapper
        .find('.sar-fab__content')
        .attributes()
        .style.includes('display: flex'),
    ).toBeTruthy()

    await wrapper
      .find('.sar-fab__content .sar-fab-item:nth-child(2)')
      .trigger('click')

    expect(wrapper.emitted<[FabItem, number]>().select[0][0].name).toEqual(
      '分享',
    )
    expect(wrapper.emitted<[FabItem, number]>().select[0][1]).toEqual(1)
  })

  test('color', async () => {
    const wrapper = mount(
      h(Fab, {
        itemList: colouredItemList,
      }),
    )

    expect(
      wrapper
        .find('.sar-fab-item:nth-child(2) .sar-fab-item__btn')
        .attributes()
        .style.includes('background: rgb(247, 149, 59)'),
    ).toBeTruthy()

    expect(
      wrapper
        .find('.sar-fab-item:nth-child(3) .sar-fab-item__btn')
        .attributes()
        .style.includes('color: red'),
    ).toBeTruthy()
  })

  test('HideName', async () => {
    const wrapper = mount(
      h(Fab, {
        itemList: itemList,
      }),
    )

    expect(wrapper.find('.sar-fab-item__name').exists()).toBeTruthy()

    await wrapper.setProps({
      hideName: true,
    })

    expect(wrapper.find('.sar-fab-item__name').exists()).toBeFalsy()
  })

  test('Position', async () => {
    const wrapper = mount(
      h(Fab, {
        itemList: itemList,
      }),
    )

    expect(
      wrapper.find('.sar-fab').attributes().class.includes('sar-fab_bottom'),
    ).toBeTruthy()

    expect(
      wrapper.find('.sar-fab').attributes().class.includes('sar-fab_right'),
    ).toBeTruthy()

    await wrapper.setProps({
      top: '48px',
    })

    expect(
      wrapper.find('.sar-fab').attributes().class.includes('sar-fab_top'),
    ).toBeTruthy()

    expect(
      wrapper.find('.sar-fab').attributes().class.includes('sar-fab_bottom'),
    ).toBeFalsy()

    expect(
      wrapper.find('.sar-fab').attributes().style.includes('top: 48px'),
    ).toBeTruthy()

    await wrapper.setProps({
      left: '48px',
    })

    expect(
      wrapper.find('.sar-fab').attributes().class.includes('sar-fab_left'),
    ).toBeTruthy()

    expect(
      wrapper.find('.sar-fab').attributes().class.includes('sar-fab_right'),
    ).toBeFalsy()

    expect(
      wrapper.find('.sar-fab').attributes().style.includes('left: 48px'),
    ).toBeTruthy()
  })
})
