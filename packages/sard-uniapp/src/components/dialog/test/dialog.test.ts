import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Dialog from '../dialog.vue'
import DialogAgent from '../../dialog-agent/dialog-agent.vue'
import { dialog } from '../../dialog-agent/index'

describe('Dialog', () => {
  test('basic', async () => {
    const wrapper = mount(h(DialogAgent, {}))

    dialog.alert({
      title: '提示',
      message: '此功能暂时无法使用',
    })

    await Promise.resolve()

    expect(wrapper.find('.sar-dialog__title').text()).toBe('提示')
    expect(wrapper.find('.sar-dialog__message').text()).toBe(
      '此功能暂时无法使用',
    )
    expect(wrapper.find('.sar-dialog__footer').text()).toBe('确定')

    dialog.confirm({
      title: '提示',
      message: '此功能暂时无法使用',
    })

    await Promise.resolve()

    expect(wrapper.find('.sar-dialog__footer').text()).toBe('取消确定')
  })

  test('round', async () => {
    const wrapper = mount(h(DialogAgent, {}))

    dialog.confirm({
      title: '提示',
      message: '确定删除？',
      buttonType: 'round',
    })

    await Promise.resolve()

    expect(
      wrapper.findAll('.sar-dialog__footer .sar-button_round').length,
    ).toBe(2)
  })

  test('headed', async () => {
    const wrapper = mount(h(DialogAgent, {}))

    dialog.confirm({
      title: '提示',
      message: '确定删除？',
      headed: false,
    })

    await Promise.resolve()

    expect(wrapper.find('.sar-dialog__header').exists()).toBe(false)

    dialog.confirm({
      title: '提示',
      message: '确定删除？',
      headed: true,
    })

    await Promise.resolve()

    expect(wrapper.find('.sar-dialog__header').exists()).toBe(true)
  })

  test('content', async () => {
    const wrapper = mount(
      h(
        Dialog,
        {
          title: '标题',
        },
        () =>
          h(
            'view',
            {
              class: 'content',
            },
            '内容',
          ),
      ),
    )

    expect(wrapper.find('.content').text()).toBe('内容')
  })
})
