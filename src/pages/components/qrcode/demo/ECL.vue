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
    />
  </view>
</template>

<script lang="ts" setup>
import { type QrcodeECL } from 'sard-uniapp'
import { ref } from 'vue'

const eclOptions: QrcodeECL[] = ['L', 'M', 'Q', 'H']
const ecl = ref<QrcodeECL>('M')
</script>
