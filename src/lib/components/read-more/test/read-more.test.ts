import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import ReadMore from '../read-more.vue'

describe('ReadMore', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(
        ReadMore,
        {
          maxHeight: 200,
        },
        () => '内容',
      ),
    )

    expect(wrapper.find('.sar-read-more__content').attributes().style).include(
      'max-height: 200px',
    )
    expect(wrapper.find('.sar-read-more__content').text()).toBe('内容')
  })

  test('Toggle', async () => {
    const wrapper = mount(
      h(
        ReadMore,
        {
          maxHeight: 200,
          closeText: '展开吧',
          openText: '收起吧',
        },
        () => '内容',
      ),
    )

    expect(wrapper.find('.sar-read-more').classes()).include(
      'sar-read-more_close',
    )
    expect(wrapper.find('.sar-button').text()).toBe('展开吧')

    await wrapper.find('.sar-button').trigger('click')

    expect(wrapper.find('.sar-read-more').classes()).not.include(
      'sar-read-more_close',
    )
    expect(wrapper.find('.sar-button').text()).toBe('收起吧')
    expect(wrapper.find('.sar-read-more__content').attributes().style).include(
      'max-height: none',
    )
  })

  test('Event', async () => {
    const wrapper = mount(
      h(
        ReadMore,
        {
          maxHeight: 200,
        },
        () => '内容',
      ),
    )

    await wrapper.find('.sar-button').trigger('click')

    expect(wrapper.emitted<[boolean]>()['update:visible'][0][0]).toBe(true)
    expect(wrapper.emitted().open).toBeTruthy()
    expect(wrapper.emitted().click).toBeTruthy()

    await wrapper.find('.sar-button').trigger('click')

    expect(wrapper.emitted<[boolean]>()['update:visible'][1][0]).toBe(false)
    expect(wrapper.emitted().click.length).toBe(2)
    expect(wrapper.emitted().close).toBeTruthy()
  })

  test('hideClose', async () => {
    const wrapper = mount(
      h(
        ReadMore,
        {
          maxHeight: 200,
          hideClose: true,
        },
        () => '内容',
      ),
    )

    expect(wrapper.find('.sar-read-more__toggle').exists()).toBe(true)
    await wrapper.find('.sar-button').trigger('click')
    expect(wrapper.find('.sar-read-more__toggle').exists()).toBe(false)
  })
})
