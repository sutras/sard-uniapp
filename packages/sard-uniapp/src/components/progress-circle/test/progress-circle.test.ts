import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import ProgressCircle from '../progress-circle.vue'

describe('ProgressCircle', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(ProgressCircle, {
        percent: 50,
      }),
    )

    expect(wrapper.find('.sar-progress-circle__text').text()).toBe('50%')
  })

  test('thickness', async () => {
    const wrapper = mount(
      h(ProgressCircle, {
        percent: 50,
        thickness: 30,
      }),
    )

    expect(
      wrapper.find('.sar-progress-circle__track').attributes().style,
    ).includes("stroke-width='30'")
  })

  test('color', async () => {
    const wrapper = mount(
      h(ProgressCircle, {
        percent: 50,
        color: 'red',
      }),
    )

    expect(
      wrapper.find('.sar-progress-circle__piece').attributes().style,
    ).includes('color: red;')
  })

  test('size', async () => {
    const wrapper = mount(
      h(ProgressCircle, {
        percent: 50,
        size: '144px',
      }),
    )

    expect(wrapper.find('.sar-progress-circle').attributes().style).includes(
      'width: 144px; height: 144px;',
    )
  })

  test('status', async () => {
    const wrapper = mount(
      h(ProgressCircle, {
        percent: 50,
        status: 'success',
      }),
    )

    expect(
      wrapper.find('.sar-progress-circle.sar-progress-circle_success').exists(),
    ).toBeTruthy()

    await wrapper.setProps({
      status: 'warning',
    })
    expect(
      wrapper.find('.sar-progress-circle.sar-progress-circle_warning').exists(),
    ).toBeTruthy()

    await wrapper.setProps({
      status: 'error',
    })
    expect(
      wrapper.find('.sar-progress-circle.sar-progress-circle_error').exists(),
    ).toBeTruthy()
  })
})
