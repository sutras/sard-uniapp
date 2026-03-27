import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Table from '../table.vue'
import TableRow from '../../table-row/table-row.vue'
import TableCell from '../../table-cell/table-cell.vue'
import {
  partialColumns,
  partialData,
  columns,
  data,
} from '../../../../pages/components/table/demo/data'
import { type TableProps } from '../common'

const createBasicTable = (props?: TableProps) => {
  return h(Table, props, () => [
    h(TableRow, null, () =>
      partialColumns.map((item) => {
        return h(
          TableCell,
          { key: item.prop, bold: true, width: item.width },
          () => item.title,
        )
      }),
    ),
    partialData.map((record) => {
      return h(TableRow, { key: record.id }, () => {
        return partialColumns.map((item) => {
          return h(
            TableCell,
            { key: item.prop, width: item.width },
            () => record[item.prop],
          )
        })
      })
    }),
  ])
}

const createMassTable = (props?: TableProps) => {
  return h(Table, props, () => [
    h(TableRow, null, () => [
      ...columns.map((item, i) => {
        return h(
          TableCell,
          {
            key: item.prop,
            bold: true,
            width: item.width.replace('rpx', 'px'),
            fixed: i === 0,
          },
          () => item.title,
        )
      }),
      h(TableCell, { fixed: 'right', width: '120px' }, () => '操作'),
    ]),
    data.map((record) => {
      return h(TableRow, { key: record.id }, () => {
        return [
          ...columns.map((item, i) => {
            return h(
              TableCell,
              {
                key: item.prop,
                width: item.width.replace('rpx', 'px'),
                fixed: i === 0,
              },
              () => record[item.prop],
            )
          }),
          h(TableCell, { fixed: 'right', width: '120px' }, () => '编辑'),
        ]
      })
    }),
  ])
}

describe('Table', () => {
  test('Basic', async () => {
    const wrapper = mount(createBasicTable())

    expect(wrapper.text()).eq('ID姓名城市1张三广州2张三广州3张三广州')

    expect(
      wrapper.find('.sar-table__row:nth-child(1) .sar-table__cell').classes(),
    ).includes('sar-table__cell_bold')

    expect(
      wrapper.find('.sar-table__row:nth-child(2) .sar-table__cell').classes(),
    ).not.includes('sar-table__cell_bold')

    expect(
      wrapper
        .find('.sar-table__row:nth-child(1) .sar-table__cell:nth-child(1)')
        .attributes().style,
    ).eq('flex-grow: 1; flex-shrink: 1; flex-basis: 0%;')

    expect(
      wrapper
        .find('.sar-table__row:nth-child(1) .sar-table__cell:nth-child(2)')
        .attributes().style,
    ).eq('flex-grow: 2; flex-shrink: 1; flex-basis: 0%;')

    expect(
      wrapper
        .find('.sar-table__row:nth-child(1) .sar-table__cell:nth-child(3)')
        .attributes().style,
    ).eq('flex-grow: 3; flex-shrink: 1; flex-basis: 0%;')
  })

  test('Border', async () => {
    const wrapper = mount(
      createBasicTable({
        bordered: true,
      }),
    )

    expect(wrapper.find('.sar-table').classes()).includes('sar-table_bordered')
  })

  test('Underline', async () => {
    const wrapper = mount(
      createBasicTable({
        underline: true,
      }),
    )

    expect(wrapper.find('.sar-table').classes()).includes('sar-table_underline')
  })

  test('Width', async () => {
    const wrapper = mount(createMassTable({}))

    expect(
      wrapper
        .find('.sar-table__row:nth-child(1) .sar-table__cell:nth-child(1)')
        .attributes().style,
    ).eq('width: 80px; flex-grow: 80; flex-shrink: 0; flex-basis: 80px;')

    expect(
      wrapper
        .find('.sar-table__row:nth-child(1) .sar-table__cell:nth-child(2)')
        .attributes().style,
    ).eq('width: 200px; flex-grow: 200; flex-shrink: 0; flex-basis: 200px;')

    expect(
      wrapper
        .find('.sar-table__row:nth-child(1) .sar-table__cell:nth-child(3)')
        .attributes().style,
    ).eq('width: 100px; flex-grow: 100; flex-shrink: 0; flex-basis: 100px;')
  })

  test('FixedHeader', async () => {
    const wrapper = mount(createMassTable({}))
    expect(wrapper.find('.sar-table__fixation').attributes()['scroll-y']).eq(
      'false',
    )

    await wrapper.setProps({ height: '400px' })
    expect(wrapper.find('.sar-table__fixation').attributes()['scroll-y']).eq(
      'true',
    )
    expect(wrapper.find('.sar-table__fixation').attributes().style).eq(
      'height: 400px;',
    )
  })

  test('FixedColumn', async () => {
    const wrapper = mount(createMassTable({}))

    expect(
      wrapper
        .find('.sar-table__row:nth-child(1) .sar-table__cell:first-child')
        .classes(),
    ).includes('sar-table__cell_fixed-left')

    expect(
      wrapper
        .find('.sar-table__row:nth-child(1) .sar-table__cell:last-child')
        .classes(),
    ).includes('sar-table__cell_fixed-right')
  })
})
