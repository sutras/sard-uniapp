<template>
  <sar-popover
    :options="options"
    @select="onSelect"
    :controller="popover"
    position="right"
  />

  <view @click="onClick" class="popover-box" id="refId">box</view>
</template>

<script setup lang="ts">
import { toast, type MenuOption, usePopover } from 'sard-uniapp'

const popover = usePopover('#refId')

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

const onSelect = (option: MenuOption) => {
  toast(option.text as string)
}

const onClick = () => {
  popover.show()
}
</script>

<style lang="scss" scoped>
.popover-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200rpx;
  height: 200rpx;
  background-color: var(--sar-orange);
}
</style>
