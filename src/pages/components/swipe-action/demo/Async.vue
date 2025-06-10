<template>
  <sar-list card>
    <sar-list-item style="padding: 0">
      <sar-swipe-action :disabled="loading">
        <sar-list-item title="右边插槽" value="内容" />
        <template #right="{ hide }">
          <sar-button
            theme="danger"
            square
            inline
            :loading="loading"
            style="height: 100%"
            @click="onDelete(hide)"
          >
            删除
          </sar-button>
          <sar-button
            theme="primary"
            square
            inline
            style="height: 100%"
            @click="hide"
          >
            取消
          </sar-button>
        </template>
      </sar-swipe-action>
    </sar-list-item>
  </sar-list>
</template>

<script lang="ts" setup>
import { dialog } from 'sard-uniapp'
import { ref } from 'vue'

const asyncFetch = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}

const loading = ref(false)

const onDelete = (hide: () => void) => {
  dialog.confirm('确定删除？', {
    onConfirm() {
      loading.value = true
      asyncFetch()
        .then(() => {
          hide()
        })
        .finally(() => {
          loading.value = false
        })
    },
  })
}
</script>
