<template>
  <sar-marquee root-style="height: 200rpx" ref="marqueeRef">
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
import { nextTick, onMounted, ref } from 'vue'

const genData = () => {
  return '赵钱孙李周吴郑王'.split('').map((item) => `恭喜${item}**获得丰厚奖品`)
}

const data = ref<string[]>([])

const marqueeRef = ref()

onMounted(() => {
  setTimeout(() => {
    data.value = [...genData(), ...genData()]
    nextTick(() => {
      marqueeRef.value?.update()
    })
  }, 500)
})
</script>
