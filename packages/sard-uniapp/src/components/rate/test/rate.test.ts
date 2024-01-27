import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Rate from '../rate.vue'

describe('Rate', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(Rate, {
        modelValue: 3,
        count: 5,
      }),
    )

    expect(wrapper.findAll('.sar-rate__item').length).toBe(5)
    expect(wrapper.findAll('.sar-rate__star')[2].attributes().style).includes(
      'width: 100%;',
    )
    expect(wrapper.findAll('.sar-rate__star')[3].attributes().style).includes(
      'width: 0%;',
    )
  })

  test('half', async () => {
    const wrapper = mount(
      h(Rate, {
        modelValue: 2.5,
        count: 5,
      }),
    )

    expect(wrapper.findAll('.sar-rate__star')[2].attributes().style).includes(
      'width: 50%;',
    )
    expect(wrapper.findAll('.sar-rate__star')[3].attributes().style).includes(
      'width: 0%;',
    )
  })

  test('color', async () => {
    const wrapper = mount(
      h(Rate, {
        modelValue: 2.5,
        count: 5,
        voidColor: 'blue',
        color: 'red',
      }),
    )

    expect(wrapper.find('.sar-rate__star-void').attributes().style).includes(
      'color: blue;',
    )
    expect(wrapper.find('.sar-rate__star').attributes().style).includes(
      'color: red;',
    )
  })

  test('color', async () => {
    const wrapper = mount(
      h(Rate, {
        modelValue: 2.5,
        count: 5,
        voidColor: 'blue',
        color: 'red',
      }),
    )

    expect(wrapper.find('.sar-rate__star-void').attributes().style).includes(
      'color: blue;',
    )
    expect(wrapper.find('.sar-rate__star').attributes().style).includes(
      'color: red;',
    )
  })

  test('size', async () => {
    const wrapper = mount(
      h(Rate, {
        modelValue: 3,
        count: 5,
        size: '60px',
        gap: '40px',
      }),
    )

    expect(wrapper.find('.sar-rate__content').attributes().style).includes(
      'gap: 40px;',
    )
    expect(wrapper.find('.sar-rate__item').attributes().style).includes(
      'font-size: 60px;',
    )
  })

  test('count', async () => {
    const wrapper = mount(
      h(Rate, {
        modelValue: 3,
        count: 10,
      }),
    )

    expect(wrapper.findAll('.sar-rate__item').length).toBe(10)
  })

  test('clearable', async () => {
    const wrapper = mount(
      h(Rate, {
        modelValue: 3,
        clearable: true,
      }),
    )

    expect(wrapper.findAll('.sar-rate__star')[2].attributes().style).include(
      'width: 100%;',
    )
    expect(wrapper.findAll('.sar-rate__star')[3].attributes().style).include(
      'width: 0%;',
    )

    await wrapper.findAll('.sar-rate__item')[2].trigger('click')

    expect(
      wrapper
        .findAll('.sar-rate__star')
        .map((item) => item.attributes().style)
        .every((item) => item.includes('width: 0%;')),
    ).toBeTruthy()
  })

  test('readonly', async () => {
    const wrapper = mount(
      h(Rate, {
        modelValue: 3,
        readonly: true,
      }),
    )

    expect(wrapper.find('.sar-rate.sar-rate_readonly').exists()).toBeTruthy()
    expect(wrapper.findAll('.sar-rate__star')[3].attributes().style).include(
      'width: 0%;',
    )

    await wrapper.findAll('.sar-rate__item')[3].trigger('click')

    expect(wrapper.findAll('.sar-rate__star')[3].attributes().style).include(
      'width: 0%;',
    )
  })

  test('disabled', async () => {
    const wrapper = mount(
      h(Rate, {
        modelValue: 3,
        disabled: true,
      }),
    )

    expect(wrapper.find('.sar-rate.sar-rate_disabled').exists()).toBeTruthy()
    expect(wrapper.findAll('.sar-rate__star')[3].attributes().style).include(
      'width: 0%;',
    )

    await wrapper.findAll('.sar-rate__item')[3].trigger('click')
    expect(wrapper.findAll('.sar-rate__star')[3].attributes().style).include(
      'width: 0%;',
    )
  })
})
