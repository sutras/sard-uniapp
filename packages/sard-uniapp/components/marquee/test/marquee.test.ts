import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Marquee from '../marquee.vue'
import { sleep } from '../../../utils'

const genData = () => {
  return '赵钱孙李周吴郑王'.split('').map((item) => `恭喜${item}**获得丰厚奖品`)
}

describe('Marquee', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(
        Marquee,
        {
          delay: 0,
        },
        () =>
          [...genData(), ...genData()].map((item) => {
            return h('div', {}, item)
          }),
      ),
    )
    await sleep(50)
    expect(wrapper.find('.sar-marquee').exists()).toBe(true)
    expect(wrapper.find('.sar-marquee__wrapper').exists()).toBe(true)
  })

  test('horizontal', async () => {
    const wrapper = mount(
      h(
        Marquee,
        {
          delay: 0,
          direction: 'horizontal',
        },
        () =>
          [...genData(), ...genData()].map((item) => {
            return h('div', {}, item)
          }),
      ),
    )
    await sleep(50)
    expect(wrapper.find('.sar-marquee_horizontal').exists()).toBe(true)
  })
})
