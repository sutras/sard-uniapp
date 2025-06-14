<template>
  <sar-list card>
    <sar-list-item>
      <sar-cascader
        v-model="value"
        :options="regionData"
        :field-keys="{ label: 'name', value: 'code' }"
        change-on-select
        @change="onChange"
      />
    </sar-list-item>
    <sar-list-item
      title="当前值："
      :value="JSON.stringify(value) ?? 'undefined'"
    />
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
import { getRegionData } from 'region-data'
import { type CascaderOption } from 'sard-uniapp'

const regionData = getRegionData()
const value = ref<number | undefined>(150102)

const onChange = (value: any, selectedOptions: CascaderOption[]) => {
  console.log('change', value, selectedOptions)
}
</script>
