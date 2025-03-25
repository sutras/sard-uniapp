import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Signature from '../signature.vue'
import { h } from 'vue'
import { sleep } from '../../../utils'

describe('Signature', () => {
  test('event', async () => {
    const wrapper = mount(h(Signature, {}))

    await wrapper.find('button:last-of-type').trigger('click')

    expect(wrapper.emitted('confirm')![0][0]).toBe('')

    await wrapper.find('button:first-of-type').trigger('click')

    expect(wrapper.emitted('clear')![0][0]).toBe(undefined)
  })

  test('fullScreen', async () => {
    const wrapper = mount(
      h(Signature, {
        fullScreen: true,
      }),
    )

    expect(
      wrapper
        .find('.sar-signature.sar-signature_full.sar-signature_hidden')
        .exists(),
    ).toBeTruthy()

    await wrapper.setProps({
      visible: true,
    })

    expect(
      wrapper
        .find('.sar-signature.sar-signature_full.sar-signature_hidden')
        .exists(),
    ).toBeFalsy()

    await wrapper.find('button:first-of-type').trigger('click')

    expect(wrapper.emitted('update:visible')![0][0]).toBe(false)
    expect(wrapper.emitted('cancel')![0][0]).toBe(undefined)

    await sleep(180)

    expect(
      wrapper
        .find('.sar-signature.sar-signature_full.sar-signature_hidden')
        .exists(),
    ).toBeTruthy()
  })

  test('buttonText', async () => {
    const wrapper = mount(
      h(Signature, {
        fullScreen: true,
        cancelText: 'cancel1',
        clearText: 'clear1',
        confirmText: 'confirm1',
      }),
    )

    expect(wrapper.find('button:nth-child(1)').text()).toBe('cancel1')
    expect(wrapper.find('button:nth-child(2)').text()).toBe('clear1')
    expect(wrapper.find('button:nth-child(3)').text()).toBe('confirm1')
  })
})
