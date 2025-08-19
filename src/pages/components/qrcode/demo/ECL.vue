<template>
  <sar-segmented v-model="ecl" :options="eclOptions" class="mb-20" />

  <sar-qrcode
    text="https://sard.wzt.zone/sard-uniapp-docs/mobile/"
    :ecl="ecl"
  />
</template>

<script lang="ts" setup>
import { type QrcodeECL } from 'sard-uniapp'
import { ref } from 'vue'

const eclOptions: QrcodeECL[] = ['L', 'M', 'Q', 'H']
const ecl = ref<QrcodeECL>('M')
</script>
