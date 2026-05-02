<template>
  <view>
    <sar-list card>
      <sar-list-item>
        <sar-select-input
          v-model="value"
          v-model:visible="visible"
          title="请选择"
          placeholder="请选择"
          filterable
          filter-placeholder="请输入过滤关键词"
          remote
          :remote-method="remoteMethod"
          :options="listData"
          :option-keys="{ label: 'name', value: 'code' }"
          :map-label="mapLabel"
          @change="onChange"
        />
      </sar-list-item>
      <sar-list-item arrow hover @click="visible = true">
        <template #title>
          {{ value ? JSON.stringify(value) : '请选择' }}
        </template>
      </sar-list-item>
      <sar-list-item
        title="设置为：440100 (广州市)"
        arrow
        hover
        @click="value = 440100"
      />
      <sar-list-item title="清空" arrow hover @click="value = undefined" />
    </sar-list>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { mapCities } from 'region-data'
import { sleep } from 'sard-uniapp'

const visible = ref(false)
const value = ref<number>()

const mapLabel = {
  440100: '广州市',
}

const onChange = (value: any) => {
  console.log('change', value)
}

// server
const cities = Object.entries(mapCities).map(([code, name]) => ({
  code: +code,
  name,
}))

const mockRequest = async (query: string, page = 1, pageSize = 10) => {
  await sleep(300)

  const filteredData = query
    ? cities.filter((item) => item.name.includes(query))
    : cities

  const offset = (page - 1) * pageSize
  return {
    list: filteredData.slice(offset, offset + pageSize),
    total: filteredData.length,
  }
}

// client
const listData = ref<
  {
    code: number
    name: string
  }[]
>([])

const remoteMethod = async (
  query: string,
  page: number,
  isRefresh: boolean,
) => {
  return mockRequest(query, page).then(({ list = [], total = 0 }) => {
    if (isRefresh) {
      listData.value = [...list]
    } else {
      listData.value = [...listData.value, ...list]
    }
    return listData.value.length >= total || list.length === 0
  })
}
</script>
