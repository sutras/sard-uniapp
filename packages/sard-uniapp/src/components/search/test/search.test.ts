import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Search from '../search.vue'

describe('Search', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(Search, {
        placeholder: '请输入关键词',
        modelValue: '内容',
      }),
    )

    expect(wrapper.find('.sar-search').find('input').element.value).toBe('内容')
    await wrapper.setProps({
      modelValue: '新的内容',
    })
    expect(wrapper.find('.sar-search').find('input').element.value).toBe(
      '新的内容',
    )
  })

  test('search', async () => {
    const wrapper = mount(
      h(Search, {
        placeholder: '请输入关键词',
        modelValue: '内容',
        search: '搜索',
      }),
    )

    expect(wrapper.find('.sar-search__append .sar-button').text()).toBe('搜索')
    await wrapper.find('.sar-search__append .sar-button').trigger('click')

    expect(wrapper.emitted().search).toContainEqual(['内容'])
  })

  test('cancel', async () => {
    const wrapper = mount(
      h(Search, {
        placeholder: '请输入关键词',
        modelValue: '内容',
        cancel: '取消',
      }),
    )

    // console.log(wrapper.html())
    expect(wrapper.find('.sar-search__append .sar-button').text()).toBe('取消')
    await wrapper.find('.sar-search__append .sar-button').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('cancel')
  })

  test('round', async () => {
    const wrapper = mount(
      h(Search, {
        placeholder: '请输入关键词',
        shape: 'round',
      }),
    )

    expect(
      wrapper.find('.sar-search__input.sar-search__input_round').exists(),
    ).toBeTruthy()
  })

  test('align', async () => {
    const wrapper = mount(
      h(Search, {
        placeholder: '请输入关键词',
        align: 'center',
      }),
    )

    expect(wrapper.find('.sar-input').attributes().style).includes(
      'text-align: center;',
    )
  })

  test('background', async () => {
    const wrapper = mount(
      h(Search, {
        placeholder: '请输入关键词',
        background: 'red',
        inputBackground: 'white',
      }),
    )

    expect(wrapper.find('.sar-search').attributes().style).includes(
      'background-color: red;',
    )
    expect(wrapper.find('.sar-input').attributes().style).includes(
      'background-color: white;',
    )
  })

  test('readonly', async () => {
    const wrapper = mount(
      h(Search, {
        placeholder: '请输入关键词',
        readonly: true,
      }),
    )

    expect(wrapper.find('input').attributes()).toHaveProperty('disabled')
  })

  test('disabled', async () => {
    const wrapper = mount(
      h(Search, {
        placeholder: '请输入关键词',
        disabled: true,
      }),
    )

    expect(wrapper.find('input').attributes()).toHaveProperty('disabled')
  })

  test('slot', async () => {
    const wrapper = mount(
      h(
        Search,
        {
          placeholder: '请输入关键词',
        },
        {
          prepend() {
            return h('div', { class: 'prepend' }, 'prepend')
          },
          'input-prepend'() {
            return h('div', { class: 'input-prepend' }, 'input-prepend')
          },
          'input-append'() {
            return h('div', { class: 'input-append' }, 'input-append')
          },
          append() {
            return h('div', { class: 'append' }, 'append')
          },
        },
      ),
    )

    expect(wrapper.find('.sar-search__prepend .prepend').text()).toBe('prepend')
    expect(wrapper.find('.sar-input__prepend .input-prepend').text()).toBe(
      'input-prepend',
    )
    expect(wrapper.find('.sar-input__append .input-append').text()).toBe(
      'input-append',
    )
    expect(wrapper.find('.sar-search__append .append').text()).toBe('append')
  })
})
