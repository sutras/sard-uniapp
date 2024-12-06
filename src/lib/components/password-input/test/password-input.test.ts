import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import PasswordInput from '../password-input.vue'

describe('PasswordInput', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(PasswordInput, {
        modelValue: '123456',
      }),
    )

    expect(wrapper.findAll('.sar-password-input__ciphertext').length).toBe(6)
  })

  test('underline', async () => {
    const wrapper = mount(
      h(PasswordInput, {
        modelValue: '123456',
        type: 'underline',
      }),
    )

    expect(
      wrapper.find('.sar-password-input.sar-password-input_underline').exists(),
    ).toBeTruthy()
  })

  test('gap', async () => {
    const wrapper = mount(
      h(PasswordInput, {
        modelValue: '123456',
        gap: '0',
      }),
    )

    expect(
      wrapper
        .find('.sar-password-input.sar-password-input_tight-border')
        .attributes().style,
    ).includes('gap: 0;')
  })

  test('gap', async () => {
    const wrapper = mount(
      h(PasswordInput, {
        modelValue: '123456',
        plainText: true,
      }),
    )

    expect(
      wrapper
        .findAll('.sar-password-input__plaintext')
        .map((item) => item.text())
        .join(''),
    ).toBe('123456')
  })

  test('readonly', async () => {
    const wrapper = mount(
      h(PasswordInput, {
        modelValue: '123456',
        readonly: true,
      }),
    )

    expect(
      wrapper.find('.sar-password-input.sar-password-input_readonly').exists(),
    ).toBeTruthy()
    expect(
      wrapper.find('.sar-password-input__input').attributes(),
    ).toHaveProperty('disabled')
  })

  test('disabled', async () => {
    const wrapper = mount(
      h(PasswordInput, {
        modelValue: '123456',
        disabled: true,
      }),
    )

    expect(
      wrapper.find('.sar-password-input.sar-password-input_disabled').exists(),
    ).toBeTruthy()
    expect(
      wrapper.find('.sar-password-input__input').attributes(),
    ).toHaveProperty('disabled')
  })

  test('customKeyboard', async () => {
    const wrapper = mount(
      h(PasswordInput, {
        modelValue: '123456',
        customKeyboard: true,
      }),
    )

    expect(wrapper.find('.sar-password-input__input').exists()).toBeFalsy()
  })
})
