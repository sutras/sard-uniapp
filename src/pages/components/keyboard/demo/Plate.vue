<template>
  <view class="flex gap-[10rpx] mb-[10rpx]">
    <sar-button inline @click="plateKeyboard?.toggle('chinese')">
      设置为中文
    </sar-button>
    <sar-button inline @click="plateKeyboard?.toggle('english')">
      设置为英文
    </sar-button>
  </view>
  <sar-keyboard ref="plateKeyboard" type="plate" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { KeyBoardExpose } from 'sard-uniapp'

const plateKeyboard = ref<KeyBoardExpose>()
</script>
