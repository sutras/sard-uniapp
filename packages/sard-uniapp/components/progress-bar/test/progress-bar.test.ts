import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import ProgressBar from '../progress-bar.vue'

describe('ProgressBar', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(ProgressBar, {
        percent: 50,
      }),
    )

    expect(
      wrapper.find('.sar-progress-bar__piece').attributes().style,
    ).includes('width: 50%;')
    expect(wrapper.find('.sar-progress-bar__text').text()).toBe('50%')
  })

  test('showText', async () => {
    const wrapper = mount(
      h(ProgressBar, {
        percent: 50,
        showText: false,
      }),
    )
    expect(wrapper.find('.sar-progress-bar__text').exists()).toBeFalsy()
  })

  test('thickness', async () => {
    const wrapper = mount(
      h(ProgressBar, {
        percent: 50,
        thickness: '20px',
      }),
    )

    expect(
      wrapper.find('.sar-progress-bar__track').attributes().style,
    ).includes('height: 20px;')
  })

  test('color', async () => {
    const wrapper = mount(
      h(ProgressBar, {
        percent: 50,
        color: 'red',
      }),
    )

    expect(
      wrapper.find('.sar-progress-bar__piece').attributes().style,
    ).includes('background-color: red;')
  })

  test('striped', async () => {
    const wrapper = mount(
      h(ProgressBar, {
        percent: 50,
        striped: true,
      }),
    )

    expect(
      wrapper.find('.sar-progress-bar.sar-progress-bar_striped').exists(),
    ).toBeTruthy()
  })

  test('status', async () => {
    const wrapper = mount(
      h(ProgressBar, {
        percent: 50,
        status: 'success',
      }),
    )
    expect(
      wrapper.find('.sar-progress-bar.sar-progress-bar_success').exists(),
    ).toBeTruthy()

    await wrapper.setProps({
      status: 'warning',
    })
    expect(
      wrapper.find('.sar-progress-bar.sar-progress-bar_warning').exists(),
    ).toBeTruthy()

    await wrapper.setProps({
      status: 'error',
    })
    expect(
      wrapper.find('.sar-progress-bar.sar-progress-bar_error').exists(),
    ).toBeTruthy()
  })
})
