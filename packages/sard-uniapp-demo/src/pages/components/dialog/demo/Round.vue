<template>
  <sar-list card>
    <sar-list-item arrow hover title="显示提示框" @click="showAlert" />
    <sar-list-item arrow hover title="显示确定框" @click="showConfirm" />
  </sar-list>
</template>

<script setup lang="ts">
import { dialog } from 'sard-uniapp'

const showAlert = () => {
  dialog.alert({
    title: '提示',
    message: '此功能暂时无法使用',
    buttonType: 'round',
  })
}

const showConfirm = () => {
  dialog.confirm({
    title: '提示',
    message: '确定删除？',
    buttonType: 'round',
  })
}
</script>
