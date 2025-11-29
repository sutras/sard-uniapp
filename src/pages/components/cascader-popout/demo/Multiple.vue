<template>
  <sar-cascader-popout
    v-model="value"
    v-model:visible="visible"
    title="请选择省市区"
    :options="regionData"
    :field-keys="{ label: 'name', value: 'code' }"
    multiple
    all-levels
    check-strictly
    @change="onChange"
  />

  <sar-list card>
    <sar-list-item
      :title="value ? JSON.stringify(value) : '请选择'"
      arrow
      hover
      @click="visible = true"
    />
    <sar-list-item
      title="设置为：[[440000, 440100, 440106], [440000, 440100, 440111]] ([天河区, 白云区])"
      arrow
      hover
      @click="
        value = [
          [440000, 440100, 440106],
          [440000, 440100, 440111],
        ]
      "
    />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getRegionData } from 'region-data'
import { type CascaderOption, type CascaderValue } from 'sard-uniapp'

const regionData = getRegionData()
const visible = ref(false)
const value = ref<CascaderValue | undefined>([
  [440000, 440100, 440106],
  [440000, 440100, 440111],
])

const onChange = (value: any, selectedOptions: CascaderOption[]) => {
  console.log('change', value, selectedOptions)
}
</script>
