import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Pagination from '../pagination.vue'

describe('Pagination', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(Pagination, {
        total: 100,
        current: 2,
      }),
    )

    expect(wrapper.find('.sar-pagination__item_current').text()).toBe('2')

    await wrapper.find('.sar-pagination__prev').trigger('click')
    expect(
      wrapper
        .find('.sar-pagination__prev.sar-pagination__item_disabled')
        .exists(),
    ).toBeTruthy()
    expect(wrapper.find('.sar-pagination__item_current').text()).toBe('1')
  })

  test('basic', async () => {
    const wrapper = mount(
      h(Pagination, {
        total: 100,
        current: 1,
        ellipsis: true,
      }),
    )

    expect(wrapper.find('.sar-pagination__item:nth-child(6)').text()).toBe(
      '...',
    )
    await wrapper.setProps({
      current: 5,
    })
    expect(wrapper.find('.sar-pagination__item:nth-child(2)').text()).toBe(
      '...',
    )
  })

  test('basic', async () => {
    const wrapper = mount(
      h(Pagination, {
        total: 100,
        current: 1,
        pageSize: 10,
        type: 'simple',
      }),
    )

    expect(
      wrapper
        .find('.sar-pagination__item_disabled.sar-pagination__prev')
        .exists(),
    ).toBeTruthy()
    expect(wrapper.find('.sar-pagination__ratio').text()).toBe('1/10')

    await wrapper.find('.sar-pagination__next').trigger('click')
    expect(wrapper.find('.sar-pagination__ratio').text()).toBe('2/10')
  })

  test('basic', async () => {
    const wrapper = mount(
      h(
        Pagination,
        {
          total: 100,
          current: 1,
          pageSize: 10,
          type: 'simple',
        },
        {
          prev: () => 'prev page',
          next: () => 'next page',
        },
      ),
    )

    expect(wrapper.find('.sar-pagination__prev').text()).toBe('prev page')
    expect(wrapper.find('.sar-pagination__next').text()).toBe('next page')
  })
})
