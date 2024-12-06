import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Popup from '../popup.vue'

describe('Popover', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(
        Popup,
        {
          visible: true,
          effect: 'fade',
        },
        () => h('div', null, '内容'),
      ),
    )
    expect(wrapper.find('.sar-popup.sar-popup_fade').exists()).toBeTruthy()

    await wrapper.setProps({
      effect: 'slide-top',
    })
    expect(wrapper.find('.sar-popup.sar-popup_slide-top').exists()).toBeTruthy()

    await wrapper.setProps({
      effect: 'slide-right',
    })
    expect(
      wrapper.find('.sar-popup.sar-popup_slide-right').exists(),
    ).toBeTruthy()

    await wrapper.setProps({
      effect: 'slide-bottom',
    })
    expect(
      wrapper.find('.sar-popup.sar-popup_slide-bottom').exists(),
    ).toBeTruthy()

    await wrapper.setProps({
      effect: 'slide-left',
    })
    expect(
      wrapper.find('.sar-popup.sar-popup_slide-left').exists(),
    ).toBeTruthy()

    await wrapper.setProps({
      effect: 'zoom',
    })
    expect(wrapper.find('.sar-popup.sar-popup_zoom').exists()).toBeTruthy()
  })
})
