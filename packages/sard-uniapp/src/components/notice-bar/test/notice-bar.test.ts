import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import NoticeBar from '../notice-bar.vue'

describe('NoticeBar', () => {
  test('basic', async () => {
    const wrapper = mount(h(NoticeBar, null, () => '这是一条公告！'))

    expect(
      wrapper
        .find('.sar-notice-bar .sar-notice-bar__left-icon .sar-icon')
        .exists(),
    ).toBeTruthy()
    expect(
      wrapper
        .find(
          '.sar-notice-bar .sar-notice-bar__content .sar-notice-bar__wrapper',
        )
        .text(),
    ).toBe('这是一条公告！')
  })

  test('wrap', async () => {
    const wrapper = mount(
      h(
        NoticeBar,
        {
          wrap: true,
        },
        () => '这是一条公告！',
      ),
    )

    expect(
      wrapper.find('.sar-notice-bar.sar-notice-bar_wrap').exists(),
    ).toBeTruthy()
  })

  test('hideLeftIcon', async () => {
    const wrapper = mount(
      h(
        NoticeBar,
        {
          hideLeftIcon: true,
        },
        () => '这是一条公告！',
      ),
    )

    expect(
      wrapper.find('.sar-notice-bar .sar-notice-bar__left-icon').exists(),
    ).toBeFalsy()
  })

  test('leftIconSlot', async () => {
    const wrapper = mount(
      h(NoticeBar, null, {
        'left-icon'() {
          return 'left-icon'
        },
      }),
    )

    expect(wrapper.find('.sar-notice-bar__left-icon').text()).toBe('left-icon')
  })

  test('closable', async () => {
    const wrapper = mount(
      h(NoticeBar, {
        closable: true,
      }),
    )

    expect(
      wrapper.find('.sar-notice-bar__right-icon .sari-close').exists(),
    ).toBeTruthy()
  })

  test('linkable', async () => {
    const wrapper = mount(
      h(NoticeBar, {
        linkable: true,
      }),
    )

    expect(
      wrapper.find('.sar-notice-bar.sar-notice-bar_linkable').exists(),
    ).toBeTruthy()
    expect(
      wrapper.find('.sar-notice-bar__right-icon .sari-right').exists(),
    ).toBeTruthy()
  })

  test('rightIconSlot', async () => {
    const wrapper = mount(
      h(
        NoticeBar,
        {
          closable: true,
        },
        {
          'right-icon'() {
            return 'right-icon'
          },
        },
      ),
    )

    expect(wrapper.find('.sar-notice-bar__right-icon').text()).toBe(
      'right-icon',
    )
  })

  test('style', async () => {
    const wrapper = mount(
      h(NoticeBar, {
        color: 'red',
        background: 'blue',
      }),
    )

    expect(wrapper.find('.sar-notice-bar').attributes().style).includes(
      'color: red; background: blue;',
    )
  })

  test('vertical', async () => {
    const wrapper = mount(
      h(NoticeBar, {
        vertical: true,
      }),
    )

    expect(
      wrapper.find('.sar-notice-bar.sar-notice-bar_vertical').exists(),
    ).toBeTruthy()
  })
})
