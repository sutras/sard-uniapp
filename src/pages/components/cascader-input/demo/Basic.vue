<template>
  <sar-list card>
    <sar-list-item>
      <sar-cascader-input
        v-model="value"
        title="请选择省市区"
        placeholder="请选择省市区"
        clearable
        :options="options"
        :field-keys="fieldKeys"
        :loading="loading"
        @change="onChange"
      />
    </sar-list-item>

    <sar-list-item title="当前值：" :value="String(value)" />
    <sar-list-item
      title="设置为：440111 (广东省/广州市/白云区)"
      arrow
      hover
      @click="value = 440111"
    />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getRegionData, type Node } from 'region-data'

const regionData = getRegionData()

const options = ref<Node[]>([])
const loading = ref(true)

setTimeout(() => {
  options.value = regionData
  loading.value = false
}, 1500)

const value = ref<number | undefined>(440111)

const fieldKeys = { label: 'name', value: 'code' }

const onChange = (value: any, selectedOptions: any) => {
  console.log('change', value, selectedOptions)
}
</script>
