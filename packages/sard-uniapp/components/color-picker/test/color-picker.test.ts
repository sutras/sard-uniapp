import { describe, expect, test, vi, afterEach } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { h, nextTick } from 'vue'

import ColorPicker from '../color-picker.vue'
import SarPopover from '../../popover/popover.vue'
import * as domUtils from '../../../utils/dom'

const emitPopoverSelect = (
  wrapper: ReturnType<typeof mount>,
  payload: { value: 'hex' | 'rgb' | 'hsl'; text: string },
) => {
  ;(wrapper.getComponent(SarPopover as never) as VueWrapper).vm.$emit(
    'select',
    payload,
  )
}

const mockTrackRect = (
  rect: Partial<{
    left: number
    top: number
    width: number
    height: number
  }> = {},
) => {
  return vi.spyOn(domUtils, 'getBoundingClientRect').mockResolvedValue({
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    ...rect,
  } as Awaited<ReturnType<typeof domUtils.getBoundingClientRect>>)
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ColorPicker', () => {
  test('shows only sv panel and hue slider by default', () => {
    const wrapper = mount(h(ColorPicker))

    expect(wrapper.findAll('.sar-color-picker__slider-bar')).toHaveLength(1)
    expect(wrapper.find('.sar-color-picker__alpha-fill').exists()).toBe(false)
  })

  test('uses default color when model value is empty', () => {
    const wrapper = mount(
      h(ColorPicker, {
        modelValue: '',
      }),
    )

    expect(wrapper.find('.sar-color-picker__value').text()).toContain(
      'rgb(25, 137, 250)',
    )
  })

  test('formats initial value', async () => {
    const wrapper = mount(
      h(ColorPicker, {
        modelValue: 'rgb(255, 0, 0)',
        format: 'hex',
      }),
    )

    expect(wrapper.find('.sar-color-picker__value').text()).toContain('#FF0000')
  })

  test('formats alpha value when showAlpha is enabled', () => {
    const wrapper = mount(
      h(ColorPicker, {
        modelValue: 'rgba(255, 0, 0, 0.5)',
        format: 'rgb',
        showAlpha: true,
      }),
    )

    expect(wrapper.find('.sar-color-picker__value').text()).toContain(
      'rgba(255, 0, 0, 0.5)',
    )
  })

  test('switches format from popover select', async () => {
    const wrapper = mount(
      h(ColorPicker, {
        modelValue: '#ff0000',
        format: 'hex',
        showFormat: true,
      }),
    )

    emitPopoverSelect(wrapper, {
      value: 'rgb',
      text: 'RGB',
    })
    await nextTick()

    expect(wrapper.emitted()['update:format']?.[0]).toEqual(['rgb'])
    expect(wrapper.emitted()['format-change']?.[0]).toEqual(['rgb'])
    expect(wrapper.emitted()['update:model-value']?.[0]).toEqual([
      'rgb(255, 0, 0)',
    ])
    expect(wrapper.find('.sar-color-picker__value').text()).toContain(
      'rgb(255, 0, 0)',
    )
  })

  test('selects preset color', async () => {
    const wrapper = mount(
      h(ColorPicker, {
        presets: ['#00ff00'],
        showPresets: true,
      }),
    )

    await wrapper.find('.sar-color-picker__preset').trigger('click')

    expect(wrapper.emitted().change?.[0]).toEqual(['rgb(0, 255, 0)'])
  })

  test('filters invalid presets and marks current preset active', async () => {
    const wrapper = mount(
      h(ColorPicker, {
        modelValue: '#00FF00',
        presets: ['invalid', '#00FF00', '#FF0000'],
        showPresets: true,
      }),
    )

    const presets = wrapper.findAll('.sar-color-picker__preset')

    expect(presets).toHaveLength(2)
    expect(presets[0].attributes('class')).toContain('active')

    await wrapper.setProps({
      modelValue: '#FF0000',
    })

    expect(
      wrapper.findAll('.sar-color-picker__preset')[1].attributes('class'),
    ).toContain('active')
  })

  test('shows alpha slider only when enabled', () => {
    const wrapper = mount(
      h(ColorPicker, {
        showAlpha: true,
      }),
    )

    expect(wrapper.findAll('.sar-color-picker__slider-bar')).toHaveLength(2)
    expect(wrapper.find('.sar-color-picker__alpha-fill').exists()).toBe(true)
  })

  test('updates color when dragging hue slider', async () => {
    mockTrackRect()

    const wrapper = mount(
      h(ColorPicker, {
        modelValue: '#FF0000',
        format: 'rgb',
      }),
    )

    await wrapper
      .findAll('.sar-color-picker__slider-bar')[0]
      .trigger('touchstart', {
        touches: [{ clientX: 50, clientY: 0 }],
        changedTouches: [{ clientX: 50, clientY: 0 }],
      })
    await nextTick()

    expect(wrapper.emitted()['update:model-value']?.[0]).toEqual([
      'rgb(0, 255, 255)',
    ])
  })

  test('keeps hue thumb stable after sv drag and external model sync', async () => {
    mockTrackRect()

    const wrapper = mount(
      h(ColorPicker, {
        modelValue: 'hsl(120, 100%, 50%)',
        format: 'hsl',
      }),
    )

    const hueThumb = wrapper.findAll('.sar-color-picker__thumb')[1]
    const beforeStyle = hueThumb.attributes('style')

    await wrapper.find('.sar-color-picker__panel').trigger('touchstart', {
      touches: [{ clientX: 20, clientY: 80 }],
      changedTouches: [{ clientX: 20, clientY: 80 }],
    })
    await nextTick()

    const emittedEvents = wrapper.emitted() as Record<
      string,
      string[][] | undefined
    >
    const emittedValue = emittedEvents['update:model-value']?.[0]?.[0]
    expect(emittedValue).toBeTruthy()

    await wrapper.setProps({
      modelValue: emittedValue,
    })
    await nextTick()

    expect(
      wrapper.findAll('.sar-color-picker__thumb')[1].attributes('style'),
    ).toBe(beforeStyle)
  })

  test('does not react to preset or format selection when disabled', async () => {
    const wrapper = mount(
      h(ColorPicker, {
        modelValue: '#ff0000',
        format: 'hex',
        showFormat: true,
        presets: ['#00ff00'],
        showPresets: true,
        disabled: true,
      }),
    )

    await wrapper.find('.sar-color-picker__preset').trigger('click')
    emitPopoverSelect(wrapper, {
      value: 'rgb',
      text: 'RGB',
    })
    await nextTick()

    expect(wrapper.emitted().change).toBeUndefined()
    expect(wrapper.emitted()['update:format']).toBeUndefined()
    expect(wrapper.find('.sar-color-picker__value').text()).toContain('#FF0000')
  })
})
