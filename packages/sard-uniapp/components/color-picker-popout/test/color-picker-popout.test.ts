import { describe, expect, test } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { h, nextTick } from 'vue'

import ColorPickerPopout from '../color-picker-popout.vue'
import ColorPicker from '../../color-picker/color-picker.vue'
import Popout from '../../popout/popout.vue'
import { defaultColorPickerValue } from '../../../utils'

const emitComponent = (
  wrapper: ReturnType<typeof mount>,
  component: object,
  event: string,
  ...args: any[]
) => {
  ;(wrapper.getComponent(component as never) as VueWrapper).vm.$emit(
    event,
    ...args,
  )
}

describe('ColorPickerPopout', () => {
  test('renders title and color picker when visible', () => {
    const wrapper = mount(
      h(ColorPickerPopout, {
        title: '请选择颜色',
        visible: true,
      }),
    )

    expect(wrapper.find('.sar-popout__title').text()).toBe('请选择颜色')
    expect(wrapper.find('.sar-color-picker').exists()).toBe(true)
  })

  test('emits confirm and committed value after confirming', async () => {
    const wrapper = mount(
      h(ColorPickerPopout, {
        visible: true,
        modelValue: '#FF0000',
      }),
    )

    emitComponent(wrapper, ColorPicker, 'change', '#00FF00')
    await nextTick()

    emitComponent(wrapper, Popout, 'confirm')
    await nextTick()

    expect(wrapper.emitted().confirm?.[0]).toEqual([])
    expect(wrapper.emitted()['update:model-value']?.[0]).toEqual(['#00FF00'])
    expect(wrapper.emitted().change?.[0]).toEqual(['#00FF00'])
  })

  test('falls back to default color when confirming empty binding', async () => {
    const wrapper = mount(
      h(ColorPickerPopout, {
        visible: true,
        modelValue: '',
      }),
    )

    emitComponent(wrapper, ColorPicker, 'change', '')
    await nextTick()

    emitComponent(wrapper, Popout, 'confirm')
    await nextTick()

    expect(wrapper.emitted()['update:model-value']?.[0]).toEqual([
      defaultColorPickerValue,
    ])
    expect(wrapper.emitted().change?.[0]).toEqual([defaultColorPickerValue])
  })

  test('resets pending value after leave when resettable', async () => {
    const wrapper = mount(
      h(ColorPickerPopout, {
        visible: true,
        resettable: true,
        modelValue: '#FF0000',
      }),
    )

    emitComponent(wrapper, ColorPicker, 'change', '#00FF00')
    await nextTick()

    expect(wrapper.getComponent(ColorPicker).props('modelValue')).toBe(
      '#00FF00',
    )

    emitComponent(wrapper, Popout, 'visible-hook', 'after-leave')
    await nextTick()

    expect(wrapper.getComponent(ColorPicker).props('modelValue')).toBe(
      '#FF0000',
    )
  })
})
