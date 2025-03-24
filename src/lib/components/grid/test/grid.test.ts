import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Grid from '../grid.vue'
import GridItem from '../../grid-item/grid-item.vue'

const createGridItems = () =>
  Array(8)
    .fill(0)
    .map(() => {
      return h(GridItem, {
        text: '文字',
        icon: 'image',
      })
    })

describe('Grid', () => {
  test('create', async () => {
    const wrapper = mount(h(Grid, null, createGridItems))

    expect(wrapper.findAll('.sar-grid__item').length).toBe(8)
  })

  test('columns', async () => {
    const wrapper = mount(
      h(
        Grid,
        {
          columns: 3,
        },
        () =>
          Array(6)
            .fill(0)
            .map(() => {
              return h(GridItem, {
                text: '文字',
                icon: 'image',
              })
            }),
      ),
    )

    expect(wrapper.find('.sar-grid__item').attributes().style).toMatch(
      /width: 33\.3+%/,
    )
  })

  test('square', async () => {
    const wrapper = mount(
      h(
        Grid,
        {
          columns: 3,
          square: true,
        },
        () =>
          Array(6)
            .fill(0)
            .map(() => {
              return h(GridItem, {
                text: '文字',
                icon: 'image',
              })
            }),
      ),
    )

    expect(wrapper.find('.sar-grid').classes()).includes('sar-grid_square')
  })

  test('gap', async () => {
    const wrapper = mount(
      h(
        Grid,
        {
          columns: 4,
          gap: '20px',
        },
        createGridItems,
      ),
    )

    expect(wrapper.find('.sar-grid').attributes().style).includes(
      'margin-left: -10px; margin-right: -10px; row-gap: 20px;',
    )
    expect(wrapper.find('.sar-grid__item').attributes().style).includes(
      'padding-left: 10px; padding-right: 10px;',
    )
  })

  test('border', async () => {
    const wrapper = mount(
      h(
        Grid,
        {
          bordered: true,
        },
        createGridItems,
      ),
    )

    expect(wrapper.find('.sar-grid').classes()).includes('sar-grid_bordered')
  })

  test('borderSurround', async () => {
    const wrapper = mount(
      h(
        Grid,
        {
          bordered: true,
          gap: '20px',
        },
        createGridItems,
      ),
    )

    expect(wrapper.find('.sar-grid').classes()).includes('sar-grid_surround')
  })

  test('direction', async () => {
    const wrapper = mount(
      h(
        Grid,
        {
          direction: 'horizontal',
        },
        createGridItems,
      ),
    )

    expect(wrapper.find('.sar-grid').classes()).includes('sar-grid_horizontal')
  })

  test('reverse', async () => {
    const wrapper = mount(
      h(
        Grid,
        {
          reverse: true,
        },
        createGridItems,
      ),
    )

    expect(wrapper.find('.sar-grid').classes()).includes('sar-grid_reverse')
  })

  test('clickable', async () => {
    const wrapper = mount(
      h(
        Grid,
        {
          clickable: true,
        },
        createGridItems,
      ),
    )

    expect(wrapper.find('.sar-grid').classes()).includes('sar-grid_clickable')
  })

  test('content', async () => {
    const wrapper = mount(
      h(Grid, null, () =>
        Array(8)
          .fill(0)
          .map(() => {
            return h(GridItem, null, () => 'content')
          }),
      ),
    )

    expect(wrapper.find('.sar-grid__content').text()).toBe('content')
  })

  test('badge', async () => {
    const wrapper = mount(
      h(Grid, null, () => [
        h(GridItem, { dot: true, text: '文字', icon: 'image' }),
        h(GridItem, { badge: 99 }),
        h(GridItem, {
          badge: 999,
          badgeProps: {
            max: 120,
          },
        }),
      ]),
    )

    expect(
      wrapper.find('.sar-grid__item:nth-child(1) .sar-badge').classes(),
    ).includes('sar-badge_dot')

    expect(wrapper.find('.sar-grid__item:nth-child(2) .sar-badge').text()).toBe(
      '99',
    )

    expect(wrapper.find('.sar-grid__item:nth-child(3) .sar-badge').text()).toBe(
      '120+',
    )
  })
})
