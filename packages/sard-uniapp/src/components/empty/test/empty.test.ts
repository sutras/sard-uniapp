import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Empty from '../empty.vue'

describe('Empty', () => {
  test('create', async () => {
    const wrapper = mount(
      h(Empty, {
        description: '自定义描述内容',
      }),
    )

    expect(wrapper.find('.sar-empty__icon').exists()).toBe(true)
    expect(wrapper.find('.sar-empty__description').text()).toBe(
      '自定义描述内容',
    )
  })

  test('extra', async () => {
    const wrapper = mount(
      h(Empty, null, () => h('view', { class: 'content' }, '内容')),
    )

    expect(wrapper.find('.sar-empty__extra').exists()).toBe(true)
    expect(wrapper.find('.content').text()).toBe('内容')
  })
})
