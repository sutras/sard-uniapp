import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import SwiperDot from '../swiper-dot.vue'

const list = [
  {
    title: 'title1',
  },
  {
    title: 'title2',
  },
  {
    title: 'title3',
  },
]

const typeList = ['dot', 'dot-bar', 'index', 'title', 'fraction']

describe('SwiperDot', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(SwiperDot, {
        list,
        field: 'title',
        current: 1,
      }),
    )

    for (const t of typeList) {
      await wrapper.setProps({
        type: t,
      })
      expect(
        wrapper.find(`.sar-swiper-dot.sar-swiper-dot_${t}`).exists(),
      ).toBeTruthy()

      if (t === 'dot' || t === 'dot-bar') {
        expect(wrapper.findAll('.sar-swiper-dot__item')[1].classes()).includes(
          'sar-swiper-dot__item_active',
        )
      }

      if (t === 'index') {
        expect(wrapper.findAll('.sar-swiper-dot__item')[1].text()).toBe('2')
      }

      if (t === 'title') {
        expect(wrapper.find('.sar-swiper-dot__item').text()).toBe('2/3 title2')
      }

      if (t === 'sar-swiper-dot_fraction') {
        expect(wrapper.find('.sar-swiper-dot_fraction').text()).toBe('2/3')
      }
    }
  })
})
