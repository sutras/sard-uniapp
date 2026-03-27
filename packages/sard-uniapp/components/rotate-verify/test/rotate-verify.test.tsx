import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import RotateVerify from '../rotate-verify.vue'
import { sleep } from '../../../utils'

describe('RotateVerify', () => {
  test('Basic', async () => {
    const wrapper = mount(
      <RotateVerify
        text="拖动滑块至虚线框内"
        success-text="验证通过"
        show-target
        targetPos={60}
        resetWhenError={false}
      ></RotateVerify>,
    )

    expect(
      wrapper.find('.sar-rotate-verify__image').attributes().style,
    ).includes(`rotate(${(60 / 100) * 360}deg)`)

    await wrapper.find('.sar-slide-verify__thumb').trigger('touchstart', {
      touches: [{ clientX: 10, clientY: 100 }],
    })
    for (let i = 0; i < 60; i++) {
      await wrapper.find('.sar-slide-verify__thumb').trigger('touchmove', {
        touches: [{ clientX: 10 + i * 1, clientY: 100 }],
      })
    }
    await wrapper.find('.sar-slide-verify__thumb').trigger('touchend')

    const rotate = wrapper.emitted<[number]>().change.at(-1)![0]

    expect(
      wrapper.find('.sar-rotate-verify__image').attributes().style,
    ).includes(`rotate(-${(rotate / 100) * 360}deg)`)

    wrapper.vm.reset()

    await sleep(0)

    expect(
      wrapper.find('.sar-rotate-verify__image').attributes().style,
    ).includes(`rotate(0deg)`)
  })
})
