import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Collapse from '../collapse.vue'
import { sleep } from '../../../utils'

describe('Collapse', () => {
  test('create', async () => {
    const wrapper = mount(
      h(
        Collapse,
        {
          visible: false,
        },
        () =>
          h('div', {
            style: 'width: 200px; height: 200px',
          }),
      ),
    )

    expect(wrapper.find('.sar-collapse').attributes().style).toContain(
      'height: 0px',
    )

    await wrapper.setProps({
      visible: true,
    })
    await sleep(50)

    expect(wrapper.find('.sar-collapse').attributes().style).not.toContain(
      'height: 0px',
    )

    await wrapper.setProps({
      visible: false,
    })
    await sleep(50)

    expect(wrapper.find('.sar-collapse').attributes().style).toContain(
      'height: 0px',
    )
  })
})
