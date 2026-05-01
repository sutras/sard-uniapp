import { afterEach, describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'

import Swiper from '../swiper.vue'

const imageList = [
  {
    title: '图片1',
    image: 'https://example.com/1.jpg',
  },
  {
    title: '图片2',
    image: 'https://example.com/2.jpg',
  },
  {
    title: '图片3',
    image: 'https://example.com/3.jpg',
  },
]

const NativeStub = {
  inheritAttrs: false,
  setup(_: unknown, { attrs, slots }: any) {
    return () => h('div', attrs, slots.default?.())
  },
}

function mountSwiper(props: any) {
  return mount(Swiper, {
    props,
    global: {
      stubs: {
        swiper: NativeStub,
        'swiper-item': NativeStub,
      },
    },
  })
}

function getActiveDotIndex(wrapper: ReturnType<typeof mount>) {
  return wrapper
    .findAll('.sar-swiper-dot__item')
    .findIndex((item) => item.classes().includes('sar-swiper-dot__item_active'))
}

describe('Swiper', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('renders normalized items and toggles dots', async () => {
    const wrapper = mountSwiper({
      list: ['https://example.com/cover.jpg', imageList[1]],
      rootClass: 'custom-wrapper',
    })

    expect(wrapper.find('.sar-swiper__wrapper.custom-wrapper').exists()).toBe(
      true,
    )
    expect(wrapper.findAll('.sar-swiper__swiper-item')).toHaveLength(2)
    expect(wrapper.findAll('image')).toHaveLength(2)
    expect(wrapper.findAll('image')[0].attributes('src')).toBe(
      'https://example.com/cover.jpg',
    )
    expect(wrapper.find('.sar-swiper-dot').exists()).toBe(true)

    await wrapper.setProps({ showDot: false })
    await nextTick()

    expect(wrapper.find('.sar-swiper-dot').exists()).toBe(false)
  })

  test('syncs active index from modelValue and emits change events', async () => {
    const wrapper = mountSwiper({
      list: imageList,
      modelValue: 1,
    })

    expect(getActiveDotIndex(wrapper)).toBe(1)

    await wrapper.setProps({ modelValue: 2 })
    await nextTick()

    expect(getActiveDotIndex(wrapper)).toBe(2)

    await wrapper.find('.sar-swiper').trigger('change', {
      detail: {
        current: 0,
      },
    })
    await nextTick()

    expect(getActiveDotIndex(wrapper)).toBe(0)
    expect(wrapper.emitted<[number]>()['update:model-value'][0][0]).toBe(0)
    expect(wrapper.emitted<[number]>().change[0][0]).toBe(0)
  })

  test('emits click with item index', async () => {
    const wrapper = mountSwiper({
      list: imageList,
    })

    await wrapper.findAll('.sar-swiper__swiper-item')[1].trigger('click')

    expect(wrapper.emitted<[number]>().click[0][0]).toBe(1)
  })

  test('plays current video and pauses other videos on change', async () => {
    const contexts: {
      play: ReturnType<typeof vi.fn>
      pause: ReturnType<typeof vi.fn>
      requestFullScreen: ReturnType<typeof vi.fn>
    }[] = []
    const uniObject = Reflect.get(globalThis, 'uni') as any
    const createVideoContext = vi
      .spyOn(uniObject, 'createVideoContext')
      .mockImplementation((id: any) => {
        void id
        const context = {
          play: vi.fn(),
          pause: vi.fn(),
          requestFullScreen: vi.fn(),
        }
        contexts.push(context)
        return context
      })

    const wrapper = mountSwiper({
      list: [
        {
          video: 'https://example.com/1.mp4',
          poster: 'https://example.com/1.jpg',
        },
        {
          video: 'https://example.com/2.mp4',
          poster: 'https://example.com/2.jpg',
        },
        imageList[2],
      ],
    })

    await wrapper.find('.sar-swiper').trigger('change', {
      detail: {
        current: 1,
      },
    })

    expect(createVideoContext).toHaveBeenCalledTimes(2)
    expect(createVideoContext.mock.calls[0][0]).toMatch(/-0$/)
    expect(createVideoContext.mock.calls[1][0]).toMatch(/-1$/)
    expect(contexts[0].pause).toHaveBeenCalledTimes(1)
    expect(contexts[0].play).not.toHaveBeenCalled()
    expect(contexts[1].play).toHaveBeenCalledTimes(1)
    expect(contexts[1].pause).not.toHaveBeenCalled()
  })
})
