import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import ShareSheetAgent from '../share-sheet-agent.vue'
import { shareSheet } from '../index'
import type { ShareSheetItemProps } from '../../share-sheet-item/common'

const itemList: ShareSheetItemProps[] = [
  {
    name: 'Wechat',
    color: '#fff',
    background: '#0bc15f',
    icon: 'wechat-fill',
    iconFamily: 'demo-icons',
  },
  {
    name: 'Alipay',
    color: '#fff',
    background: '#1677ff',
    icon: 'alipay-fill',
    iconFamily: 'demo-icons',
  },
]

describe('ShareSheetAgent', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(ShareSheetAgent, {
        itemList,
        cancel: '取消',
      }),
    )

    expect(
      wrapper
        .find('.sar-share-sheet__item:last-child .sar-share-sheet__item-name')
        .text(),
    ).toBe('Alipay')

    await wrapper.find('.sar-share-sheet__cancel').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('cancel')

    await wrapper.find('.sar-share-sheet__item:last-child').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('select')
  })

  test('imperative show and hide', async () => {
    const wrapper = mount(
      h(ShareSheetAgent, {
        itemList,
        cancel: '取消',
      }),
    )

    shareSheet({ itemList, visible: true })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data).toBeDefined()

    shareSheet.hide()
    await wrapper.vm.$nextTick()
  })
})
