import { describe, expect, test, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'

import Ellipsis from '../ellipsis.vue'
import * as domUtils from '../../../utils/dom'
import { sleep } from '../../../utils'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Ellipsis', () => {
  test('shows original content when there is no overflow', async () => {
    vi.spyOn(domUtils, 'getBoundingClientRect').mockImplementation(async () => {
      return {
        left: 0,
        top: 0,
        width: 200,
        height: 20,
      } as Awaited<ReturnType<typeof domUtils.getBoundingClientRect>>
    })

    const wrapper = mount(
      h(Ellipsis, {
        content: '这是一段不会被截断的文本。',
      }),
    )

    await nextTick()
    await nextTick()
    await sleep(0)

    expect(wrapper.find('.sar-ellipsis__content').text()).toBe(
      '这是一段不会被截断的文本。',
    )
    expect(wrapper.find('.sar-ellipsis__action').exists()).toBe(false)
  })

  test('toggles expanded state and emits change', async () => {
    let callCount = 0

    vi.spyOn(domUtils, 'getBoundingClientRect').mockImplementation(async () => {
      callCount += 1

      if (callCount === 1) {
        return {
          left: 0,
          top: 0,
          width: 200,
          height: 60,
        } as Awaited<ReturnType<typeof domUtils.getBoundingClientRect>>
      }

      if (callCount === 2) {
        return {
          left: 0,
          top: 0,
          width: 200,
          height: 40,
        } as Awaited<ReturnType<typeof domUtils.getBoundingClientRect>>
      }

      return {
        left: 0,
        top: 0,
        width: 200,
        height: 40,
      } as Awaited<ReturnType<typeof domUtils.getBoundingClientRect>>
    })

    const wrapper = mount(
      h(Ellipsis, {
        content: '这是一段比较长的文本内容，这是一段比较长的文本内容。',
        expandText: '展开',
        collapseText: '收起',
      }),
    )

    await nextTick()
    await nextTick()
    await sleep(0)

    const action = wrapper.find('.sar-ellipsis__action')
    expect(action.exists()).toBe(true)
    expect(
      wrapper.find('.sar-ellipsis__content .sar-ellipsis__action').exists(),
    ).toBe(true)
    expect(action.text()).toBe('展开')

    await action.trigger('click')

    expect(wrapper.emitted()['update:expanded']?.[0]).toEqual([true])
    expect(wrapper.emitted().change?.[0]).toEqual([true])
    expect(wrapper.find('.sar-ellipsis__action').text()).toBe('收起')
  })
})
