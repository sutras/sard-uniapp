import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Checkbox from '../checkbox.vue'
import CheckboxGroup from '../../checkbox-group/checkbox-group.vue'
import Icon from '../../icon/icon.vue'

describe('Checkbox', () => {
  test('create', async () => {
    const wrapper = mount(
      h(Checkbox, {
        label: '复选框',
      }),
    )

    expect(wrapper.find('.sar-checkbox__icon').exists()).toBe(true)
    expect(wrapper.find('.sar-checkbox__label').text()).toBe('复选框')
  })

  test('disabled', async () => {
    const wrapper = mount(
      h(Checkbox, {
        label: '复选框',
        disabled: true,
      }),
    )

    expect(wrapper.find('.sar-checkbox').classes()).toContain(
      'sar-checkbox_disabled',
    )
  })

  test('readonly', async () => {
    const wrapper = mount(
      h(Checkbox, {
        label: '复选框',
        readonly: true,
      }),
    )

    expect(wrapper.find('.sar-checkbox').classes()).toContain(
      'sar-checkbox_readonly',
    )
  })

  test('size', async () => {
    const wrapper = mount(
      h(Checkbox, {
        label: '复选框',
        size: '48px',
      }),
    )

    expect(wrapper.find('.sar-checkbox__icon').attributes().style).toContain(
      'font-size: 48px',
    )
  })

  test('color', async () => {
    const wrapper = mount(
      h(Checkbox, {
        label: '复选框',
        checked: true,
        checkedColor: 'red',
      }),
    )

    expect(wrapper.find('.sar-checkbox__icon').attributes().style).toContain(
      'color: red',
    )
  })

  test('type', async () => {
    const wrapper = mount(
      h(Checkbox, {
        label: '复选框',
        checked: true,
        type: 'circle',
      }),
    )

    expect(wrapper.find('.sar-icon').classes()).toContain(
      'sari-check-circle-fill',
    )
  })

  test('customIcon', async () => {
    const wrapper = mount(
      h(
        Checkbox,
        {
          label: '复选框',
          checked: true,
        },
        {
          icon: ({ checked }: any) =>
            h(Icon, {
              name: checked ? 'record-circle' : 'circle',
            }),
        },
      ),
    )

    expect(wrapper.find('.sar-icon').classes()).toContain('sari-record-circle')

    await wrapper.trigger('click')

    expect(wrapper.find('.sar-icon').classes()).toContain('sari-circle')
  })

  test('checkoutGroup', async () => {
    const wrapper = mount(
      h(
        CheckboxGroup,
        {
          modelValue: ['option1'],
        },
        () => [
          h(Checkbox, {
            value: 'option1',
            label: '选项1',
          }),
          h(Checkbox, {
            value: 'option2',
            label: '选项2',
          }),
          h(Checkbox, {
            value: 'option3',
            label: '选项3',
          }),
        ],
      ),
    )

    expect(
      wrapper
        .findAll('.sar-checkbox')
        .map((item) => Number(item.classes().includes('sar-checkbox_checked'))),
    ).toEqual([1, 0, 0])

    await wrapper.find('.sar-checkbox:nth-child(2)').trigger('click')

    expect(
      wrapper
        .findAll('.sar-checkbox')
        .map((item) => Number(item.classes().includes('sar-checkbox_checked'))),
    ).toEqual([1, 1, 0])

    await wrapper.find('.sar-checkbox:nth-child(2)').trigger('click')

    expect(
      wrapper
        .findAll('.sar-checkbox')
        .map((item) => Number(item.classes().includes('sar-checkbox_checked'))),
    ).toEqual([1, 0, 0])

    await wrapper.find('.sar-checkbox:nth-child(1)').trigger('click')

    expect(
      wrapper
        .findAll('.sar-checkbox')
        .map((item) => Number(item.classes().includes('sar-checkbox_checked'))),
    ).toEqual([0, 0, 0])
  })

  test('direction', async () => {
    const wrapper = mount(
      h(
        CheckboxGroup,
        {
          direction: 'horizontal',
        },
        () => [
          h(Checkbox, {
            value: 'option1',
            label: '选项1',
          }),
          h(Checkbox, {
            value: 'option2',
            label: '选项2',
          }),
          h(Checkbox, {
            value: 'option3',
            label: '选项3',
          }),
        ],
      ),
    )

    expect(wrapper.find('.sar-checkbox-group').classes()).toContain(
      'sar-checkbox-group_horizontal',
    )
  })

  test('customSlot', async () => {
    const options = [
      {
        value: 'option1',
        label: '选项1',
      },
      {
        value: 'option2',
        label: '选项2',
      },
      {
        value: 'option3',
        label: '选项3',
      },
    ]

    const wrapper = mount(
      h(CheckboxGroup, null, {
        custom: ({ toggle }) =>
          options.map((option) => {
            return h(
              'div',
              {
                class: 'box',
                onClick() {
                  toggle(option.value)
                },
              },
              [
                h(Checkbox, {
                  readonly: true,
                  value: option.value,
                }),
                option.label,
              ],
            )
          }),
      }),
    )

    await wrapper.find('.box:nth-child(1)').trigger('click')

    expect(
      wrapper
        .findAll('.sar-checkbox')
        .map((item) => Number(item.classes().includes('sar-checkbox_checked'))),
    ).toEqual([1, 0, 0])

    await wrapper.find('.box:nth-child(2)').trigger('click')

    expect(
      wrapper
        .findAll('.sar-checkbox')
        .map((item) => Number(item.classes().includes('sar-checkbox_checked'))),
    ).toEqual([1, 1, 0])

    await wrapper.find('.box:nth-child(2)').trigger('click')

    expect(
      wrapper
        .findAll('.sar-checkbox')
        .map((item) => Number(item.classes().includes('sar-checkbox_checked'))),
    ).toEqual([1, 0, 0])

    await wrapper.find('.box:nth-child(1)').trigger('click')

    expect(
      wrapper
        .findAll('.sar-checkbox')
        .map((item) => Number(item.classes().includes('sar-checkbox_checked'))),
    ).toEqual([0, 0, 0])
  })
})
