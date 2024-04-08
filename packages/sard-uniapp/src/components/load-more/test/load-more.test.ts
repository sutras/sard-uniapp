import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import LoadMore from '../load-more.vue'

describe('LoadMore', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(LoadMore, {
        incompleteText: 'incompleteText',
        loadingText: 'loadingText',
        completeText: 'completeText',
        errorText: 'errorText',
      }),
    )

    expect(wrapper.text()).toBe('incompleteText')
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('load-more')

    await wrapper.setProps({
      status: 'loading',
    })
    expect(wrapper.text()).toBe('loadingText')

    await wrapper.setProps({
      status: 'complete',
    })
    expect(wrapper.text()).toBe('completeText')

    await wrapper.setProps({
      status: 'error',
    })
    expect(wrapper.text()).toBe('errorText')
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('reload')
  })
})
