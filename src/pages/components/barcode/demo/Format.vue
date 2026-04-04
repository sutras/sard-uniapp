<template>
  <sar-list card>
    <sar-list-item>
      <sar-segmented
        v-model="format"
        :options="formatOptions"
        :ellipsis="false"
      />
    </sar-list-item>
    <sar-list-item>
      <sar-barcode :value="samples[format]" :format="format" />
    </sar-list-item>
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type BarcodeFormat } from 'sard-uniapp'

const formatOptions: BarcodeFormat[] = ['CODE128', 'EAN13', 'UPC-A', 'ITF14']

const samples: Record<BarcodeFormat, string> = {
  CODE128: 'Hello123',
  EAN13: '590123412345',
  'UPC-A': '12345678901',
  ITF14: '1234567890123',
}

const format = ref<BarcodeFormat>('CODE128')
</script>
