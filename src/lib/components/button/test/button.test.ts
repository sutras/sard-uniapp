import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Button from '../button.vue'

describe('Button', () => {
  test('create', async () => {
    const wrapper = mount(h(Button, () => '默认'))

    expect(wrapper.find('.sar-button').text() === '默认').toBe(true)
    const classes = wrapper.find('.sar-button').classes()
    expect(classes).toContain('sar-button_medium')
    expect(classes).toContain('sar-button_default')
    expect(classes).toContain('sar-button_default-primary')
  })

  test('type', async () => {
    const wrapper = mount(
      h(
        Button,
        {
          type: 'pale',
        },
        () => '默认',
      ),
    )

    const classes = wrapper.find('.sar-button').classes()
    expect(classes).toContain('sar-button_pale')
    expect(classes).toContain('sar-button_pale-primary')
  })

  test('theme', async () => {
    const wrapper = mount(
      h(
        Button,
        {
          theme: 'success',
        },
        () => '默认',
      ),
    )

    const classes = wrapper.find('.sar-button').classes()
    expect(classes).toContain('sar-button_default')
    expect(classes).toContain('sar-button_default-success')
  })

  test('color', async () => {
    const wrapper = mount(
      h(
        Button,
        {
          color: 'red',
          background: 'green',
        },
        () => '默认',
      ),
    )

    const style = wrapper.find('.sar-button').attributes().style
    expect(style).toContain('background: green')
    expect(style).toContain('color: red')
  })

  test('round', async () => {
    const wrapper = mount(
      h(
        Button,
        {
          round: true,
        },
        () => '默认',
      ),
    )

    expect(wrapper.find('.sar-button').classes()).toContain('sar-button_round')
  })

  test('disabled', async () => {
    const wrapper = mount(
      h(
        Button,
        {
          disabled: true,
        },
        () => '默认',
      ),
    )

    expect(wrapper.find('.sar-button').classes()).toContain(
      'sar-button_disabled',
    )
  })

  test('size', async () => {
    const wrapper = mount(
      h(
        Button,
        {
          size: 'large',
        },
        () => '默认',
      ),
    )

    expect(wrapper.find('.sar-button').classes()).toContain('sar-button_large')
  })

  test('loading', async () => {
    const wrapper = mount(
      h(
        Button,
        {
          loading: true,
        },
        () => '默认',
      ),
    )

    expect(wrapper.find('.sar-loading').exists()).toBe(true)
  })

  test('block', async () => {
    const wrapper = mount(
      h(
        Button,
        {
          block: true,
        },
        () => '默认',
      ),
    )

    const classes = wrapper.find('.sar-button').classes()
    expect(classes).toContain('sar-button_block')
  })

  test('inline', async () => {
    const wrapper = mount(
      h(
        Button,
        {
          block: false,
          inline: false,
        },
        () => '默认',
      ),
    )

    expect(
      wrapper.find('.sar-button').classes().includes('sar-button_block'),
    ).toBeFalsy()

    await wrapper.setProps({
      block: false,
      inline: true,
    })
    expect(
      wrapper.find('.sar-button').classes().includes('sar-button_block'),
    ).toBeFalsy()

    await wrapper.setProps({
      block: true,
      inline: false,
    })
    expect(
      wrapper.find('.sar-button').classes().includes('sar-button_block'),
    ).toBeTruthy()

    await wrapper.setProps({
      block: true,
      inline: true,
    })
    expect(
      wrapper.find('.sar-button').classes().includes('sar-button_block'),
    ).toBeFalsy()
  })
})
