import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import ShareSheet from '../share-sheet.vue'
import { type ShareSheetItem } from '../common'

const itemList = [
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
  {
    name: 'Twitter',
    color: '#fff',
    background: '#1d9bf0',
    icon: 'twitter-fill',
    iconFamily: 'demo-icons',
  },
  {
    name: 'Facebook',
    color: '#fff',
    background: '#1877f2',
    icon: 'facebook-circle-fill',
    iconFamily: 'demo-icons',
  },
]

const multiItemList = [
  [
    {
      name: 'Wechat',
      color: '#fff',
      background: '#0bc15f',
      iconFamily: 'demo-icons',
      icon: 'wechat-fill',
    },
    {
      name: 'Alipay',
      color: '#fff',
      background: '#1677ff',
      iconFamily: 'demo-icons',
      icon: 'alipay-fill',
    },
    {
      name: 'Twitter',
      color: '#fff',
      background: '#1d9bf0',
      iconFamily: 'demo-icons',
      icon: 'twitter-fill',
    },
    {
      name: 'Facebook',
      color: '#fff',
      background: '#1877f2',
      iconFamily: 'demo-icons',
      icon: 'facebook-circle-fill',
    },
  ],
  [
    {
      name: 'Spotify',
      color: '#fff',
      background: '#1ed760',
      iconFamily: 'demo-icons',
      icon: 'spotify-fill',
    },
    {
      name: 'Skype',
      color: '#fff',
      background: '#0b64a4',
      iconFamily: 'demo-icons',
      icon: 'skype-fill',
    },
    {
      name: 'Youtube',
      color: '#fff',
      background: '#ff0000',
      iconFamily: 'demo-icons',
      icon: 'youtube-fill',
    },
    {
      name: 'Paypal',
      color: '#fff',
      background: '#0070ba',
      iconFamily: 'demo-icons',
      icon: 'paypal-fill',
    },
    {
      name: 'Whatsapp',
      color: '#fff',
      background: '#128c7e',
      iconFamily: 'demo-icons',
      icon: 'whatsapp-fill',
    },
    {
      name: 'Telegram',
      color: '#fff',
      background: '#0088cc',
      iconFamily: 'demo-icons',
      icon: 'telegram-fill',
    },
    {
      name: 'Snapchat',
      color: '#000',
      background: '#fffc00',
      iconFamily: 'demo-icons',
      icon: 'snapchat-fill',
    },
  ],
]

describe('ShareSheet', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(ShareSheet, {
        itemList,
        cancel: '取消',
      }),
    )

    expect(
      wrapper
        .find('.sar-share-sheet__item:last-child .sar-share-sheet__item-name')
        .text(),
    ).toBe('Facebook')
    expect(
      wrapper
        .find(
          '.sar-share-sheet__item:last-child .sar-icon.demo-icons.demo-icons-facebook-circle-fill',
        )
        .exists(),
    ).toBeTruthy()

    await wrapper.find('.sar-share-sheet__cancel').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('cancel')

    await wrapper.find('.sar-share-sheet__item:last-child').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('select')
    expect(wrapper.emitted<[ShareSheetItem]>().select[0][0].name).toBe(
      'Facebook',
    )
  })

  test('multipleRow', async () => {
    const wrapper = mount(
      h(ShareSheet, {
        itemList: multiItemList,
        cancel: '取消',
      }),
    )

    expect(wrapper.findAll('.sar-share-sheet__row').length).toBe(2)
  })

  test('titleAndDescription', async () => {
    const wrapper = mount(
      h(ShareSheet, {
        itemList: [
          {
            name: 'Wechat',
            color: '#fff',
            background: '#0bc15f',
            iconFamily: 'demo-icons',
            icon: 'wechat-fill',
          },
          {
            name: 'Alipay',
            color: '#fff',
            background: '#1677ff',
            iconFamily: 'demo-icons',
            icon: 'alipay-fill',
            description: '这是描述这是描述',
          },
          {
            name: 'Twitter',
            color: '#fff',
            background: '#1d9bf0',
            iconFamily: 'demo-icons',
            icon: 'twitter-fill',
          },
          {
            name: 'Facebook',
            color: '#fff',
            background: '#1877f2',
            iconFamily: 'demo-icons',
            icon: 'facebook-circle-fill',
          },
        ],
        title: '分享到',
        description: '这是描述',
      }),
    )

    expect(wrapper.find('.sar-share-sheet__title').text()).toBe('分享到')
    expect(wrapper.find('.sar-share-sheet__description').text()).toBe(
      '这是描述',
    )
    expect(
      wrapper
        .find(
          '.sar-share-sheet__item:nth-child(2) .sar-share-sheet__item-description',
        )
        .text(),
    ).toBe('这是描述这是描述')
  })

  test('picture', async () => {
    const wrapper = mount(
      h(ShareSheet, {
        itemList: [
          {
            name: 'Sard',
            icon: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg',
          },
          {
            name: 'Wechat',
            color: '#fff',
            background: '#0bc15f',
            iconFamily: 'demo-icons',
            icon: 'wechat-fill',
          },
        ],
        cancel: '取消',
      }),
    )

    expect(
      wrapper.findAll('.sar-share-sheet__item')[0].find('image').attributes()
        .src,
    ).toBe('https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg')
  })

  test('Disabled', async () => {
    const wrapper = mount(
      h(ShareSheet, {
        itemList: [
          {
            name: 'Wechat',
            color: '#fff',
            background: '#0bc15f',
            icon: 'wechat-fill',
            iconFamily: 'demo-icons',
            disabled: true,
          },
          {
            name: 'Alipay',
            color: '#fff',
            background: '#1677ff',
            icon: 'alipay-fill',
            iconFamily: 'demo-icons',
          },
        ],
        cancel: '取消',
      }),
    )

    expect(wrapper.findAll('.sar-share-sheet__item')[0].classes()).includes(
      'sar-share-sheet__item_disabled',
    )
  })
})
