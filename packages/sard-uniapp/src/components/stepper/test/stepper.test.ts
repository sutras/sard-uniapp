import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Stepper from '../stepper.vue'

describe('Stepper', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(Stepper, {
        placeholder: '数量',
      }),
    )

    expect(wrapper.find('input').element.value).toBe('')

    await wrapper.find('.sar-stepper__button_increase').trigger('click')
    expect(wrapper.find('input').element.value).toBe('1')

    await wrapper.find('.sar-stepper__button_decrease').trigger('click')
    expect(wrapper.find('input').element.value).toBe('0')

    await wrapper.setProps({
      modelValue: 3,
    })
    expect(wrapper.find('input').element.value).toBe('3')
  })

  test('minMax', async () => {
    const wrapper = mount(
      h(Stepper, {
        placeholder: '数量',
        min: 0,
        max: 3,
      }),
    )

    await wrapper.find('.sar-stepper__button_increase').trigger('click')
    await wrapper.find('.sar-stepper__button_increase').trigger('click')
    await wrapper.find('.sar-stepper__button_increase').trigger('click')
    expect(wrapper.find('input').element.value).toBe('3')
    await wrapper.find('.sar-stepper__button_increase').trigger('click')
    expect(wrapper.find('input').element.value).toBe('3')

    await wrapper.find('.sar-stepper__button_decrease').trigger('click')
    await wrapper.find('.sar-stepper__button_decrease').trigger('click')
    await wrapper.find('.sar-stepper__button_decrease').trigger('click')
    expect(wrapper.find('input').element.value).toBe('0')
    await wrapper.find('.sar-stepper__button_decrease').trigger('click')
    expect(wrapper.find('input').element.value).toBe('0')
  })

  test('step', async () => {
    const wrapper = mount(
      h(Stepper, {
        placeholder: '数量',
        step: 5,
      }),
    )

    await wrapper.find('.sar-stepper__button_increase').trigger('click')
    expect(wrapper.find('input').element.value).toBe('5')
    await wrapper.find('.sar-stepper__button_increase').trigger('click')
    expect(wrapper.find('input').element.value).toBe('10')

    await wrapper.setProps({
      modelValue: 12,
    })
    expect(wrapper.find('input').element.value).toBe('12')

    await wrapper.find('.sar-stepper__button_decrease').trigger('click')
    expect(wrapper.find('input').element.value).toBe('7')
    await wrapper.find('.sar-stepper__button_decrease').trigger('click')
    expect(wrapper.find('input').element.value).toBe('2')
    await wrapper.find('.sar-stepper__button_decrease').trigger('click')
    expect(wrapper.find('input').element.value).toBe('-3')
  })

  test('readonly', async () => {
    const wrapper = mount(
      h(Stepper, {
        placeholder: '数量',
        readonly: true,
      }),
    )

    expect(
      wrapper.find('.sar-stepper.sar-stepper_readonly').exists(),
    ).toBeTruthy()
    expect(wrapper.find('input').attributes()).toHaveProperty('disabled')
  })

  test('disabled', async () => {
    const wrapper = mount(
      h(Stepper, {
        placeholder: '数量',
        disabled: true,
      }),
    )

    expect(
      wrapper.find('.sar-stepper.sar-stepper_disabled').exists(),
    ).toBeTruthy()
    expect(wrapper.find('input').attributes()).toHaveProperty('disabled')
  })

  test('size', async () => {
    const wrapper = mount(
      h(Stepper, {
        placeholder: '数量',
        size: 'small',
      }),
    )

    expect(wrapper.find('.sar-stepper.sar-stepper_small').exists()).toBeTruthy()
  })
})
