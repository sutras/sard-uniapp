import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Input from '../input.vue'

describe('Input', () => {
  test('create', async () => {
    const wrapper = mount(
      h(Input, {
        modelValue: '输入框内容',
      }),
    )

    expect(
      wrapper.find('.sar-input .sar-input__content').find('input').element
        .value,
    ).toBe('输入框内容')
  })

  test('style', async () => {
    const wrapper = mount(
      h(Input, {
        modelValue: '输入框内容',
        borderless: true,
      }),
    )

    expect(wrapper.find('.sar-input').classes()).includes(
      'sar-input_borderless',
    )
  })

  test('type', async () => {
    const wrapper = mount(
      h(Input, {
        modelValue: '输入框内容',
        type: 'idcard',
      }),
    )

    expect(wrapper.find('.sar-input input').attributes().type).toBe('idcard')
  })

  test('clearable', async () => {
    const wrapper = mount(
      h(Input, {
        modelValue: '输入框内容',
        clearable: true,
      }),
    )

    expect(wrapper.find('.sar-input').find('input').element.value).toBe(
      '输入框内容',
    )

    await wrapper.find('.sar-input__clear').trigger('click')

    expect(wrapper.find('.sar-input').find('input').element.value).toBe('')
  })

  test('showClearOnlyFocus', async () => {
    const wrapper = mount(
      h(Input, {
        modelValue: '输入框内容',
        clearable: true,
        showClearOnlyFocus: true,
      }),
    )

    expect(
      wrapper
        .find('.sar-input__clear')
        .attributes()
        .style.includes('display: none'),
    ).toBeTruthy()

    await wrapper.find('.sar-input input').trigger('focus')

    expect(
      wrapper
        .find('.sar-input__clear')
        .attributes()
        .style?.includes('display: none'),
    ).toBeFalsy()
  })

  test('disabled', async () => {
    const wrapper = mount(
      h(Input, {
        modelValue: '输入框内容',
        disabled: true,
      }),
    )

    expect(wrapper.find('.sar-input').classes()).includes('sar-input_disabled')
    expect(wrapper.find('.sar-input input').attributes()).toHaveProperty(
      'disabled',
    )
  })

  test('readonly', async () => {
    const wrapper = mount(
      h(Input, {
        modelValue: '输入框内容',
        readonly: true,
      }),
    )

    expect(wrapper.find('.sar-input').classes()).includes('sar-input_readonly')
    expect(wrapper.find('.sar-input input').attributes()).toHaveProperty(
      'disabled',
    )
  })

  test('slot', async () => {
    const wrapper = mount(
      h(
        Input,
        {
          modelValue: '输入框内容',
        },
        {
          prepend() {
            return '前置插槽'
          },
          append() {
            return '后置插槽'
          },
        },
      ),
    )

    expect(wrapper.find('.sar-input__prepend').text()).toBe('前置插槽')
    expect(wrapper.find('.sar-input__append').text()).toBe('后置插槽')
  })

  test('inlaid', async () => {
    const wrapper = mount(
      h(Input, {
        modelValue: '输入框内容',
        inlaid: true,
      }),
    )

    expect(wrapper.find('.sar-input').classes()).includes('sar-input_inlaid')
  })

  test('textarea', async () => {
    const wrapper = mount(
      h(Input, {
        modelValue: '输入框内容',
        type: 'textarea',
        autoHeight: true,
        minHeight: '200px',
      }),
    )

    expect(wrapper.find('.sar-input textarea').attributes()).toHaveProperty(
      'auto-height',
    )
    expect(wrapper.find('.sar-input textarea').attributes().style).includes(
      'min-height: 200px',
    )
  })

  test('textarea', async () => {
    const wrapper = mount(
      h(Input, {
        modelValue: '输入框内容',
        type: 'textarea',
        showCount: true,
        maxlength: 100,
      }),
    )

    expect(wrapper.find('.sar-input__count').text()).include('100')
  })
})
