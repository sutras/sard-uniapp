import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Alert from '../../alert/alert.vue'

describe('Alert', () => {
  test('basic', async () => {
    const wrapper = mount(h(Alert, null, () => '这是警告提示'))

    expect(wrapper.find('.sar-alert').text()).toBe('这是警告提示')
  })

  test('type', async () => {
    const wrapper = mount(h(Alert, null, () => '这是警告提示'))

    expect(wrapper.find('.sar-alert').text()).toBe('这是警告提示')

    await wrapper.setProps({
      type: 'success',
    })
    expect(wrapper.find('.sar-alert.sar-alert_success').text()).toBe(
      '这是警告提示',
    )

    await wrapper.setProps({
      type: 'warning',
    })
    expect(wrapper.find('.sar-alert.sar-alert_warning').text()).toBe(
      '这是警告提示',
    )

    await wrapper.setProps({
      type: 'danger',
    })
    expect(wrapper.find('.sar-alert.sar-alert_danger').text()).toBe(
      '这是警告提示',
    )

    await wrapper.setProps({
      type: 'primary',
    })
    expect(wrapper.find('.sar-alert.sar-alert_primary').text()).toBe(
      '这是警告提示',
    )
  })

  test('color', async () => {
    const wrapper = mount(
      h(
        Alert,
        {
          color: 'red',
          background: 'green',
        },
        () => '这是警告提示',
      ),
    )
    const style = wrapper.attributes().style
    expect(style).toContain('color: red')
    expect(style).toContain('background: green')
  })

  test('showIcon', async () => {
    const wrapper = mount(
      h(
        Alert,
        {
          showIcon: true,
        },
        () => '这是警告提示',
      ),
    )

    expect(wrapper.find('.sar-alert__icon').exists()).toBe(true)
  })

  test('closable', async () => {
    const wrapper = mount(
      h(
        Alert,
        {
          closable: true,
        },
        () => '这是警告提示',
      ),
    )

    expect(wrapper.find('.sar-alert__close').exists()).toBe(true)

    await wrapper.find('.sar-alert__close').trigger('click')
    expect(wrapper.emitted('close')).not.toBeUndefined()
    expect(wrapper.find('.sar-alert').exists()).toBeFalsy()
  })
})
