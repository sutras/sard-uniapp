<template>
  <view>
    <sar-load-more
      :status="status"
      @load-more="toast('加载更多')"
      @reload="toast('重新加载')"
    ></sar-load-more>

    <sar-radio-group v-model="status" root-style="margin-top: 40rpx">
      <template #custom="{ toggle }">
        <sar-list card>
          <sar-list-item
            v-for="(item, i) in statusList"
            :key="i"
            :title="item"
            hover
            @click="toggle(item)"
          >
            <template #icon>
              <sar-radio readonly :value="item" />
            </template>
          </sar-list-item>
        </sar-list>
      </template>
    </sar-radio-group>
  </view>
</template>

<script setup lang="ts">
import { type LoadMoreStatus, toast } from 'sard-uniapp'
import { ref } from 'vue'

const status = ref<LoadMoreStatus>('incomplete')
const statusList = ['incomplete', 'loading', 'complete', 'error']
</script>
