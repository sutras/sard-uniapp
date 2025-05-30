import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Steps from '../steps.vue'
import Step from '../../step/step.vue'

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

    expect(wrapper.findAll('.sar-step')[0].classes()).includes(
      'sar-step_process',
    )
    expect(wrapper.findAll('.sar-step')[1].classes()).includes('sar-step_wait')
    expect(wrapper.findAll('.sar-step')[2].classes()).includes('sar-step_wait')

    await wrapper.setProps({
      current: 1,
    })

    expect(wrapper.findAll('.sar-step')[0].classes()).includes(
      'sar-step_finish',
    )
    expect(wrapper.findAll('.sar-step')[1].classes()).includes(
      'sar-step_process',
    )
    expect(wrapper.findAll('.sar-step')[2].classes()).includes('sar-step_wait')

    await wrapper.setProps({
      current: 2,
    })

    expect(wrapper.findAll('.sar-step')[0].classes()).includes(
      'sar-step_finish',
    )
    expect(wrapper.findAll('.sar-step')[1].classes()).includes(
      'sar-step_finish',
    )
    expect(wrapper.findAll('.sar-step')[2].classes()).includes(
      'sar-step_process',
    )

    await wrapper.setProps({
      current: 3,
    })

    expect(wrapper.findAll('.sar-step')[0].classes()).includes(
      'sar-step_finish',
    )
    expect(wrapper.findAll('.sar-step')[1].classes()).includes(
      'sar-step_finish',
    )
    expect(wrapper.findAll('.sar-step')[2].classes()).includes(
      'sar-step_finish',
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

    expect(
      wrapper
        .findAll('.sar-step')
        .every((item) => item.classes().includes('sar-step_center')),
    ).toBeTruthy()
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

    expect(
      wrapper
        .findAll('.sar-step')
        .every((item) => item.classes().includes('sar-step_vertical')),
    ).toBeTruthy()
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
      wrapper
        .findAll('.sar-step')
        .every(
          (item) =>
            item.classes().includes('sar-step_center') &&
            item.classes().includes('sar-step_vertical'),
        ),
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
      wrapper.find('.sar-step_finish .sari.sari-star-fill').exists(),
    ).toBeTruthy()
    expect(
      wrapper.find('.sar-step_process .sari.sari-star').exists(),
    ).toBeTruthy()
    expect(
      wrapper.find('.sar-step_wait .sari.sari-star-wait').exists(),
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

    expect(wrapper.findAll('.sar-step')[1].classes()).includes(
      'sar-step_finish',
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

    expect(wrapper.findAll('.sar-step')[0].classes()).includes(
      'sar-step_finish',
    )
    expect(wrapper.findAll('.sar-step')[1].classes()).includes(
      'sar-step_process',
    )
    expect(wrapper.findAll('.sar-step')[2].classes()).includes('sar-step_wait')
    expect(wrapper.findAll('.sar-step')[3].classes()).includes(
      'sar-step_finish',
    )
    expect(wrapper.findAll('.sar-step')[4].classes()).includes('sar-step_error')
  })

  test('Step', async () => {
    const wrapper = mount(
      h(
        Steps,
        {
          current: 1,
        },
        () =>
          itemList.map((item, index) =>
            h(
              Step,
              { index },
              {
                default: () => h('div', { class: 'custom-title' }, item.name),
                icon: () => h('div', { class: 'custom-icon' }, item.name),
              },
            ),
          ),
      ),
    )

    expect(
      wrapper.find('.sar-step_process .sar-step__body .custom-title').text(),
    ).toBe('步骤2')

    expect(
      wrapper.find('.sar-step_process .sar-step__header .custom-icon').text(),
    ).toBe('步骤2')
  })
})
