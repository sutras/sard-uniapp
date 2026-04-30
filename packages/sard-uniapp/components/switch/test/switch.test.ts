import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Switch from '../switch.vue'
import { sleep } from '../../../utils'

describe('Switch', () => {
  test('basic', async () => {
    const wrapper = mount(h(Switch, {}))

    expect(wrapper.find('.sar-switch').classes()).not.includes(
      'sar-switch_checked',
    )
    await wrapper.find('.sar-switch').trigger('click')
    expect(wrapper.find('.sar-switch').classes()).includes('sar-switch_checked')
  })

  test('size', async () => {
    const wrapper = mount(
      h(Switch, {
        size: '48px',
      }),
    )

    expect(wrapper.find('.sar-switch').attributes().style).includes(
      '--sar-switch-size: 48px;',
    )
  })

  test('color', async () => {
    const wrapper = mount(
      h(Switch, {
        modelValue: true,
        checkedColor: 'red',
      }),
    )

    expect(wrapper.find('.sar-switch').attributes().style).includes(
      'background-color: red;',
    )
  })

  test('value', async () => {
    const wrapper = mount(
      h(Switch, {
        checkedValue: 'on',
        uncheckedValue: 'off',
      }),
    )

    await wrapper.find('.sar-switch').trigger('click')
    await wrapper.find('.sar-switch').trigger('click')

    expect(wrapper.emitted()['update:model-value']).toEqual([['on'], ['off']])
  })

  test('readonly', async () => {
    const wrapper = mount(
      h(Switch, {
        readonly: true,
      }),
    )

    expect(
      wrapper.find('.sar-switch.sar-switch_readonly').exists(),
    ).toBeTruthy()
  })

  test('disabled', async () => {
    const wrapper = mount(
      h(Switch, {
        disabled: true,
      }),
    )

    expect(
      wrapper.find('.sar-switch.sar-switch_disabled').exists(),
    ).toBeTruthy()
  })

  test('loading', async () => {
    const wrapper = mount(
      h(Switch, {
        beforeUpdate: () => {
          return new Promise((resolve) => {
            setTimeout(resolve, 0)
          })
        },
      }),
    )

    await wrapper.find('.sar-switch').trigger('click')
    expect(wrapper.find('.sar-switch').classes()).not.includes(
      'sar-switch_checked',
    )
    await sleep(1)
    expect(wrapper.find('.sar-switch').classes()).includes('sar-switch_checked')
  })

  test('text props', async () => {
    const wrapper = mount(
      h(Switch, {
        checkedText: '开',
        uncheckedText: '关',
      }),
    )

    expect(wrapper.find('.sar-switch__text-checked').text()).toBe('开')
    expect(wrapper.find('.sar-switch__text-unchecked').text()).toBe('关')
  })

  test('text slots', async () => {
    const wrapper = mount(
      h(
        Switch,
        {},
        {
          'checked-text': () => h('span', { class: 'checked-slot' }, '已开启'),
          'unchecked-text': () =>
            h('span', { class: 'unchecked-slot' }, '已关闭'),
        },
      ),
    )

    expect(wrapper.find('.sar-switch__text-checked .checked-slot').text()).toBe(
      '已开启',
    )
    expect(
      wrapper.find('.sar-switch__text-unchecked .unchecked-slot').text(),
    ).toBe('已关闭')
  })
})
