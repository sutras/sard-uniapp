<template>
  <sar-marquee direction="horizontal" :speed="100">
    <view
      v-for="(item, i) in data"
      :key="i"
      style="flex: none; margin-right: 16rpx"
    >
      <view>{{ item }}</view>
    </view>
  </sar-marquee>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const genData = () => {
  return '赵钱孙李周吴郑王'.split('').map((item) => `恭喜${item}**获得丰厚奖品`)
}

const data = ref([...genData(), ...genData()])
</script>
