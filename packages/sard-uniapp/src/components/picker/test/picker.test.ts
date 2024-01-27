import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import { getRegionData } from 'region-data'

import Picker from '../picker.vue'

describe('PasswordInput', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(Picker, {
        columns: ['北京市', '天津市', '河北省', '山东省'],
      }),
    )

    expect(wrapper.find('.sar-picker__item:nth-child(3)').text()).toBe('河北省')
  })

  test('object', async () => {
    const wrapper = mount(
      h(Picker, {
        columns: [
          {
            code: 110000,
            name: '北京市',
          },
          {
            code: 120000,
            name: '天津市',
          },
          {
            code: 130000,
            name: '河北省',
          },
          {
            code: 140000,
            name: '山东省',
          },
        ],
        optionKeys: { label: 'name', value: 'code' },
      }),
    )

    expect(wrapper.find('.sar-picker__item:nth-child(3)').text()).toBe('河北省')
  })

  test('multiple', async () => {
    const wrapper = mount(
      h(Picker, {
        columns: [
          Array(10)
            .fill(0)
            .map((_, index) => 2000 + index + '年'),
          Array(12)
            .fill(0)
            .map((_, index) => 1 + index + '月'),
        ],
      }),
    )

    expect(wrapper.find('.sar-picker__item:nth-child(1)').text()).toBe('2000年')
    expect(wrapper.find('.sar-picker__item:last-child').text()).toBe('2009年')
    expect(
      wrapper
        .find(
          '.sar-picker__picker-view > div:last-child .sar-picker__item:nth-child(1)',
        )
        .text(),
    ).toBe('1月')
    expect(
      wrapper
        .find(
          '.sar-picker__picker-view > div:last-child .sar-picker__item:last-child',
        )
        .text(),
    ).toBe('12月')
  })

  test('objectMultiple', async () => {
    const wrapper = mount(
      h(Picker, {
        columns: [
          Array(10)
            .fill(0)
            .map((_, index) => ({
              value: 2000 + index,
              label: 2000 + index + '年',
            })),
          Array(12)
            .fill(0)
            .map((_, index) => ({
              value: 1 + index,
              label: 1 + index + '月',
            })),
        ],
      }),
    )

    expect(wrapper.find('.sar-picker__item:nth-child(1)').text()).toBe('2000年')
    expect(wrapper.find('.sar-picker__item:last-child').text()).toBe('2009年')
    expect(
      wrapper
        .find(
          '.sar-picker__picker-view > div:last-child .sar-picker__item:nth-child(1)',
        )
        .text(),
    ).toBe('1月')
    expect(
      wrapper
        .find(
          '.sar-picker__picker-view > div:last-child .sar-picker__item:last-child',
        )
        .text(),
    ).toBe('12月')
  })

  test('cascaded', async () => {
    const regionData = getRegionData()

    const wrapper = mount(
      h(Picker, {
        columns: regionData,
        optionKeys: { label: 'name', value: 'code' },
      }),
    )

    expect(
      wrapper
        .find(
          '.sar-picker__picker-view > div:nth-child(1) .sar-picker__item:nth-child(1)',
        )
        .text(),
    ).toBe('北京市')

    expect(
      wrapper
        .find(
          '.sar-picker__picker-view > div:nth-child(2) .sar-picker__item:nth-child(1)',
        )
        .text(),
    ).toBe('北京市')

    expect(
      wrapper
        .find(
          '.sar-picker__picker-view > div:nth-child(3) .sar-picker__item:nth-child(1)',
        )
        .text(),
    ).toBe('东城区')
  })
})
