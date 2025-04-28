import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { h } from 'vue'
import Divider from '../divider.vue'

describe('Divider', () => {
  test('basic', async () => {
    const wrapper = mount(h(Divider))

    expect(wrapper.classes().includes('sar-divider_only-line')).toBeTruthy()
  })

  test('Text', async () => {
    const wrapper = mount(h(Divider, null, () => '分割线'))
    expect(wrapper.text()).toBe('分割线')
  })

  test('Position', async () => {
    const wrapper = mount(
      h(
        Divider,
        {
          position: 'left',
        },
        () => '分割线',
      ),
    )
    expect(wrapper.classes().includes('sar-divider_left')).toBeTruthy()

    await wrapper.setProps({
      position: 'right',
    })
    expect(wrapper.classes().includes('sar-divider_right')).toBeTruthy()
  })

  test('Type', async () => {
    const wrapper = mount(h(Divider, {}, () => '分割线'))

    expect(
      wrapper.attributes().style.includes('border-style: solid;'),
    ).toBeTruthy()

    await wrapper.setProps({
      type: 'dashed',
    })

    expect(
      wrapper.attributes().style.includes('border-style: dashed;'),
    ).toBeTruthy()
  })

  test('Vertical', async () => {
    const wrapper = mount(
      h(
        Divider,
        {
          vertical: true,
        },
        () => '分割线',
      ),
    )

    expect(wrapper.classes().includes('sar-divider_vertical')).toBeTruthy()
  })

  test('Hairline', async () => {
    const wrapper = mount(h(Divider, null, () => '分割线'))

    expect(wrapper.classes().includes('sar-divider_hairline')).toBeTruthy()

    await wrapper.setProps({
      hairline: false,
    })
    expect(wrapper.classes().includes('sar-divider_hairline')).toBeFalsy()
  })
})
