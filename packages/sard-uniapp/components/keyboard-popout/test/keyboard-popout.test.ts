import { describe, expect, test } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { h, nextTick } from 'vue'

import KeyboardPopout from '../keyboard-popout.vue'
import Keyboard from '../../keyboard/keyboard.vue'
import Popout from '../../popout/popout.vue'

const emitComponent = (
  wrapper: ReturnType<typeof mount>,
  component: object,
  event: string,
  ...args: any[]
) => {
  ;(wrapper.getComponent(component as never) as VueWrapper).vm.$emit(
    event,
    ...args,
  )
}

describe('KeyboardPopout', () => {
  test('renders title and keyboard when visible', () => {
    const wrapper = mount(
      h(KeyboardPopout, {
        title: '数字键盘',
        visible: true,
      }),
    )

    expect(wrapper.find('.sar-popout__title').text()).toBe('数字键盘')
    expect(wrapper.find('.sar-keyboard').exists()).toBe(true)
  })

  test('forwards keyboard and popout events', async () => {
    const wrapper = mount(
      h(KeyboardPopout, {
        visible: true,
        type: 'plate',
      }),
    )

    emitComponent(wrapper, Keyboard, 'input', 'A')
    emitComponent(wrapper, Keyboard, 'delete')
    emitComponent(wrapper, Keyboard, 'toggle', 'english')
    emitComponent(wrapper, Keyboard, 'update:mode', 'english')
    emitComponent(wrapper, Popout, 'confirm')
    emitComponent(wrapper, Popout, 'update:visible', false)
    emitComponent(wrapper, Popout, 'visible-hook', 'after-leave')
    await nextTick()

    expect(wrapper.emitted().input?.[0]).toEqual(['A'])
    expect(wrapper.emitted().delete?.[0]).toEqual([])
    expect(wrapper.emitted().toggle?.[0]).toEqual(['english'])
    expect(wrapper.emitted()['update:mode']?.[0]).toEqual(['english'])
    expect(wrapper.emitted().confirm?.[0]).toEqual([])
    expect(wrapper.emitted()['update:visible']?.[0]).toEqual([false])
    expect(wrapper.emitted()['visible-hook']).toContainEqual(['after-leave'])
    expect(wrapper.emitted()['after-leave']?.[0]).toEqual([])
  })

  test('exposes toggle method', async () => {
    const wrapper = mount(
      h(KeyboardPopout, {
        visible: true,
        type: 'plate',
      }),
    )

    ;(
      wrapper.vm as typeof wrapper.vm & { toggle: (mode?: string) => void }
    ).toggle('english')
    await nextTick()

    expect(
      wrapper
        .findAll('.sar-keyboard__key')
        .map((item) => item.text())
        .join(','),
    ).toContain('Q')
  })
})
