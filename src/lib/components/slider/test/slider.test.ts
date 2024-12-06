import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Slider from '../slider.vue'

describe('Slider', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(Slider, {
        modelValue: 50,
      }),
    )

    expect(wrapper.find('.sar-slider__piece').attributes().style).includes(
      'width: 50%;',
    )
  })

  test('range', async () => {
    const wrapper = mount(
      h(Slider, {
        modelValue: [20, 80],
        range: true,
      }),
    )

    expect(wrapper.find('.sar-slider__piece').attributes().style).toMatch(
      /left: 20%; width: 60(.0*1)?%;/,
    )
  })

  test('showValue', async () => {
    const wrapper = mount(
      h(Slider, {
        modelValue: 50,
        showValue: true,
      }),
    )

    expect(wrapper.find('.sar-slider__value').text()).toBe('50')

    await wrapper.setProps({
      modelValue: [20, 80],
      range: true,
    })

    expect(
      wrapper
        .find('.sar-slider__thumb-container_start .sar-slider__value')
        .text(),
    ).toBe('20')
    expect(
      wrapper
        .find('.sar-slider__thumb-container_end .sar-slider__value')
        .text(),
    ).toBe('80')
  })

  test('showValue', async () => {
    const min = -50
    const max = 23
    const value = 49
    const width = ((value - min) / (max - min)) * 100

    const wrapper = mount(
      h(Slider, {
        min,
        max,
        modelValue: value,
      }),
    )

    expect(wrapper.find('.sar-slider__piece').attributes().style).includes(
      `width: ${width}%;`,
    )
  })

  test('vertical', async () => {
    const wrapper = mount(
      h(Slider, {
        modelValue: 50,
        vertical: true,
      }),
    )

    expect(
      wrapper.find('.sar-slider.sar-slider_vertical').exists(),
    ).toBeTruthy()
  })

  test('showScale', async () => {
    const wrapper = mount(
      h(Slider, {
        modelValue: 50,
        showScale: true,
        step: 20,
      }),
    )

    const result = '0,20,40,60,80,100'

    expect(
      wrapper
        .findAll('.sar-slider__scale')
        .map((item) => item.text())
        .join(','),
    ).toBe(result)
  })

  test('color', async () => {
    const wrapper = mount(
      h(Slider, {
        modelValue: 50,
        pieceColor: 'red',
        thumbColor: 'blue',
      }),
    )

    expect(wrapper.find('.sar-slider__piece').attributes().style).includes(
      'background-color: red;',
    )
    expect(wrapper.find('.sar-slider__thumb').attributes().style).includes(
      'background-color: blue;',
    )
  })

  test('size', async () => {
    const wrapper = mount(
      h(Slider, {
        modelValue: 50,
        thumbSize: '48px',
        trackSize: '20px',
      }),
    )

    expect(wrapper.find('.sar-slider__track').attributes().style).includes(
      'height: 20px;',
    )
    expect(wrapper.find('.sar-slider__thumb').attributes().style).includes(
      'width: 48px; height: 48px;',
    )
  })

  test('readonly', async () => {
    const wrapper = mount(
      h(Slider, {
        modelValue: 50,
        readonly: true,
      }),
    )

    expect(
      wrapper.find('.sar-slider.sar-slider_readonly').exists(),
    ).toBeTruthy()
  })

  test('disabled', async () => {
    const wrapper = mount(
      h(Slider, {
        modelValue: 50,
        disabled: true,
      }),
    )

    expect(
      wrapper.find('.sar-slider.sar-slider_disabled').exists(),
    ).toBeTruthy()
  })

  test('slot', async () => {
    const wrapper = mount(
      h(
        Slider,
        {
          modelValue: 50,
          disabled: true,
        },
        {
          'end-thumb'() {
            return h('div', { class: 'content' }, '内容')
          },
        },
      ),
    )

    expect(wrapper.find('.sar-slider__thumb-container .content').text()).toBe(
      '内容',
    )
  })
})
