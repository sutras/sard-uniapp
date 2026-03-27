import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import { sleep } from '../../../utils'
import CropImageAgent from '../../crop-image-agent/crop-image-agent.vue'
import { cropImage } from '../../crop-image-agent'

describe('CropImage', () => {
  test('visible', async () => {
    const wrapper = mount(<CropImageAgent></CropImageAgent>)

    cropImage({
      src: 'http://temp/1.jpg',
    })

    await sleep(0)

    expect(wrapper.find('.sar-popup').attributes().style).includes(
      'display: flex;',
    )

    await wrapper.find('button:nth-child(1)').trigger('click')
    await sleep(180)

    expect(wrapper.find('.sar-popup').attributes().style).includes(
      'display: none;',
    )
  })
})

test('confirm', async () => {
  const wrapper = mount(<CropImageAgent></CropImageAgent>)

  cropImage({
    src: 'http://temp/1.jpg',
    fail() {},
  })

  await sleep(0)

  await wrapper.find('button:nth-child(4)').trigger('click')

  await sleep(0)

  expect('nothing').toBeTruthy()
})
