import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Avatar from '../avatar.vue'

describe('Avatar', () => {
  test('create', async () => {
    const wrapper = mount(h(Avatar))
    expect(wrapper.classes()).toContain('sar-avatar_circle')
  })

  test('shape', async () => {
    const wrapper = mount(
      h(Avatar, {
        shape: 'square',
      }),
    )
    expect(wrapper.classes()).toContain('sar-avatar_square')
  })

  test('size', async () => {
    const wrapper = mount(
      h(Avatar, {
        size: '96px',
        iconSize: '48px',
      }),
    )
    const style = wrapper.attributes().style
    expect(style).toContain('width: 96px')
    expect(style).toContain('height: 96px')
    expect(style).toContain('font-size: 48px')
  })

  test('CustomStyle', async () => {
    const wrapper = mount(
      h(Avatar, {
        background: 'red',
        color: 'white',
      }),
    )
    const style = wrapper.attributes().style
    expect(style).toContain('background: red')
    expect(style).toContain('color: white')
  })

  test('image', async () => {
    const wrapper = mount(
      h(Avatar, {
        src: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg',
      }),
    )

    expect(wrapper.find('image').classes()).toContain('sar-avatar__image')
  })

  test('CustomContent', async () => {
    const wrapper = mount(
      h(Avatar, null, {
        extra: () => 'extra',
      }),
    )

    expect(wrapper.text()).toBe('extra')
  })
})
