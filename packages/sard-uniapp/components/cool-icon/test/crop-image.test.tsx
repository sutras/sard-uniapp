import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import CoolIcon from '../cool-icon.vue'
import Icon from '../../icon/icon.vue'

describe('CoolIcon', () => {
  test('visible', async () => {
    const wrapper = mount(
      <CoolIcon shape="oval" background="#ffa726" color="#fff">
        <Icon name="image" />
      </CoolIcon>,
    )

    expect(wrapper.find('.sar-cool-icon').classes()).includes(
      'sar-cool-icon_oval',
    )
    expect(wrapper.find('.sar-cool-icon').attributes().style).includes(
      'color: #fff;',
    )
    expect(wrapper.find('.sar-cool-icon__bg').attributes().style).includes(
      'background: #ffa726;',
    )
    expect(
      wrapper.find('.sar-cool-icon__icon').find('.sar-icon').exists(),
    ).toBeTruthy()

    await wrapper.setProps({
      shape: 'circle',
    })
    expect(wrapper.find('.sar-cool-icon').classes()).includes(
      'sar-cool-icon_circle',
    )

    await wrapper.setProps({
      shape: 'flower',
    })
    expect(wrapper.find('.sar-cool-icon').classes()).includes(
      'sar-cool-icon_flower',
    )

    await wrapper.setProps({
      shape: 'square',
    })
    expect(wrapper.find('.sar-cool-icon').classes()).includes(
      'sar-cool-icon_square',
    )

    await wrapper.setProps({
      shape: 'triangle',
    })
    expect(wrapper.find('.sar-cool-icon').classes()).includes(
      'sar-cool-icon_triangle',
    )

    await wrapper.setProps({
      size: '80px',
      iconSize: '48px',
    })
    expect(wrapper.find('.sar-cool-icon').attributes().style).includes(
      'font-size: 48px;',
    )
    expect(wrapper.find('.sar-cool-icon').attributes().style).includes(
      'width: 80px; height: 80px;',
    )
  })
})
