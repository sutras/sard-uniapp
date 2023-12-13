<template>
  <view style="margin: 0 120rpx">
    <sar-grid :columns="3" clickable>
      <sar-grid-item @click="show('top-start')">TS</sar-grid-item>
      <sar-grid-item @click="show('top')">top</sar-grid-item>
      <sar-grid-item @click="show('top-end')">TE</sar-grid-item>
    </sar-grid>
  </view>

  <view
    style="display: flex; flex-direction: row; justify-content: space-between"
  >
    <sar-grid :columns="1" clickable root-style="width: 120rpx">
      <sar-grid-item @click="show('left-start')">LS</sar-grid-item>
      <sar-grid-item @click="show('left')">left</sar-grid-item>
      <sar-grid-item @click="show('left-end')">LE</sar-grid-item>
    </sar-grid>

    <sar-popover
      :options="options"
      v-model:visible="visible"
      :position="position"
      @select="onSelect"
    >
      <sar-popover-reference
        :root-style="{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '200rpx',
          height: '200rpx',
          margin: 'auto',
          background: 'var(--sar-orange)',
        }"
      >
        box
      </sar-popover-reference>
    </sar-popover>

    <sar-grid :columns="1" clickable root-style="width: 120rpx">
      <sar-grid-item @click="show('right-start')">RS</sar-grid-item>
      <sar-grid-item @click="show('right')">right</sar-grid-item>
      <sar-grid-item @click="show('right-end')">RE</sar-grid-item>
    </sar-grid>
  </view>

  <view style="margin: 0 120rpx">
    <sar-grid :columns="3" clickable>
      <sar-grid-item @click="show('bottom-start')">BS</sar-grid-item>
      <sar-grid-item @click="show('bottom')">bottom</sar-grid-item>
      <sar-grid-item @click="show('bottom-end')">BE</sar-grid-item>
    </sar-grid>
  </view>
</template>

<script setup lang="ts">
import { toast, type MenuOption, type PopoverPosition } from '@sard/uniapp'
import { ref } from 'vue'

const position = ref<PopoverPosition>('bottom')
const visible = ref(false)

const options = [
  {
    text: '选项1',
  },
  {
    text: '选项2',
  },
  {
    text: '选项3',
  },
]

const show = (pos: PopoverPosition) => {
  position.value = pos
  visible.value = true
}

const onSelect = (option: MenuOption) => {
  toast(option.text as string)
}
</script>

<style lang="scss" scoped>
:deep() {
  .sar-grid {
    font-size: var(--sar-text-base);
  }
}
</style>
