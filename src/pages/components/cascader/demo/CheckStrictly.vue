<template>
  <sar-list card>
    <sar-list-item>
      <sar-cascader
        v-model="value"
        :options="regionData"
        :field-keys="{ label: 'name', value: 'code' }"
        multiple
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
      title="设置为：[440106, 440111] ([天河区, 白云区])"
      arrow
      hover
      @click="value = [440106, 440111]"
    />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getRegionData } from 'region-data'
import { type CascaderOption, type CascaderValue } from 'sard-uniapp'

const regionData = getRegionData()
const value = ref<CascaderValue | undefined>([440106, 440111])

const onChange = (value: any, selectedOptions: CascaderOption[]) => {
  console.log('change', value, selectedOptions)
}
</script>
