import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SlideVerify from '../slide-verify.vue'

describe('SlideVerify', () => {
  test('Basic', async () => {
    const mockVerify = vi.fn()

    const wrapper = mount(
      <SlideVerify
        text="请按住滑块拖动"
        successText="验证通过"
        verify={mockVerify}
      ></SlideVerify>,
    )

    expect(wrapper.find('.sar-slide-verify__track-text').text()).toEqual(
      '请按住滑块拖动',
    )

    await wrapper.find('.sar-slide-verify__thumb').trigger('touchstart', {
      touches: [{ clientX: 10, clientY: 100 }],
    })
    for (let i = 0; i < 60; i++) {
      await wrapper.find('.sar-slide-verify__thumb').trigger('touchmove', {
        touches: [{ clientX: 10 + i * 1, clientY: 100 }],
      })
    }
    await wrapper.find('.sar-slide-verify__thumb').trigger('touchend')

    expect(mockVerify).toHaveBeenCalled()
    expect(mockVerify.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        actualPos: expect.any(Number),
        targetPos: expect.any(Number),
        startTime: expect.any(Number),
        endTime: expect.any(Number),
        trajectory: expect.arrayContaining([]),
      }),
    )

    expect(typeof wrapper.emitted<[number]>().change[0][0]).toBe('number')
  })

  test('ShowTarget', async () => {
    const wrapper = mount(
      <SlideVerify
        text="拖动滑块至虚线框内"
        success-text="验证通过"
        show-target
        targetPos={60}
      ></SlideVerify>,
    )

    expect(wrapper.find('.sar-slide-verify__target').exists()).toBeTruthy()
  })

  test('Slot', async () => {
    const wrapper = mount(
      <SlideVerify
        text="拖动滑块至虚线框内"
        success-text="验证通过"
        show-target
        targetPos={60}
      >
        {{
          'text-before': () => 123,
          'text-after': () => 456,
        }}
      </SlideVerify>,
    )

    expect(wrapper.find('.sar-slide-verify__track').text()).toEqual(
      '123拖动滑块至虚线框内456',
    )
    expect(wrapper.find('.sar-slide-verify__fulfill').text()).toEqual(
      '123拖动滑块至虚线框内456',
    )
  })
})
