import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Space from '../space.vue'
import Button from '../../button/button.vue'
import { SpaceProps } from '../common'

function renderSpace(props?: SpaceProps) {
  return (
    <Space {...props}>
      <Button>按钮</Button>
      <Button>按钮</Button>
      <Button>按钮</Button>
    </Space>
  )
}

describe('Space', () => {
  test('basic', async () => {
    const wrapper = mount(renderSpace())

    expect(wrapper.find('.sar-space').classes()).includes(
      'sar-space_horizontal',
    )
    expect(wrapper.find('.sar-space').classes()).includes('sar-space_middle')
  })

  test('direction', async () => {
    const wrapper = mount(renderSpace({ direction: 'vertical' }))

    expect(wrapper.find('.sar-space').classes()).includes('sar-space_vertical')
  })

  test('size', async () => {
    const wrapper = mount(renderSpace({ size: 'small' }))

    expect(wrapper.find('.sar-space').classes()).includes('sar-space_small')
    await wrapper.setProps({ size: 'middle' })
    expect(wrapper.find('.sar-space').classes()).includes('sar-space_middle')
    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.sar-space').classes()).includes('sar-space_large')
  })

  test('custom-size', async () => {
    const wrapper = mount(renderSpace({ size: '100px' }))

    expect(wrapper.find('.sar-space').attributes().style).includes(
      'gap: 100px;',
    )
  })

  test('wrap', async () => {
    const wrapper = mount(renderSpace({ wrap: true }))

    expect(wrapper.find('.sar-space').classes()).includes('sar-space_wrap')
  })

  test('align', async () => {
    const wrapper = mount(renderSpace({ align: 'start' }))

    expect(wrapper.find('.sar-space').attributes().style).includes(
      'align-items: flex-start;',
    )

    await wrapper.setProps({ align: 'center' })
    expect(wrapper.find('.sar-space').attributes().style).includes(
      'align-items: center;',
    )

    await wrapper.setProps({ align: 'end' })
    expect(wrapper.find('.sar-space').attributes().style).includes(
      'align-items: flex-end;',
    )

    await wrapper.setProps({ align: 'baseline' })
    expect(wrapper.find('.sar-space').attributes().style).includes(
      'align-items: baseline;',
    )
  })
})
