import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { getRegionData } from 'region-data'

import Tree from '../tree.vue'

const regionData = getRegionData()

const treeData = regionData.slice(0, 5).map((item) => ({
  ...item,
  children: item.children.slice(0, 3).map((item) => ({
    ...item,
    children: item.children.slice(0, 3),
  })),
}))

const nodeKeys = { title: 'name', key: 'code' }

describe('Tree', () => {
  test('defaultExpandAll', async () => {
    const wrapper = mount(
      h(Tree, {
        data: treeData,
        nodeKeys,
        defaultExpandAll: true,
      }),
    )

    expect(
      wrapper
        .findAll('.sar-tree__arrow')
        .every((item) => item.classes().includes('sar-tree__arrow_expanded')),
    ).toBe(true)
  })

  test('defaultExpandedAndChecked', async () => {
    const wrapper = mount(
      h(Tree, {
        data: treeData,
        nodeKeys,
        selectable: true,
        defaultCheckedKeys: [110101, 120100],
        defaultExpandedKeys: [110100, 120100],
      }),
    )

    expect(wrapper.getComponent(Tree).vm.getCheckedKeys()).toEqual([
      110101, 120000, 120100, 120101, 120102, 120103,
    ])

    expect(wrapper.getComponent(Tree).vm.getExpandedKeys()).toEqual([
      110000, 110100, 120000, 120100,
    ])
  })

  test('accordion', async () => {
    const wrapper = mount(
      h(Tree, {
        data: treeData,
        nodeKeys,
        accordion: true,
      }),
    )

    await wrapper
      .findAll('.sar-tree__node')
      .find((item) => item.text() === '北京市')
      ?.trigger('click')
    expect(wrapper.getComponent(Tree).vm.getExpandedKeys()).toEqual([110000])

    await wrapper
      .findAll('.sar-tree__node')
      .find((item) => item.text() === '天津市')
      ?.trigger('click')

    expect(wrapper.getComponent(Tree).vm.getExpandedKeys()).toEqual([120000])
  })

  test('selectable', async () => {
    const wrapper = mount(
      h(Tree, {
        data: treeData,
        nodeKeys,
        selectable: true,
      }),
    )

    wrapper.getComponent(Tree).vm.setChecked(110000, true)
    expect(wrapper.getComponent(Tree).vm.getCheckedKeys()).toEqual([
      110000, 110100, 110101, 110102, 110105,
    ])

    wrapper.getComponent(Tree).vm.setChecked(110000, false)
    wrapper.getComponent(Tree).vm.setChecked(120101, true)
    expect(wrapper.getComponent(Tree).vm.getCheckedKeys()).toEqual([120101])
    expect(wrapper.getComponent(Tree).vm.getHalfCheckedKeys()).toEqual([
      120000, 120100,
    ])
  })

  test('checkStrictly', async () => {
    const wrapper = mount(
      h(Tree, {
        data: treeData,
        nodeKeys,
        selectable: true,
        checkStrictly: true,
      }),
    )

    wrapper.getComponent(Tree).vm.setChecked(110000, true)
    expect(wrapper.getComponent(Tree).vm.getCheckedKeys()).toEqual([110000])
  })

  test('filter', async () => {
    const wrapper = mount(
      h(Tree, {
        data: treeData,
        nodeKeys,
      }),
    )

    wrapper.getComponent(Tree).vm.filter('北京市')
    await nextTick()
    expect(
      wrapper.findAll('.sar-tree__title').map((item) => item.text()),
    ).toEqual(['北京市'])

    await wrapper.find('.sar-tree__node')?.trigger('click')
    expect(
      wrapper.findAll('.sar-tree__title').map((item) => item.text()),
    ).toEqual(['北京市', '北京市'])

    await wrapper.findAll('.sar-tree__node').pop()?.trigger('click')
    expect(
      wrapper.findAll('.sar-tree__title').map((item) => item.text()),
    ).toEqual(['北京市', '北京市', '东城区', '西城区', '朝阳区'])

    await wrapper.setProps({
      filterMode: 'strict',
    })
    wrapper.getComponent(Tree).vm.filter('北京市')
    await nextTick()
    expect(
      wrapper.findAll('.sar-tree__title').map((item) => item.text()),
    ).toEqual(['北京市', '北京市'])

    await wrapper.findAll('.sar-tree__node').pop()?.trigger('click')
    expect(
      wrapper.findAll('.sar-tree__title').map((item) => item.text()),
    ).toEqual(['北京市', '北京市'])
  })

  test('single-selectable', async () => {
    const wrapper = mount(
      h(Tree, {
        data: treeData,
        nodeKeys,
        singleSelectable: true,
        leafOnly: true,
        current: 110102,
        defaultExpandAll: true,
      }),
    )

    expect(
      wrapper.find('.sar-tree__node_current .sar-tree__title').text(),
    ).toBe('西城区')

    await wrapper.find('.sar-tree__node:nth-child(8)').trigger('click')

    expect(
      wrapper.find('.sar-tree__node_current .sar-tree__title').text(),
    ).toBe('和平区')
  })
})
