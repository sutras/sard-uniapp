<template>
  <view>
    <sar-select-popout
      v-model="value"
      v-model:visible="visible"
      title="请选择"
      filterable
      filter-placeholder="请输入过滤关键词"
      v-model:filter-value="filterValue"
      remote
      :remote-method="remoteMethod"
      @change="onChange"
    >
      <sar-select-option
        v-for="item in listData"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      />
    </sar-select-popout>

    <sar-list card>
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
      <sar-list-item title="当前过滤值" :value="filterValue" />
      <sar-list-item title="清空过滤值" arrow hover @click="filterValue = ''" />
      <sar-list-item
        title="设置过滤值为: 中"
        arrow
        hover
        @click="filterValue = '中'"
      />
    </sar-list>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { mapCities } from 'region-data'
import { sleep } from 'sard-uniapp'

const visible = ref(false)
const value = ref<number>()

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

const filterValue = ref('')
</script>
