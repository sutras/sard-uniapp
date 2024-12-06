import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Row from '../../row/row.vue'
import Col from '../../col/col.vue'
import { mapJustify, mapAlign } from '../common'

describe('Layout', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(Row, null, () => [
        h(Col, null, () => 'span'),
        h(Col, null, () => 'span'),
      ]),
    )

    expect(wrapper.find('.sar-row').exists()).toBeTruthy()
    expect(wrapper.findAll('.sar-col').length).toBe(2)
  })

  test('basic2', async () => {
    const wrapper = mount(
      h(Row, null, () => [
        h(Col, { span: 4 }, () => 'span'),
        h(Col, { span: 8 }, () => 'span'),
      ]),
    )

    expect(wrapper.find('.sar-col_4').exists()).toBeTruthy()
    expect(wrapper.find('.sar-col_8').exists()).toBeTruthy()
  })

  test('basic3', async () => {
    const wrapper = mount(
      h(Row, null, () => [
        h(Col, { span: 3 }, () => 'span'),
        h(Col, { span: 'auto' }, () => 'span'),
      ]),
    )

    expect(wrapper.find('.sar-col_3').exists()).toBeTruthy()
    expect(wrapper.find('.sar-col_auto').exists()).toBeTruthy()
  })

  test('offset', async () => {
    const wrapper = mount(
      h(Row, null, () => [
        h(Col, null, () => 'span'),
        h(Col, { offset: 3 }, () => 'span'),
      ]),
    )

    expect(wrapper.find('.sar-col_offset-3').exists()).toBeTruthy()
  })

  test('justify', async () => {
    const wrapper = mount(
      h(
        Row,
        {
          justify: 'start',
        },
        () => [h(Col, null, () => 'span'), h(Col, null, () => 'span')],
      ),
    )

    const justifyList = Object.keys(mapJustify)

    for (const justify of justifyList) {
      await wrapper.setProps({
        justify,
      })

      expect(wrapper.find('.sar-row').attributes().style).include(
        `justify-content: ${mapJustify[justify]}`,
      )
    }
  })

  test('align', async () => {
    const wrapper = mount(
      h(
        Row,
        {
          align: 'start',
        },
        () => [h(Col, null, () => 'span'), h(Col, null, () => 'span')],
      ),
    )

    const alignList = Object.keys(mapAlign)

    for (const align of alignList) {
      await wrapper.setProps({
        align,
      })

      expect(wrapper.find('.sar-row').attributes().style).include(
        `align-items: ${mapAlign[align]}`,
      )
    }
  })

  test('gap', async () => {
    const wrapper = mount(
      h(
        Row,
        {
          gap: '30px',
        },
        () => [h(Col, null, () => 'span'), h(Col, null, () => 'span')],
      ),
    )

    expect(wrapper.find('.sar-row').attributes().style).include(
      'margin-left: -15px; margin-right: -15px;',
    )
    expect(wrapper.find('.sar-col').attributes().style).include(
      'padding-left: 15px; padding-right: 15px;',
    )
  })

  test('order', async () => {
    const wrapper = mount(
      h(Row, null, () => [
        h(Col, null, () => 'span'),
        h(
          Col,
          {
            order: -1,
          },
          () => 'span',
        ),
      ]),
    )

    expect(wrapper.find('.sar-col:last-child').attributes().style).include(
      'order: -1;',
    )
  })
})
