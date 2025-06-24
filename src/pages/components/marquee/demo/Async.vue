<template>
  <sar-marquee root-style="height: 200rpx">
    <view
      v-for="(item, i) in data"
      :key="i"
      style="
        display: flex;
        justify-content: space-between;
        margin-bottom: 16rpx;
      "
    >
      <view>{{ item }}</view>
      <view>06-18</view>
    </view>
  </sar-marquee>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const genData = () => {
  return '赵钱孙李周吴郑王'.split('').map((item) => `恭喜${item}**获得丰厚奖品`)
}

const data = ref<string[]>([])

onMounted(() => {
  setTimeout(() => {
    data.value = [...genData(), ...genData()]
  }, 500)
})
</script>
