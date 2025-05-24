<template>
  <sar-grid bordered clickable>
    <sar-grid-item
      v-for="name in inbuiltIcons"
      :key="name"
      :icon="name"
      icon-family="sari"
      :text="name"
      @click="onClick(name)"
    />
  </sar-grid>
</template>

<script setup lang="ts">
const inbuiltIcons = [
  'up',
  'down',
  'left',
  'right',
  'caret-up',
  'caret-down',
  'caret-left',
  'caret-right',
  'plus',
  'minus',
  'plus-circle-fill',
  'dash-circle-fill',
  'warning-fill',
  'info-circle-fill',
  'question-circle-fill',
  'x-octagon-fill',
  'success',
  'fail',
  'question',
  'info',
  'backspace',
  'x-circle-fill',
  'x-circle',
  'close',
  'circle',
  'record-circle',
  'check-circle-fill',
  'square',
  'check-square-fill',
  'dash-square-fill',
  'check',
  'dash',
  'star',
  'star-fill',
  'file',
  'image',
  'empty',
  'person',
  'search',
  'list',
  'loading',
  'volume-up',
  'play',
  'pencil-square',
  'trash',
  'backtop',
  'undo',
  'rotate-left',
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
