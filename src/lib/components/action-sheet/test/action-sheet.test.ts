import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import ActionSheet from '../action-sheet.vue'

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
})
