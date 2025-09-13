<template>
  <sar-fab root-style="--sar-fab-item-btn-font-size: 28rpx">
    <template #default="{ visible }">
      {{ visible ? '关闭' : '打开' }}
    </template>
    <template #list>
      <sar-fab-item
        v-for="item in itemList"
        :key="item.name"
        @click="onClick(item.name)"
      >
        <text>{{ item.name }}</text>
      </sar-fab-item>
    </template>
  </sar-fab>
</template>

<script lang="ts" setup>
import { toast } from 'sard-uniapp'
import { ref } from 'vue'

const itemList = ref([{ name: '首页' }, { name: '分享' }, { name: '收藏' }])

const onClick = (name: string) => {
  toast(`选择了: ${name}`)
}
</script>
