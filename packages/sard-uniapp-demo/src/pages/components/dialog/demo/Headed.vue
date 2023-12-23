<template>
  <sar-list card>
    <sar-list-item arrow hover title="显示提示框" @click="showAlert" />
    <sar-list-item arrow hover title="显示确定框" @click="showConfirm" />
    <sar-list-item
      arrow
      hover
      title="显示提示框-无标题"
      @click="showAlertNoTitle"
    />
    <sar-list-item
      arrow
      hover
      title="显示确定框-无标题"
      @click="showConfirmNoTitle"
    />
  </sar-list>
</template>

<script setup lang="ts">
import { dialog } from 'sard-uniapp'

const showAlert = () => {
  dialog.alert({
    title: '提示',
    message: '此功能暂时无法使用',
    buttonType: 'round',
    headed: true,
  })
}

const showConfirm = () => {
  dialog.confirm({
    title: '提示',
    message: '确定删除？',
    buttonType: 'round',
    headed: true,
  })
}

const showAlertNoTitle = () => {
  dialog.alert({
    message: '此功能暂时无法使用',
    buttonType: 'round',
    headed: true,
  })
}

const showConfirmNoTitle = () => {
  dialog.confirm({
    message: '确定删除？',
    buttonType: 'round',
    headed: true,
  })
}
</script>
