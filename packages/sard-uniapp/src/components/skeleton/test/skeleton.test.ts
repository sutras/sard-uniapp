import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Skeleton from '../skeleton.vue'
import SkeletonBlock from '../../skeleton-block/skeleton-block.vue'

describe('Skeleton', () => {
  test('basic', async () => {
    const wrapper = mount(h(Skeleton, {}))

    expect(
      wrapper.findAll('.sar-skeleton__paragraph .sar-skeleton__row').length,
    ).toBe(3)
  })

  test('title', async () => {
    const wrapper = mount(
      h(Skeleton, {
        title: true,
      }),
    )

    expect(wrapper.find('.sar-skeleton__title').exists()).toBeTruthy()
    expect(
      wrapper.findAll('.sar-skeleton__paragraph .sar-skeleton__row').length,
    ).toBe(3)
  })

  test('avatar', async () => {
    const wrapper = mount(
      h(Skeleton, {
        avatar: true,
      }),
    )

    expect(wrapper.find('.sar-skeleton__avatar').exists()).toBeTruthy()
  })

  test('roundAvatar', async () => {
    const wrapper = mount(
      h(Skeleton, {
        avatar: true,
        avatarRound: true,
      }),
    )

    expect(
      wrapper.find('.sar-skeleton__avatar.sar-skeleton_round').exists(),
    ).toBeTruthy()
  })

  test('round', async () => {
    const wrapper = mount(
      h(Skeleton, {
        avatar: true,
        title: true,
        round: true,
      }),
    )

    expect(
      wrapper.find('.sar-skeleton__title.sar-skeleton_round').exists(),
    ).toBeTruthy()
    expect(
      wrapper.find('.sar-skeleton__row.sar-skeleton_round').exists(),
    ).toBeTruthy()
  })

  test('animated', async () => {
    const wrapper = mount(
      h(Skeleton, {
        avatar: true,
        title: true,
        animated: true,
      }),
    )

    expect(
      wrapper.find('.sar-skeleton__avatar.sar-skeleton_animated').exists(),
    ).toBeTruthy()
    expect(
      wrapper.find('.sar-skeleton__title.sar-skeleton_animated').exists(),
    ).toBeTruthy()
    expect(
      wrapper.find('.sar-skeleton__row.sar-skeleton_animated').exists(),
    ).toBeTruthy()
  })

  test('contain', async () => {
    const wrapper = mount(
      h(
        Skeleton,
        {
          avatar: true,
          title: true,
          animated: true,
          loading: true,
        },
        () => h('div', { class: 'content' }, '内容'),
      ),
    )

    expect(wrapper.find('.sar-skeleton__avatar').exists()).toBeTruthy()
    expect(wrapper.find('.content').exists()).toBeFalsy()

    await wrapper.setProps({
      loading: false,
    })

    expect(wrapper.find('.sar-skeleton__avatar').exists()).toBeFalsy()
    expect(wrapper.find('.content').exists()).toBeTruthy()
  })

  test('custom', async () => {
    const wrapper = mount(
      h(SkeletonBlock, {
        width: '120px',
        height: '80px',
      }),
    )

    expect(wrapper.find('.sar-skeleton__block').attributes().style).includes(
      'width: 120px; height: 80px;',
    )
  })
})
