<template>
  <sar-picker-popout
    v-model="value"
    v-model:visible="visible"
    title="请选择"
    :columns="regionData"
    :option-keys="{ label: 'name', value: 'code' }"
  />

  <sar-list card>
    <sar-list-item>
      <sar-button @click="visible = true">
        {{ value ? value : '请选择' }}
      </sar-button>
    </sar-list-item>
    <sar-list-item
      title="当前值："
      :value="JSON.stringify(value) ?? 'undefined'"
    />
    <sar-list-item
      title="设置为: 广东省/广州市/白云区"
      arrow
      hover
      @click="value = [440000, 440100, 440111]"
    />
    <sar-list-item title="清空" arrow hover @click="value = undefined" />
  </sar-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getRegionData } from 'region-data'

const regionData = getRegionData()

const visible = ref(false)

const value = ref<number[] | undefined>([150000, 150500, 150522])
</script>
