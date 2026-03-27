import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import ScrollSpy from '../scroll-spy.vue'
import { h } from 'vue'
import ScrollSpyAnchor from '../../scroll-spy-anchor/scroll-spy-anchor.vue'

describe('ScrollSpy', () => {
  test('event', async () => {
    const wrapper = mount(
      h(ScrollSpy, {}, () =>
        Array(10)
          .fill(0)
          .map((_, i) => {
            return [
              h(ScrollSpyAnchor, { name: i }),
              h('div', { class: 'title' }, i),
            ]
          }),
      ),
    )

    expect(wrapper.findAll('.title').length).toBe(10)
  })
})
