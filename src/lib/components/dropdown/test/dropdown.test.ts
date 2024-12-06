import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, ref } from 'vue'

import Dropdown from '../dropdown.vue'
import DropdownItem from '../../dropdown-item/dropdown-item.vue'

const options1 = [
  {
    label: '距离优先',
    value: '1',
  },
  {
    label: '速度优先',
    value: '2',
  },
  {
    label: '评分优先',
    value: '3',
  },
]
const options2 = [
  {
    label: '30分钟内',
    value: '1',
  },
  {
    label: '40分钟内',
    value: '2',
  },
  {
    label: '50分钟内',
    value: '3',
  },
]

describe('Dropdown', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(Dropdown, null, () => [
        h(DropdownItem, {
          options: options1,
          modelValue: '1',
        }),
        h(DropdownItem, {
          options: options2,
          modelValue: '1',
        }),
      ]),
    )

    await Promise.resolve()

    expect(
      wrapper.findAll('.sar-dropdown-item__value').map((item) => item.text()),
    ).toEqual(['距离优先', '30分钟内'])

    await wrapper.find('.sar-dropdown-item').trigger('click')

    expect(wrapper.find('.sar-dropdown-item__option_active').text()).toBe(
      '距离优先',
    )

    await wrapper.find('.sar-list-item:nth-child(2)').trigger('click')

    expect(
      wrapper.findAll('.sar-dropdown-item__value').map((item) => item.text()),
    ).toEqual(['速度优先', '30分钟内'])

    expect(wrapper.find('.sar-dropdown-item__option_active').text()).toBe(
      '速度优先',
    )
  })

  test('label', async () => {
    const wrapper = mount(
      h(Dropdown, null, () => [
        h(DropdownItem, {
          label: '排序',
          options: options1,
          modelValue: '1',
        }),
        h(DropdownItem, {
          label: '速度',
          options: options2,
          modelValue: '1',
        }),
      ]),
    )

    expect(
      wrapper.findAll('.sar-dropdown-item__label').map((item) => item.text()),
    ).toEqual(['排序', '速度'])
  })

  test('placeholder', async () => {
    const modelValue = ref()

    const wrapper = mount(
      h(Dropdown, null, () => [
        h(DropdownItem, {
          modelValue: modelValue,
          placeholder: '排序',
          options: options1,
        }),
        h(DropdownItem, {
          placeholder: '配送时间',
          options: options2,
        }),
      ]),
    )

    expect(
      wrapper
        .findAll('.sar-dropdown-item__placeholder')
        .map((item) => item.text()),
    ).toEqual(['排序', '配送时间'])

    modelValue.value = '1'

    await Promise.resolve()

    expect(
      wrapper
        .findAll('.sar-dropdown-item__placeholder')
        .map((item) => item.text()),
    ).toEqual(['配送时间'])

    expect(
      wrapper.findAll('.sar-dropdown-item__value').map((item) => item.text()),
    ).toEqual(['距离优先'])
  })

  test('disabled', async () => {
    const wrapper = mount(
      h(
        Dropdown,
        {
          disabled: true,
        },
        () => [
          h(DropdownItem, {
            options: options1,
            modelValue: '1',
          }),
          h(DropdownItem, {
            options: options2,
            modelValue: '1',
          }),
        ],
      ),
    )

    expect(
      wrapper
        .findAll('.sar-dropdown-item')
        .map((item) => item.classes().includes('sar-dropdown-item_disabled')),
    ).toEqual([true, true])
  })

  test('content', async () => {
    const wrapper = mount(
      h(Dropdown, null, () => [
        h(DropdownItem, {
          options: options1,
          modelValue: '1',
        }),
        h(
          DropdownItem,
          {
            title: '筛选',
          },
          () => h('view', { class: 'content' }, '内容'),
        ),
      ]),
    )

    await wrapper.find('.sar-dropdown-item:last-child').trigger('click')

    await Promise.resolve()

    expect(wrapper.find('.content').exists()).toEqual(true)
  })
})
