import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Sidebar from '../sidebar.vue'
import SidebarItem from '../../sidebar-item/sidebar-item.vue'
import { sleep } from '../../../utils'

describe('Sidebar', () => {
  test('Basic', async () => {
    const wrapper = mount(
      <Sidebar current={'2'}>
        <SidebarItem name="1" title="标签名称" />
        <SidebarItem name="2" disabled title="标签名称" />
        <SidebarItem name="3" title="标签名称" />
      </Sidebar>,
    )

    // default current
    expect(wrapper.find('.sar-sidebar-item:nth-child(2)').classes()).includes(
      'sar-sidebar-item_current',
    )
    // disabled
    expect(wrapper.find('.sar-sidebar-item:nth-child(2)').classes()).includes(
      'sar-sidebar-item_disabled',
    )

    await sleep(15)

    // event
    await wrapper.find('.sar-sidebar-item:nth-child(3)').trigger('click')
    expect(wrapper.emitted('update:current')![0][0]).toBe('3')
    expect(wrapper.emitted('change')![0][0]).toBe('3')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.find('.sar-sidebar-item:nth-child(3)').classes()).includes(
      'sar-sidebar-item_current',
    )

    // set props
    await wrapper.setProps({
      current: '1',
    })
    expect(wrapper.find('.sar-sidebar-item:nth-child(1)').classes()).includes(
      'sar-sidebar-item_current',
    )

    // round
    await wrapper.setProps({
      round: true,
    })
    expect(
      wrapper
        .find('.sar-sidebar-item:nth-child(1)')
        .find('.sar-sidebar-item__round-top'),
    ).toBeDefined()
    expect(
      wrapper
        .find('.sar-sidebar-item:nth-child(1)')
        .find('.sar-sidebar-item__round-bottom'),
    ).toBeDefined()

    // line
    await wrapper.setProps({
      line: true,
    })
    expect(
      wrapper
        .find('.sar-sidebar-item:nth-child(1)')
        .find('.sar-sidebar-item__line'),
    ).toBeDefined()
  })
})
