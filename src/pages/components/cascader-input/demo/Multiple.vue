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
        multiple
        all-levels
        check-strictly
        @change="onChange"
      />
    </sar-list-item>
    <sar-list-item title="当前值：">
      <template #value>
        <view class="line-clamp-3">
          {{ JSON.stringify(value) ?? 'undefined' }}
        </view>
      </template>
    </sar-list-item>
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
import { getRegionData, type Node } from 'region-data'
import { type CascaderValue } from 'sard-uniapp'

const regionData = getRegionData()

const options = ref<Node[]>([])
const loading = ref(true)

setTimeout(() => {
  options.value = regionData
  loading.value = false
}, 1500)

const value = ref<CascaderValue | undefined>([
  [440000, 440100, 440106],
  [440000, 440100, 440111],
])

const fieldKeys = { label: 'name', value: 'code' }

const onChange = (value: any, selectedOptions: any) => {
  console.log('change', value, selectedOptions)
}
</script>
