import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Steps from '../steps.vue'

const itemList = [
  {
    name: '步骤1',
  },
  {
    name: '步骤2',
  },
  {
    name: '步骤3',
  },
]

describe('Steps', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(Steps, {
        current: 0,
        itemList,
      }),
    )

    expect(wrapper.findAll('.sar-steps__step')[0].classes()).includes(
      'sar-steps__step_process',
    )
    expect(wrapper.findAll('.sar-steps__step')[1].classes()).includes(
      'sar-steps__step_wait',
    )
    expect(wrapper.findAll('.sar-steps__step')[2].classes()).includes(
      'sar-steps__step_wait',
    )

    await wrapper.setProps({
      current: 1,
    })

    expect(wrapper.findAll('.sar-steps__step')[0].classes()).includes(
      'sar-steps__step_finish',
    )
    expect(wrapper.findAll('.sar-steps__step')[1].classes()).includes(
      'sar-steps__step_process',
    )
    expect(wrapper.findAll('.sar-steps__step')[2].classes()).includes(
      'sar-steps__step_wait',
    )

    await wrapper.setProps({
      current: 2,
    })

    expect(wrapper.findAll('.sar-steps__step')[0].classes()).includes(
      'sar-steps__step_finish',
    )
    expect(wrapper.findAll('.sar-steps__step')[1].classes()).includes(
      'sar-steps__step_finish',
    )
    expect(wrapper.findAll('.sar-steps__step')[2].classes()).includes(
      'sar-steps__step_process',
    )

    await wrapper.setProps({
      current: 3,
    })

    expect(wrapper.findAll('.sar-steps__step')[0].classes()).includes(
      'sar-steps__step_finish',
    )
    expect(wrapper.findAll('.sar-steps__step')[1].classes()).includes(
      'sar-steps__step_finish',
    )
    expect(wrapper.findAll('.sar-steps__step')[2].classes()).includes(
      'sar-steps__step_finish',
    )
  })

  test('center', async () => {
    const wrapper = mount(
      h(Steps, {
        current: 1,
        center: true,
        itemList,
      }),
    )

    expect(wrapper.find('.sar-steps.sar-steps_center').exists()).toBeTruthy()
  })

  test('vertical', async () => {
    const wrapper = mount(
      h(Steps, {
        current: 1,
        direction: 'vertical',
        itemList,
      }),
    )

    expect(wrapper.find('.sar-steps.sar-steps_vertical').exists()).toBeTruthy()
  })

  test('verticalCenter', async () => {
    const wrapper = mount(
      h(Steps, {
        current: 1,
        direction: 'vertical',
        center: true,
        itemList,
      }),
    )

    expect(
      wrapper.find('.sar-steps.sar-steps_vertical.sar-steps_center').exists(),
    ).toBeTruthy()
  })

  test('icon', async () => {
    const wrapper = mount(
      h(Steps, {
        current: 1,
        itemList,
        finishIcon: 'star-fill',
        processIcon: 'star',
        waitIcon: 'star-wait',
        iconSize: '40px',
      }),
    )

    expect(
      wrapper.find('.sar-steps__step_finish .sari.sari-star-fill').exists(),
    ).toBeTruthy()
    expect(
      wrapper.find('.sar-steps__step_process .sari.sari-star').exists(),
    ).toBeTruthy()
    expect(
      wrapper.find('.sar-steps__step_wait .sari.sari-star-wait').exists(),
    ).toBeTruthy()
    expect(wrapper.find('.sar-icon').attributes().style).includes(
      'font-size: 40px;',
    )
  })

  test('status', async () => {
    const wrapper = mount(
      h(Steps, {
        current: 1,
        itemList,
        status: 'finish',
      }),
    )

    expect(wrapper.findAll('.sar-steps__step')[1].classes()).includes(
      'sar-steps__step_finish',
    )
  })

  test('errorStatus', async () => {
    const wrapper = mount(
      h(Steps, {
        current: 1,
        itemList: [
          {
            name: '第1节',
            description: '已学习',
            status: 'finish',
          },
          {
            name: '第2节',
            description: '学习中',
            status: 'process',
          },
          {
            name: '第3节',
            description: '未学习',
            status: 'wait',
          },
          {
            name: '第4节',
            description: '已学习',
            status: 'finish',
          },
          {
            name: '第5节',
            description: '出错了',
            status: 'error',
          },
        ],
      }),
    )

    expect(wrapper.findAll('.sar-steps__step')[0].classes()).includes(
      'sar-steps__step_finish',
    )
    expect(wrapper.findAll('.sar-steps__step')[1].classes()).includes(
      'sar-steps__step_process',
    )
    expect(wrapper.findAll('.sar-steps__step')[2].classes()).includes(
      'sar-steps__step_wait',
    )
    expect(wrapper.findAll('.sar-steps__step')[3].classes()).includes(
      'sar-steps__step_finish',
    )
    expect(wrapper.findAll('.sar-steps__step')[4].classes()).includes(
      'sar-steps__step_error',
    )
  })
})
