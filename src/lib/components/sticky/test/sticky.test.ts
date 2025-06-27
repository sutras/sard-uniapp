import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Sticky from '../sticky.vue'
import StickyBox from '../../sticky-box/sticky-box.vue'

describe('Sticky', () => {
  test('basic', async () => {
    const wrapper = mount(h(Sticky, {}, () => '内容'))

    expect(
      wrapper
        .find(
          '.sar-sticky .sar-sticky__observe .sar-sticky__fixation .sar-sticky__bound',
        )
        .text(),
    ).toBe('内容')
  })

  test('ZIndex', async () => {
    const wrapper = mount(
      h(
        Sticky,
        {
          zIndex: 10,
        },
        () => '内容',
      ),
    )

    expect(
      wrapper
        .find('.sar-sticky .sar-sticky__observe .sar-sticky__fixation')
        .attributes().style,
    ).include('z-index: 10')
  })

  test('StickyBox', async () => {
    const wrapper = mount(
      h(StickyBox, {}, () =>
        h(
          Sticky,
          {
            zIndex: 10,
          },
          () => '内容',
        ),
      ),
    )

    expect(
      wrapper.find('.sar-sticky-box .sar-sticky-box__observe').exists(),
    ).toBeTruthy()

    expect(wrapper.find('.sar-sticky-box .sar-sticky').exists()).toBeTruthy()
  })
})
