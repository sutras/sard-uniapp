import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Indexes from '../indexes.vue'
import IndexesAnchor from '../../indexes-anchor/indexes-anchor.vue'
import List from '../../list/list.vue'
import ListItem from '../../list-item/list-item.vue'

const indexList = [
  {
    anchor: 'A',
    provinces: ['安徽省', '澳门特别行政区'],
  },
  {
    anchor: 'B',
    provinces: ['北京市'],
  },
  {
    anchor: 'C',
    provinces: ['重庆市'],
  },
  {
    anchor: 'F',
    provinces: ['福建省'],
  },
  {
    anchor: 'G',
    provinces: ['甘肃省', '广东省', '广西壮族自治区', '贵州省'],
  },
  {
    anchor: 'H',
    provinces: ['海南省', '河北省', '河南省', '黑龙江省', '湖北省', '湖南省'],
  },
  {
    anchor: 'J',
    provinces: ['吉林省', '江苏省', '江西省'],
  },
  {
    anchor: 'L',
    provinces: ['辽宁省'],
  },
  {
    anchor: 'N',
    provinces: ['内蒙古自治区', '宁夏回族自治区'],
  },
  {
    anchor: 'Q',
    provinces: ['青海省'],
  },
  {
    anchor: 'S',
    provinces: ['山东省', '山西省', '陕西省', '上海市', '四川省'],
  },
  {
    anchor: 'T',
    provinces: ['台湾省', '天津市'],
  },
  {
    anchor: 'X',
    provinces: ['西藏自治区', '香港特别行政区', '新疆维吾尔自治区'],
  },
  {
    anchor: 'Y',
    provinces: ['云南省'],
  },
  {
    anchor: 'Z',
    provinces: ['浙江省'],
  },
]

describe('Indexes', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(
        Indexes,
        {
          current: 'Q',
          rootStyle: 'height: 640px',
        },
        () =>
          indexList.map((item, i) => {
            return h(
              'div',
              {
                key: i,
              },
              {
                default() {
                  return [
                    h(IndexesAnchor, {
                      name: item.anchor,
                    }),
                    h(List, null, () =>
                      item.provinces.map((province, j) => {
                        return h(ListItem, {
                          key: j,
                          title: province,
                        })
                      }),
                    ),
                  ]
                },
              },
            )
          }),
      ),
    )

    await new Promise((resolve) => setTimeout(resolve, 50))

    const QIndex = indexList.findIndex((item) => item.anchor === 'Q')
    expect(wrapper.findAll('.sar-indexes__anchor')[QIndex].text()).toBe('Q')

    expect(
      wrapper
        .find(`.sar-indexes__scroll-view > view > div:nth-child(${QIndex + 1})`)
        .find('.sar-list-item__title')
        .text(),
    ).toBe('青海省')
    expect(wrapper.find('.sar-indexes__nav-item_active').text()).toBe('Q')

    await wrapper.setProps({
      current: 'G',
    })

    expect(wrapper.find('.sar-indexes__nav-item_active').text()).toBe('G')
  })
})
