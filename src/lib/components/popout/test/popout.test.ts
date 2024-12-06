import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Popout from '../popout.vue'

describe('Popout', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(
        Popout,
        {
          title: '标题',
        },
        () => h('div', { class: 'content' }, '内容'),
      ),
    )

    expect(wrapper.find('.sar-popout__title').text()).toBe('标题')
    expect(wrapper.find('.content').text()).toBe('内容')
  })

  test('compact', async () => {
    const wrapper = mount(
      h(Popout, {
        title: '标题',
        type: 'compact',
      }),
    )

    expect(
      wrapper.find('.sar-popout__header.sar-popout__header_compact').exists(),
    ).toBeTruthy()
  })
})
