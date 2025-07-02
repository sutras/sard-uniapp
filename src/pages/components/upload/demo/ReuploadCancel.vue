<template>
  <sar-upload
    v-model="fileList"
    :after-read="afterRead"
    @change="onChange"
    @item-click="onItemClick"
  />
</template>

<script setup lang="ts">
import { type UploadFileItem } from 'sard-uniapp'
import { ref } from 'vue'

const fileList = ref<UploadFileItem[]>([
  {
    url: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg',
  },
])

const onChange = (value: any) => {
  console.log('change', value)
}

const uploadApi = (options: { getAbort: (abort: () => void) => void }) => {
  return new Promise((_, reject) => {
    options.getAbort(() => {
      reject()
      console.log('终止请求')
    })
    setTimeout(reject, 1500)
  })
}

const abortMap = new WeakMap<UploadFileItem, () => void>()

const uploadFile = async (fileItem: UploadFileItem) => {
  fileItem.status = 'uploading'
  fileItem.message = '正在上传，点击取消'
  fileList.value = [...fileList.value]

  return uploadApi({
    getAbort(abort) {
      abortMap.set(fileItem, abort)
    },
  })
    .then(() => {
      fileItem.status = 'done'
      fileItem.message = '上传成功'
      fileList.value = [...fileList.value]
    })
    .catch(() => {
      fileItem.status = 'failed'
      fileItem.message = '上传失败，点击重新上传'
      fileList.value = [...fileList.value]
    })
}

const afterRead = (fileItem: UploadFileItem) => {
  uploadFile(fileItem)
}

const onItemClick = (fileItem: UploadFileItem) => {
  console.log('item-click', fileItem)

  switch (fileItem.status) {
    case 'failed':
      uploadFile(fileItem)
      break
    case 'uploading':
      abortMap.get(fileItem)?.()
      break
  }
}
</script>
