import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Segmented from '../segmented.vue'
import SegmentedItem from '../../segmented-item/segmented-item.vue'

const options = ['Daily', 'Weekly', 'Monthly', 'Yearly']

const options2 = [
  {
    label: '首页',
    value: 'home',
    icon: 'house-door-fill',
    iconFamily: 'demo-icons',
  },
  {
    label: '购物车',
    value: 'card',
    icon: 'cart-fill',
    iconFamily: 'demo-icons',
  },
  {
    label: '消息',
    value: 'message',
    icon: 'chat-dots-fill',
    iconFamily: 'demo-icons',
  },
]

describe('Segmented', () => {
  test('Basic', async () => {
    const wrapper = mount(
      <Segmented modelValue="Weekly" options={options}></Segmented>,
    )

    expect(wrapper.find('.sar-segmented__pointer').attributes().style).includes(
      'width: 25%',
    )
    expect(wrapper.find('.sar-segmented__pointer').attributes().style).includes(
      'translateX(100%)',
    )

    await wrapper.setProps({
      modelValue: 'Monthly',
    })
    expect(wrapper.find('.sar-segmented__pointer').attributes().style).includes(
      'translateX(200%)',
    )
  })

  test('Direction', async () => {
    const wrapper = mount(
      <Segmented
        modelValue="Weekly"
        options={options}
        direction="vertical"
      ></Segmented>,
    )

    expect(wrapper.find('.sar-segmented').classes()).includes(
      'sar-segmented_vertical',
    )
  })

  test('Disabled', async () => {
    const wrapper = mount(
      <Segmented
        modelValue="Weekly"
        options={options}
        direction="vertical"
        disabled
      ></Segmented>,
    )

    expect(
      wrapper
        .findAll('.sar-segmented-item')
        .every((item) =>
          item.classes().includes('sar-segmented-item_disabled'),
        ),
    ).toBeTruthy()
  })

  test('Shape', async () => {
    const wrapper = mount(
      <Segmented
        modelValue="Weekly"
        options={options}
        shape="round"
      ></Segmented>,
    )

    expect(wrapper.find('.sar-segmented').classes()).includes(
      'sar-segmented_round',
    )
  })

  test('Size', async () => {
    const wrapper = mount(
      <Segmented
        modelValue="Weekly"
        options={options}
        size="large"
      ></Segmented>,
    )

    expect(wrapper.find('.sar-segmented').classes()).includes(
      'sar-segmented_large',
    )
  })

  test('Icon', async () => {
    const wrapper = mount(
      <Segmented
        modelValue="Weekly"
        options={options2}
        size="large"
      ></Segmented>,
    )

    expect(
      wrapper
        .find(
          '.sar-segmented-item .sar-segmented-item__icon .demo-icons-house-door-fill',
        )
        .exists(),
    ).toBeTruthy()
  })

  test('Custom', async () => {
    const wrapper = mount(
      <Segmented modelValue="Weekly" options={options2} size="large">
        {options2.map((option) => (
          <SegmentedItem>自定义{option.label}</SegmentedItem>
        ))}
      </Segmented>,
    )

    expect(wrapper.find('.sar-segmented-item:nth-child(2)').text()).toBe(
      '自定义首页',
    )
    expect(wrapper.find('.sar-segmented-item:nth-child(3)').text()).toBe(
      '自定义购物车',
    )
    expect(wrapper.find('.sar-segmented-item:nth-child(4)').text()).toBe(
      '自定义消息',
    )
  })
})
