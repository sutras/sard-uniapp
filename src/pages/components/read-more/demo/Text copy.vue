<template>
  <sar-read-more
    :id="id"
    close-text="展开阅读全文"
    open-text="收起节约空间"
    @close="onClose"
  >
    {{ text }}
  </sar-read-more>
</template>

<script lang="ts" setup>
import { uniqid } from 'sard-uniapp'
import { text } from './data'

const id = uniqid()

const onClose = () => {
  uni.pageScrollTo({
    selector: `#${id}`,
    duration: 0,
  })
}
</script>
