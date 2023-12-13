<template>
  <sar-list card>
    <sar-list-item arrow hover title="确定按钮异步关闭" @click="showAlert" />
    <sar-list-item arrow hover title="取消按钮异步关闭" @click="showConfirm" />
  </sar-list>
</template>

<script setup lang="ts">
import { dialog } from '@sard/uniapp'

const showAlert = () => {
  dialog.confirm({
    title: '提示',
    message: '点击确定按钮会在一秒钟后关闭',
    beforeClose: (type) => {
      if (type === 'confirm') {
        return new Promise<void>((resolve) => {
          setTimeout(resolve, 1000)
        })
      }
    },
  })
}

const showConfirm = () => {
  dialog.confirm({
    title: '提示',
    message: '点击取消按钮会在一秒钟后关闭',
    beforeClose: (type) => {
      if (type === 'cancel') {
        return new Promise<void>((resolve) => {
          setTimeout(resolve, 1000)
        })
      }
    },
  })
}
</script>
