<template>
  <sar-list card>
    <sar-list-item arrow hover title="成功通知" @click="showSucessNotice" />
    <sar-list-item arrow hover title="警告通知" @click="showWarningNotice" />
    <sar-list-item arrow hover title="错误通知" @click="showErrorNotice" />
    <sar-list-item arrow hover title="隐藏通知" @click="hideNotice" />
  </sar-list>
</template>

<script setup lang="ts">
import { notify } from 'sard-uniapp'

const showSucessNotice = () => {
  notify.success('这是一条通知')
}
const showWarningNotice = () => {
  notify.warning('这是一条通知')
}
const showErrorNotice = () => {
  notify.error('这是一条通知')
}
const hideNotice = () => notify.hide()
</script>
