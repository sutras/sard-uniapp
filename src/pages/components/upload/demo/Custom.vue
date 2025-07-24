<template>
  <sar-upload v-model="fileList" :after-read="afterRead">
    <template #default="{ list, onSelect, onRemove, onImageClick }">
      <sar-space direction="vertical">
        <sar-button @click="onSelect">点击上传</sar-button>
        <view
          v-for="(item, index) in list"
          :key="index"
          class="flex items-center"
        >
          <view
            class="flex flex-1 min-w-0 items-center sbg-secondary p-16 rounded"
          >
            <image
              mode="aspectFill"
              :src="item.url || item.file?.path"
              style="width: 64rpx; height: 64rpx"
              class="flex-none"
              @click="onImageClick(index)"
            />
            <text class="ml-12 truncate">{{ item.name }}</text>
            <view class="flex items-center ml-auto">
              <sar-loading v-if="item.status === 'uploading'" />
              <sar-icon
                v-else-if="item.status === 'failed'"
                name="x-circle"
                color="var(--sar-red)"
              />
              <sar-icon
                v-else-if="item.status === 'done'"
                name="success"
                color="var(--sar-green)"
              />
            </view>
          </view>
          <sar-button
            icon="trash"
            type="pale-text"
            size="small"
            theme="danger"
            @click="onRemove(index, item)"
          />
        </view>
      </sar-space>
    </template>
  </sar-upload>
</template>

<script setup lang="ts">
import type { UploadFileItem } from 'sard-uniapp'
import { ref } from 'vue'

const fileList = ref<UploadFileItem[]>([
  {
    url: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg',
    name: 'pic1.jpg',
    status: 'done',
  },
  {
    url: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic2.jpg',
    name: 'pic2.jpg',
    status: 'uploading',
    message: '正在上传',
  },
  {
    url: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic3.jpg',
    name: 'pic3.jpg',
    status: 'failed',
    message: '上传失败',
  },
])

const afterRead = (fileItem: UploadFileItem) => {
  console.log(fileItem)
  fileItem.status = 'uploading'
  fileItem.message = '正在上传'
  fileList.value = [...fileList.value]

  setTimeout(() => {
    fileItem.status = 'done'
    fileList.value = [...fileList.value]
  }, 1500)
}
</script>
