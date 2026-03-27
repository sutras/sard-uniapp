import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { mapCities } from 'region-data'

import { getRegionData } from 'region-data'

const regionData = getRegionData()

import Select from '../select.vue'
import SelectOption from '../../select-option/select-option.vue'
import SelectOptionGroup from '../../select-option-group/select-option-group.vue'
import SelectInput from '../../select-input/select-input.vue'
import { ref } from 'vue'
import { sleep } from '../../../utils'

describe('Select', () => {
  test('Basic', async () => {
    const wrapper = mount(
      <SelectInput modelValue={130000} visible={true}>
        {regionData.map((item) => {
          return (
            <SelectOption
              key={item.code}
              label={item.name}
              value={item.code}
            ></SelectOption>
          )
        })}
      </SelectInput>,
    )

    expect(
      wrapper
        .find('.sar-select-option_selected .sar-select-option__label')
        .text(),
    ).equal('河北省')

    await wrapper.setProps({
      modelValue: 440000,
    })

    expect(
      wrapper
        .find('.sar-select-option_selected .sar-select-option__label')
        .text(),
    ).equal('广东省')
  })

  test('Group', async () => {
    const wrapper = mount(
      <Select modelValue={440100}>
        {regionData.map((group) => {
          return (
            <SelectOptionGroup key={group.code} label={group.name}>
              {group.children.map((item) => {
                return (
                  <SelectOption
                    key={item.code}
                    label={item.name}
                    value={item.code}
                  ></SelectOption>
                )
              })}
            </SelectOptionGroup>
          )
        })}
      </Select>,
    )

    expect(
      wrapper
        .find('.sar-select-option_selected .sar-select-option__label')
        .text(),
    ).equal('广州市')

    expect(
      wrapper
        .find(
          '.sar-select-option-group .sar-select-option-group__content .sar-select-option_selected',
        )
        .text(),
    ).equal('广州市')
  })

  test('Multiple', async () => {
    const wrapper = mount(
      <Select modelValue={[440000, 450000]} multiple>
        {regionData.map((item) => {
          return (
            <SelectOption
              key={item.code}
              label={item.name}
              value={item.code}
            ></SelectOption>
          )
        })}
      </Select>,
    )

    expect(
      wrapper
        .findAll('.sar-select-option_selected .sar-select-option__label')
        .map((item) => item.text())
        .join(','),
    ).equal('广东省,广西壮族自治区')

    await wrapper.setProps({
      modelValue: [540000, 640000],
    })

    expect(
      wrapper
        .findAll('.sar-select-option_selected .sar-select-option__label')
        .map((item) => item.text())
        .join(','),
    ).equal('西藏自治区,宁夏回族自治区')
  })

  test('Toolbar', async () => {
    const wrapper = mount(
      <Select modelValue={[440000, 450000]} multiple showToolbar>
        {regionData.map((item) => {
          return (
            <SelectOption
              key={item.code}
              label={item.name}
              value={item.code}
            ></SelectOption>
          )
        })}
      </Select>,
    )

    expect(wrapper.find('.sar-select__num').html()).include('2')

    await wrapper
      .find('.sar-select__toolbar .sar-button:nth-child(3)')
      .trigger('click')

    expect(wrapper.find('.sar-select__num').html()).include('31')

    await wrapper
      .find('.sar-select__toolbar .sar-button:nth-child(2)')
      .trigger('click')

    expect(wrapper.find('.sar-select__num').html()).include('0')
  })

  test('Disabled', async () => {
    const wrapper = mount(
      <Select>
        {regionData.map((item, i) => {
          return (
            <SelectOption
              key={item.code}
              label={item.name}
              value={item.code}
              disabled={i % 4 === 0}
            ></SelectOption>
          )
        })}
      </Select>,
    )

    expect(
      wrapper
        .findAll('.sar-select-option:nth-child(4n+1)')
        .every((item) => item.classes().includes('sar-select-option_disabled')),
    ).toBeTruthy()
  })

  test('CustomLabel', async () => {
    const wrapper = mount(
      <Select>
        {regionData.map((item) => {
          return (
            <SelectOption key={item.code} label={item.name} value={item.code}>
              {{
                label() {
                  return 'custom'
                },
              }}
            </SelectOption>
          )
        })}
      </Select>,
    )

    expect(
      wrapper
        .findAll('.sar-select-option__label')
        .every((item) => item.text() === 'custom'),
    ).toBeTruthy()
  })

  test('CustomOption', async () => {
    const wrapper = mount(
      <Select>
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
      </Select>,
    )

    expect(
      wrapper
        .findAll('.sar-select-option')
        .every((item) => item.text() === 'custom'),
    ).toBeTruthy()
  })

  test('Filterable', async () => {
    const filteredData = ref(regionData)

    const wrapper = mount(() => (
      <Select
        filterable
        filterPlaceholder="请输入过滤关键词"
        filterMethod={(query: string) => {
          filteredData.value = query
            ? regionData.filter((item) => item.name.includes(query))
            : regionData
        }}
      >
        {filteredData.value.map((item) => {
          return (
            <SelectOption key={item.code} label={item.name} value={item.code} />
          )
        })}
      </Select>
    ))

    expect(wrapper.find('input').attributes().placeholder).toEqual(
      '请输入过滤关键词',
    )

    await wrapper.find('input').trigger('input', {
      detail: {
        value: '广东省',
      },
    })

    expect(wrapper.find('.sar-select-option:first-child').text()).toEqual(
      '广东省',
    )
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
      <Select
        filterable
        filterPlaceholder="请输入过滤关键词"
        remote
        remoteMethod={remoteMethod}
        threshold={0}
      >
        {listData.value.map((item) => {
          return (
            <SelectOption key={item.code} label={item.name} value={item.code} />
          )
        })}
      </Select>
    ))

    await wrapper.find('input').trigger('input', {
      detail: {
        value: '中',
      },
    })
    await sleep(0)

    expect(
      wrapper.findAll('.sar-select-option__label').map((item) => item.text()),
    ).toEqual(['晋中市', '中山市', '巴中市', '汉中市', '中卫市'])

    await wrapper.find('input').trigger('input', {
      detail: {
        value: '南',
      },
    })
    await sleep(0)

    expect(
      wrapper.findAll('.sar-select-option__label').map((item) => item.text()),
    ).toEqual([
      '南京市',
      '南通市',
      '淮南市',
      '南平市',
      '南昌市',
      '济南市',
      '南阳市',
      '南宁市',
      '南充市',
      '黔西南布依族苗族自治州',
    ])

    await wrapper.find('.sar-load-more').trigger('click')

    expect(
      wrapper.findAll('.sar-select-option__label').map((item) => item.text()),
    ).toEqual([
      '南京市',
      '南通市',
      '淮南市',
      '南平市',
      '南昌市',
      '济南市',
      '南阳市',
      '南宁市',
      '南充市',
      '黔西南布依族苗族自治州',
      '黔东南苗族侗族自治州',
      '黔南布依族苗族自治州',
      '山南市',
      '渭南市',
      '陇南市',
      '甘南藏族自治州',
      '黄南藏族自治州',
      '海南藏族自治州',
    ])
  })
})
