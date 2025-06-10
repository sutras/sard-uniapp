import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import SwipeAction from '../swipe-action.vue'

describe('SwipeAction', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(
        SwipeAction,
        {},
        {
          default: () => h('div', { class: 'content' }, '内容'),
          left: ({ hide }: any) => [
            h(
              'button',
              {
                onClick() {
                  hide()
                },
              },
              '分享',
            ),
          ],
          right: ({ hide }: any) => [
            h(
              'button',
              {
                onClick() {
                  hide()
                },
              },
              '删除',
            ),
          ],
        },
      ),
    )

    // render
    expect(
      wrapper
        .find('.sar-swipe-action .sar-swipe-action__content .content')
        .text(),
    ).toBe('内容')

    // update:visible
    await wrapper.setProps({
      visible: 'right',
    })

    await wrapper
      .find('.sar-swipe-action .sar-swipe-action__content')
      .trigger('click')

    expect(wrapper.emitted('update:visible')?.[0][0]).toBe(false)

    // hide()
    await wrapper.setProps({
      visible: 'left',
    })

    await wrapper
      .find(
        '.sar-swipe-action .sar-swipe-action__content .sar-swipe-action__left button',
      )
      .trigger('click')

    expect(wrapper.emitted('update:visible')?.[1][0]).toBe(false)

    // disabled
    await wrapper.setProps({
      visible: 'right',
      disabled: true,
    })

    await wrapper
      .find('.sar-swipe-action .sar-swipe-action__content')
      .trigger('click')

    expect(wrapper.emitted('update:visible')?.[2]).toBeUndefined()

    await wrapper.setProps({
      disabled: false,
    })

    await wrapper
      .find('.sar-swipe-action .sar-swipe-action__content')
      .trigger('click')

    expect(wrapper.emitted('update:visible')?.[2][0]).toBe(false)
  })
})
