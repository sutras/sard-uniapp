<template>
  <sar-grid bordered clickable>
    <sar-grid-item
      v-for="name in inbuiltIcons"
      :key="name"
      :icon="name"
      :text="name"
      @click="onClick(name)"
    />
  </sar-grid>
</template>

<script setup lang="ts">
const inbuiltIcons = [
  'loading',
  'volume-up',
  'play',
  'caret-down',
  'caret-left',
  'caret-right',
  'caret-up',
  'backspace',
  'record-circle',
  'file',
  'x-circle-fill',
  'square',
  'check-square-fill',
  'image',
  'star',
  'star-fill',
  'x-circle',
  'circle-fill',
  'empty',
  'warning-fill',
  'info-circle-fill',
  'question-circle-fill',
  'x-octagon-fill',
  'check-circle-fill',
  'person',
  'fail',
  'success',
  'close',
  'question',
  'info',
  'minus',
  'plus',
  'up',
  'down',
  'left',
  'right',
  'search',
  'circle',
]

const onClick = (name: string) => {
  uni.setClipboardData({
    data: name,
    showToast: true,
  })
}
</script>

<style lang="scss" scoped>
:deep() {
  .sar-grid__content {
    justify-content: flex-start;
  }
}
</style>
