import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import CountTo from '../count-to.vue'
import { sleep } from '../../../utils'

describe('CountTo', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(CountTo, {
        value: 500,
        duration: 10,
      }),
    )

    await sleep(15)
    expect(wrapper.text()).toBe('500')
  })

  test('precision', async () => {
    const wrapper = mount(
      h(CountTo, {
        value: 500,
        duration: 10,
        precision: 2,
      }),
    )

    await sleep(15)
    expect(wrapper.text()).toBe('500.00')
  })

  test('separator', async () => {
    const wrapper = mount(
      h(CountTo, {
        value: 5000,
        duration: 10,
        precision: 2,
        separator: ',',
      }),
    )

    await sleep(15)
    expect(wrapper.text()).toBe('5,000.00')
  })

  test('separatorDigit', async () => {
    const wrapper = mount(
      h(CountTo, {
        value: 50000,
        duration: 10,
        precision: 2,
        separator: ',',
        separatorDigit: 4,
      }),
    )

    await sleep(15)
    expect(wrapper.text()).toBe('5,0000.00')
  })

  test('duration', async () => {
    const wrapper = mount(
      h(CountTo, {
        value: 500,
        duration: 10,
      }),
    )

    await sleep(2)
    expect(+wrapper.text()).toBeLessThan(500)
    await sleep(15)
    expect(+wrapper.text()).toEqual(500)
  })
})
