import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import ActionSheet from '../action-sheet.vue'
import ActionSheetAgent from '../../action-sheet-agent/action-sheet-agent.vue'
import { actionSheet } from '../../action-sheet-agent/index'
import { sleep } from '../../../utils'

describe('ActionSheet', () => {
  test('create', async () => {
    const wrapper = mount(
      h(ActionSheet, {
        visible: true,
        description: '描述',
        cancel: '取消',
        itemList: [
          {
            name: '选项1',
            color: 'red',
          },
          {
            name: '选项2',
            description: '描述信息',
            disabled: true,
          },
          {
            name: '选项3',
            loading: true,
          },
        ],
      }),
    )
    expect(wrapper.find('.sar-action-sheet__description').exists()).toBe(true)
    expect(wrapper.find('.sar-action-sheet__cancel').exists()).toBe(true)
    expect(
      wrapper.find('.sar-action-sheet__item').attributes().style,
    ).toContain('color: red;')
    expect(wrapper.findAll('.sar-action-sheet__item')[1].classes()).toContain(
      'sar-action-sheet__item_disabled',
    )
    expect(wrapper.findAll('.sar-action-sheet__item')[2].classes()).toContain(
      'sar-action-sheet__item_loading',
    )
  })

  test('imperative', async () => {
    const wrapper = mount(h(ActionSheetAgent, {}))

    actionSheet({
      description: '请选择',
      itemList: [{ name: '选项1' }, { name: '选项2' }, { name: '选项3' }],
      showCancel: true,
      duration: 0,
    })

    await Promise.resolve()

    expect(wrapper.find('.sar-action-sheet__description').text()).toBe('请选择')
    expect(wrapper.find('.sar-action-sheet__cancel').text()).toBe('取消')

    actionSheet.hide()

    await sleep(50)

    expect(wrapper.find('.sar-popup').attributes().style).includes(
      'display: none;',
    )
  })
})
