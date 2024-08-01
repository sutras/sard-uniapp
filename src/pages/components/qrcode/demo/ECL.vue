<template>
  <view>
    <sar-qrcode
      text="https://sutras.github.io/sard-uniapp-docs/mobile/"
      :ecl="ecl"
    />

    <sar-radio-group
      v-model="ecl"
      :options="eclOptions"
      direction="horizontal"
      root-style="margin-top: 20rpx"
    ></sar-radio-group>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const eclOptions = ['L', 'M', 'Q', 'H']
const ecl = ref('M')
</script>
