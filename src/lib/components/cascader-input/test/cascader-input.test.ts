import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import CascaderInput from '../cascader-input.vue'
import { getRegionData } from 'region-data'

describe('CascaderInput', () => {
  const regionData = getRegionData()

  test('basic', async () => {
    const wrapper = mount(
      h(CascaderInput, {
        options: regionData,
        fieldKeys: { label: 'name', value: 'code' },
        modelValue: 440111,
      }),
    )

    expect(wrapper.find('.sar-input').find('input').element.value).toBe(
      '广东省/广州市/白云区',
    )
    expect(wrapper.find('.sar-cascader').exists()).toBe(false)

    await wrapper.setProps({
      visible: true,
    })
    expect(wrapper.find('.sar-cascader').exists()).toBe(true)

    await wrapper.setProps({
      modelValue: 410305,
    })
    expect(wrapper.find('.sar-input').find('input').element.value).toBe(
      '河南省/洛阳市/涧西区',
    )

    await wrapper.setProps({
      modelValue: undefined,
    })
    expect(wrapper.find('.sar-input').find('input').element.value).toBe('')
  })
})
