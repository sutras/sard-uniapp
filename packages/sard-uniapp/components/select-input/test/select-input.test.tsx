import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import { getRegionData, mapCities } from 'region-data'

const regionData = getRegionData()

import SelectOption from '../../select-option/select-option.vue'
import SelectInput from '../../select-input/select-input.vue'
import { ref } from 'vue'
import { sleep } from '../../../utils'

describe('SelectInput', () => {
  test('Basic', async () => {
    const value = ref<number>()

    const wrapper = mount(() => (
      <SelectInput
        modelValue={value}
        options={regionData}
        optionKeys={{ label: 'name', value: 'code', children: '' }}
        visible={true}
      />
    ))

    value.value = 440000
    await sleep(0)

    expect(wrapper.find('.sar-popout-input').find('input').element.value).toBe(
      '广东省',
    )

    value.value = 120000
    await sleep(0)

    expect(wrapper.find('.sar-popout-input').find('input').element.value).toBe(
      '天津市',
    )
  })

  test('Slot', async () => {
    const value = ref<number>()

    const wrapper = mount(() => (
      <SelectInput
        modelValue={value}
        options={regionData}
        optionKeys={{ label: 'name', value: 'code', children: '' }}
        visible={true}
      >
        {regionData.map((item) => {
          return (
            <SelectOption key={item.code} label={item.name} value={item.code}>
              {{
                default() {
                  return 'custom'
                },
              }}
            </SelectOption>
          )
        })}
      </SelectInput>
    ))

    expect(
      wrapper
        .findAll('.sar-select-option')
        .every((item) => item.text() === 'custom'),
    ).toBeTruthy()
  })

  test('Multiple', async () => {
    const value = ref<number[]>()

    const wrapper = mount(
      <SelectInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code', children: '' }}
        multiple
        showToolbar
        modelValue={value}
        maxLabels={3}
        visible={true}
      />,
    )

    value.value = [440000, 450000]
    await sleep(0)

    expect(
      wrapper.find('.sar-popout-input').find('textarea').element.value,
    ).toBe('广东省, 广西壮族自治区')

    await wrapper
      .find('.sar-select__toolbar button:last-child')
      .trigger('click')

    await wrapper.find('.sar-popout__footer button').trigger('click')

    expect(
      wrapper.find('.sar-popout-input').find('textarea').element.value,
    ).toBe('北京市, 天津市, 河北省, +28')

    await wrapper.setProps({ maxLabels: 5 })

    expect(
      wrapper.find('.sar-popout-input').find('textarea').element.value,
    ).toBe('北京市, 天津市, 河北省, 山西省, 内蒙古自治区, +26')
  })

  test('Remote', async () => {
    // server
    const cities = Object.entries(mapCities).map(([code, name]) => ({
      code: +code,
      name,
    }))

    const mockRequest = async (query: string, page = 1, pageSize = 10) => {
      const filteredData = query
        ? cities.filter((item) => item.name.includes(query))
        : cities

      const offset = (page - 1) * pageSize
      return {
        list: filteredData.slice(offset, offset + pageSize),
        total: filteredData.length,
      }
    }

    // client
    const value = ref<number>()

    const listData = ref<
      {
        code: number
        name: string
      }[]
    >([])

    const remoteMethod = async (
      query: string,
      page: number,
      isRefresh: boolean,
    ) => {
      return mockRequest(query, page).then(({ list = [], total = 0 }) => {
        if (isRefresh) {
          listData.value = [...list]
        } else {
          listData.value = [...listData.value, ...list]
        }
        return listData.value.length >= total || list.length === 0
      })
    }

    const wrapper = mount(() => (
      <SelectInput
        v-model={value}
        filterable
        filterPlaceholder="请输入过滤关键词"
        placeholder="请选择"
        remote
        remoteMethod={remoteMethod}
        options={listData.value}
        optionKeys={{ label: 'name', value: 'code', children: '' }}
        threshold={0}
        visible={true}
      />
    ))

    value.value = 440100
    await sleep(0)

    expect(wrapper.find('.sar-popout-input').find('input').element.value).toBe(
      '440100',
    )

    await wrapper.find('.sar-select__search input').trigger('input', {
      detail: {
        value: '广',
      },
    })
    await sleep(0)

    expect(wrapper.find('.sar-popout-input').find('input').element.value).toBe(
      '广州市',
    )
  })
})
