import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Tag from '../tag.vue'

const themes = ['primary', 'secondary', 'success', 'info', 'warning', 'danger']

describe('Tag', () => {
  test('basic', async () => {
    const wrapper = mount(h(Tag, {}))

    expect(wrapper.find('.sar-tag.sar-tag_default').exists()).toBeTruthy()

    for (const theme of themes) {
      await wrapper.setProps({
        theme,
      })
      expect(wrapper.find(`.sar-tag.sar-tag_${theme}`).exists()).toBeTruthy()
    }
  })

  test('plain', async () => {
    const wrapper = mount(
      h(Tag, {
        plain: true,
      }),
    )

    for (const theme of themes) {
      await wrapper.setProps({
        theme,
      })
      expect(
        wrapper.find(`.sar-tag.sar-tag_plain.sar-tag_${theme}-plain`).exists(),
      ).toBeTruthy()
    }
  })

  test('round', async () => {
    const wrapper = mount(
      h(Tag, {
        round: true,
      }),
    )

    expect(wrapper.find(`.sar-tag.sar-tag_round`).exists()).toBeTruthy()
  })

  test('mark', async () => {
    const wrapper = mount(
      h(Tag, {
        mark: true,
      }),
    )

    expect(wrapper.find(`.sar-tag.sar-tag_mark`).exists()).toBeTruthy()
  })

  test('color', async () => {
    const wrapper = mount(
      h(Tag, {
        color: 'red',
        textColor: 'blue',
      }),
    )

    expect(wrapper.find(`.sar-tag`).attributes().style).includes(
      'color: blue; background-color: red;',
    )

    await wrapper.setProps({
      plain: true,
    })

    expect(wrapper.find(`.sar-tag`).attributes().style).includes(
      'color: red; border-color: red;',
    )
  })

  test('closable', async () => {
    const wrapper = mount(
      h(Tag, {
        closable: true,
      }),
    )

    expect(wrapper.find(`.sar-tag .sar-tag__close`).exists()).toBeTruthy()
  })
})
