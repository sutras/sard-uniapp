import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Image from '../image.vue'
import { IMAGE_MODES } from '../common'

const url = 'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat1.jpg'

const customLoad = (callback: any) => {
  callback({
    detail: {
      width: 80,
      height: 80,
    },
  })
}

describe('Image', () => {
  test('basic', async () => {
    const wrapper = mount(
      <Image src={url} width="160px" height="160px"></Image>,
    )

    const style = wrapper.find('.sar-image').attributes().style
    expect(style).includes('width: 160px; height: 160px;')
    expect(wrapper.find('img').attributes().src).equal(url)
  })

  test('mode', async () => {
    const wrapper = mount(
      <Image
        src={url}
        width="160px"
        height="160px"
        customLoad={customLoad}
      ></Image>,
    )

    const modes = Object.keys(
      IMAGE_MODES,
    ) as unknown as (keyof typeof IMAGE_MODES)[]

    for (const mode of modes) {
      await wrapper.setProps({
        mode: mode,
      })

      const style = wrapper.find('.sar-image__display').attributes().style
      if (IMAGE_MODES[mode][0]) {
        expect(style).includes(`background-position: ${IMAGE_MODES[mode][0]}`)
      }
      expect(style).includes(`background-size: ${IMAGE_MODES[mode][1]}`)
    }
  })

  test('shape', async () => {
    const wrapper = mount(
      <Image
        src={url}
        width="160px"
        height="160px"
        shape="circle"
        customLoad={customLoad}
      ></Image>,
    )

    const classes = wrapper.find('.sar-image').classes()
    expect(classes).includes('sar-image_circle')

    await wrapper.setProps({
      shape: 'square',
      radius: '12px',
    })
    const style = wrapper.find('.sar-image').attributes().style
    expect(style).includes('border-radius: 12px;')
  })

  test('lazy', async () => {
    const wrapper = mount(
      <Image src={url} width="160px" height="160px" lazyLoad></Image>,
    )

    expect(wrapper.find('img').attributes().loading).equal('lazy')
  })

  test('loading', async () => {
    const wrapper = mount(
      <Image
        src={url}
        width="160px"
        height="160px"
        loadingIcon="loading-icon"
      ></Image>,
    )

    expect(wrapper.find('.sar-icon').classes()).includes('sari-loading-icon')
  })

  test('loading-slot', async () => {
    const wrapper = mount(
      <Image
        src={url}
        width="160px"
        height="160px"
        loadingIcon="loading-icon"
        v-slots={{ loading: () => '加载中' }}
      ></Image>,
    )

    expect(wrapper.find('.sar-image__loading').text()).equal('加载中')
  })

  test('error', async () => {
    const wrapper = mount(
      <Image
        src={url}
        width="160px"
        height="160px"
        loadingIcon="error-icon"
      ></Image>,
    )

    expect(wrapper.find('.sar-icon').classes()).includes('sari-error-icon')
  })

  test('error-slot', async () => {
    const wrapper = mount(
      <Image
        src={url}
        width="160px"
        height="160px"
        loadingIcon="error-icon"
        v-slots={{ loading: () => '加载失败' }}
      ></Image>,
    )

    expect(wrapper.find('.sar-image__loading').text()).equal('加载失败')
  })

  test('fade', async () => {
    const wrapper = mount(
      <Image src={url} width="160px" height="160px"></Image>,
    )

    expect(wrapper.find('.sar-image').classes()).includes('sar-image_animated')

    await wrapper.setProps({
      fade: false,
    })

    expect(wrapper.find('.sar-image').classes()).not.includes(
      'sar-image_animated',
    )
  })
})
