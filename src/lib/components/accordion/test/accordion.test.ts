import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Accordion from '../accordion.vue'
import AccordionItem from '../../accordion-item/accordion-item.vue'
import { sleep } from '../../../utils'

function createSlots() {
  return [
    h(AccordionItem, { title: '标题1', name: '1' }),
    h(AccordionItem, { title: '标题1', name: '2' }),
    h(AccordionItem, { title: '标题1', name: '3' }),
  ]
}

describe('Accordion', () => {
  test('create', async () => {
    const wrapper = mount(
      h(
        Accordion,
        {
          modelValue: '1',
        },
        { default: createSlots },
      ),
    )
    expect(wrapper.find('.sar-accordion').exists()).toBe(true)
    expect(wrapper.find('.sar-accordion-item__body').exists()).toBe(true)
    expect(
      wrapper
        .findAll('.sar-collapse')
        .map((item) => item.attributes())
        .map((item) => item.style)
        .every((item, index) => {
          return item.includes(index === 0 ? 'auto' : '0px')
        }),
    ).toBe(true)
  })

  test('toggle', async () => {
    const wrapper = mount(
      h(
        Accordion,
        {
          modelValue: '1',
          duration: 0,
        },
        { default: createSlots },
      ),
    )
    await wrapper.findAll('.sar-accordion-item__header')[1].trigger('click')
    await sleep(50)
    expect(
      wrapper
        .findAll('.sar-collapse')
        .map((item) => item.attributes())
        .map((item) => item.style)
        .every((item, index) => {
          return index === 1 ? !item.includes('0px') : item.includes('0px')
        }),
    ).toBe(true)
  })
})
