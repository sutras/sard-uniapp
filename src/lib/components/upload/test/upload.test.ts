import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Upload from '../upload.vue'

const mockFile = (path = 'tempFilePath.jpg', size = 100) => {
  return {
    path,
    size,
    duration: 0,
    height: 0,
    width: 0,
    fileType: 'image',
  }
}

describe('Toast', () => {
  test('basic', async () => {
    const wrapper = mount(h(Upload, {}))

    vi.stubGlobal('tempFiles', [mockFile()])

    await wrapper.find('.sar-upload__select').trigger('click')
    expect(wrapper.find('.sar-upload__preview image').exists()).toBeTruthy()
  })

  test('video', async () => {
    const wrapper = mount(
      h(Upload, {
        modelValue: [
          {
            url: 'https://fastly.jsdelivr.net/npm/@sard/assets/video/video1.mp4',
          },
          {
            url: 'https://fastly.jsdelivr.net/npm/@sard/assets/video/video1.mp4',
          },
        ],
      }),
    )

    expect(wrapper.findAll('video').length).toBe(2)
  })

  test('video', async () => {
    const wrapper = mount(
      h(Upload, {
        modelValue: [
          {
            url: 'https://fastly.jsdelivr.net/npm/@sard/assets/video/video1.mp4',
          },
          {
            url: 'https://fastly.jsdelivr.net/npm/@sard/assets/video/video1.mp4',
          },
        ],
      }),
    )

    expect(wrapper.findAll('video').length).toBe(2)
  })

  test('maxCount', async () => {
    const wrapper = mount(
      h(Upload, {
        maxCount: 3,
      }),
    )

    vi.stubGlobal('tempFiles', [mockFile(), mockFile()])

    await wrapper.find('.sar-upload__select').trigger('click')

    expect(wrapper.findAll('.sar-upload__preview').length).toBe(2)
    expect(wrapper.find('.sar-upload__select').exists()).toBeTruthy()

    await wrapper.find('.sar-upload__select').trigger('click')
    expect(wrapper.findAll('.sar-upload__preview').length).toBe(3)
    expect(wrapper.find('.sar-upload__select').exists()).not.toBeTruthy()
  })

  test('beforeRead', async () => {
    const beforeRead = vi.fn((file) => {
      if (file.path === 'pic2.jpg') {
        return false
      }
      return true
    })
    const wrapper = mount(
      h(Upload, {
        beforeRead,
      }),
    )

    vi.stubGlobal('tempFiles', [
      mockFile('pic1.jpg'),
      mockFile('pic2.jpg'),
      mockFile('pic3.jpg'),
    ])

    await wrapper.find('.sar-upload__select').trigger('click')

    expect(
      wrapper.findAll('image').map((item) => item.attributes().src),
    ).toEqual(['pic1.jpg', 'pic3.jpg'])
  })

  test('maxSize', async () => {
    const overSize = vi.fn(([fileItem]) => {
      return fileItem.file.path
    })
    const wrapper = mount(
      h(Upload, {
        overSize,
        maxSize: 10,
      }),
    )

    vi.stubGlobal('tempFiles', [
      mockFile('pic1.jpg', 20),
      mockFile('pic2.jpg', 9),
    ])

    await wrapper.find('.sar-upload__select').trigger('click')

    expect(
      wrapper.findAll('image').map((item) => item.attributes().src),
    ).toEqual(['pic2.jpg'])
    expect(overSize).toHaveReturnedWith('pic1.jpg')
  })

  test('status', async () => {
    const wrapper = mount(
      h(Upload, {
        modelValue: [
          {
            url: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg',
          },
          {
            url: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic2.jpg',
            status: 'uploading',
            message: '正在上传',
          },
          {
            url: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic3.jpg',
            status: 'failed',
            message: '上传失败',
          },
        ],
      }),
    )

    expect(
      wrapper
        .find('.sar-upload__preview:nth-child(2) .sar-upload__status-message')
        .text(),
    ).toBe('正在上传')
    expect(
      wrapper.find('.sar-upload__preview:nth-child(2) .sar-loading').exists(),
    ).toBeTruthy()
    expect(
      wrapper
        .find('.sar-upload__preview:nth-child(3) .sar-upload__status-message')
        .text(),
    ).toBe('上传失败')
    expect(
      wrapper
        .find('.sar-upload__preview:nth-child(3) .sar-icon.sari.sari-x-circle')
        .exists(),
    ).toBeTruthy()
  })

  test('readonly', async () => {
    const wrapper = mount(
      h(Upload, {
        modelValue: [
          {
            url: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg',
          },
        ],
        readonly: true,
      }),
    )

    expect(
      wrapper.find('.sar-upload.sar-upload_readonly').exists(),
    ).toBeTruthy()

    vi.stubGlobal('tempFiles', [mockFile()])

    await wrapper.find('.sar-upload__select').trigger('click')

    expect(wrapper.findAll('image').length).toBe(1)
  })

  test('disabled', async () => {
    const wrapper = mount(
      h(Upload, {
        modelValue: [
          {
            url: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg',
          },
        ],
        disabled: true,
      }),
    )

    expect(
      wrapper.find('.sar-upload.sar-upload_disabled').exists(),
    ).toBeTruthy()

    vi.stubGlobal('tempFiles', [mockFile()])

    await wrapper.find('.sar-upload__select').trigger('click')

    expect(wrapper.findAll('image').length).toBe(1)
  })

  test('customSelect', async () => {
    const wrapper = mount(
      h(
        Upload,
        {},
        {
          select: () => h('div', { class: 'content' }, '内容'),
        },
      ),
    )

    expect(wrapper.find('.sar-upload__select .content').text()).toBe('内容')
  })
})
