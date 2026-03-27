import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Compact from '../compact.vue'
import Button from '../../button/button.vue'
import Input from '../../input/input.vue'
import DatetimePickerInput from '../../datetime-picker-input/datetime-picker-input.vue'

describe('Compact', () => {
  test('basic', async () => {
    const wrapper = mount(
      <Compact>
        <Button>按钮</Button>
        <Input placeholder="请输入" />
        <DatetimePickerInput placeholder="请输入" />
      </Compact>,
    )

    expect(wrapper.find('.sar-button_compact-horizontal').exists()).toBeTruthy()
    expect(wrapper.find('.sar-input_compact-horizontal').exists()).toBeTruthy()
  })

  test('direction', async () => {
    const wrapper = mount(
      <Compact direction="vertical">
        <Button>按钮</Button>
        <Input placeholder="请输入" />
        <DatetimePickerInput placeholder="请输入" />
      </Compact>,
    )

    expect(wrapper.find('.sar-button_compact-vertical').exists()).toBeTruthy()
    expect(wrapper.find('.sar-input_compact-vertical').exists()).toBeTruthy()
  })

  test('block', async () => {
    const wrapper = mount(
      <Compact block>
        <Button>按钮</Button>
        <Input placeholder="请输入" />
        <DatetimePickerInput placeholder="请输入" />
      </Compact>,
    )

    expect(wrapper.find('.sar-compact_block').exists()).toBeTruthy()
  })
})
