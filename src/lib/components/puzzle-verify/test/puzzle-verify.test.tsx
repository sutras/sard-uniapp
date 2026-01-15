import { describe, test } from 'vitest'
import { mount } from '@vue/test-utils'
import PuzzleVerify from '../puzzle-verify.vue'

describe('PuzzleVerify', () => {
  test('Basic', async () => {
    const wrapper = mount(
      <PuzzleVerify
        text="请按住滑块拖动"
        success-text="验证通过"
        targetPos={60}
        src="/static/logo.png"
      ></PuzzleVerify>,
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
  })
})
