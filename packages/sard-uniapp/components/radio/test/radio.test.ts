import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Radio from '../radio.vue'
import RadioGroup from '../../radio-group/radio-group.vue'

describe('Radio', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(
        RadioGroup,
        {
          modelValue: 'option2',
        },
        () => [
          h(Radio, { value: 'option1' }, () => '选项1'),
          h(Radio, { value: 'option2' }, () => '选项2'),
        ],
      ),
    )

    expect(wrapper.findAll('.sar-radio')[1].classes()).includes(
      'sar-radio_checked',
    )
    expect(wrapper.findAll('.sar-radio__label')[1].text()).toBe('选项2')
  })

  test('horizontal', async () => {
    const wrapper = mount(
      h(
        RadioGroup,
        {
          direction: 'horizontal',
        },
        () => [
          h(Radio, { value: 'option1' }, () => '选项1'),
          h(Radio, { value: 'option2' }, () => '选项2'),
        ],
      ),
    )

    expect(
      wrapper.find('.sar-radio-group.sar-radio-group_horizontal').exists(),
    ).toBeTruthy()
  })

  test('readonly', async () => {
    const wrapper = mount(
      h(
        RadioGroup,
        {
          readonly: true,
        },
        () => [
          h(Radio, { value: 'option1' }, () => '选项1'),
          h(Radio, { value: 'option2' }, () => '选项2'),
        ],
      ),
    )

    expect(wrapper.find('.sar-radio.sar-radio_readonly').exists()).toBeTruthy()
  })

  test('disabled', async () => {
    const wrapper = mount(
      h(
        RadioGroup,
        {
          disabled: true,
        },
        () => [
          h(Radio, { value: 'option1' }, () => '选项1'),
          h(Radio, { value: 'option2' }, () => '选项2'),
        ],
      ),
    )

    expect(wrapper.find('.sar-radio.sar-radio_disabled').exists()).toBeTruthy()
  })

  test('size', async () => {
    const wrapper = mount(
      h(
        RadioGroup,
        {
          size: '48px',
        },
        () => [
          h(Radio, { value: 'option1' }, () => '选项1'),
          h(Radio, { value: 'option2' }, () => '选项2'),
        ],
      ),
    )

    expect(wrapper.find('.sar-radio__icon').attributes().style).includes(
      'font-size: 48px;',
    )
  })

  test('color', async () => {
    const wrapper = mount(
      h(
        RadioGroup,
        {
          modelValue: 'option2',
          checkedColor: 'red',
        },
        () => [
          h(Radio, { value: 'option1' }, () => '选项1'),
          h(Radio, { value: 'option2' }, () => '选项2'),
        ],
      ),
    )

    expect(
      wrapper.find('.sar-radio__icon_checked').attributes().style,
    ).includes('color: red;')
  })

  test('record', async () => {
    const wrapper = mount(
      h(
        RadioGroup,
        {
          modelValue: 'option2',
          type: 'record',
        },
        () => [
          h(Radio, { value: 'option1' }, () => '选项1'),
          h(Radio, { value: 'option2' }, () => '选项2'),
        ],
      ),
    )

    expect(
      wrapper.find('.sar-radio__icon_checked .sari-record-circle').exists(),
    ).toBeTruthy()
  })

  test('iconSlot', async () => {
    const wrapper = mount(
      h(
        RadioGroup,
        {
          modelValue: 'option2',
          type: 'record',
        },
        () => [
          h(Radio, { value: 'option1' }, () => '选项1'),
          h(
            Radio,
            { value: 'option2' },
            {
              default: () => '选项2',
              icon: () => 'icon',
            },
          ),
        ],
      ),
    )

    expect(wrapper.find('.sar-radio__icon_checked').text()).toBe('icon')
  })
})
