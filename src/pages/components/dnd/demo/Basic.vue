<template>
  <sar-dnd v-model:list="listData">
    <template #default="{ list }">
      <sar-list card>
        <sar-dnd-item
          v-for="({ data, key, itemInfo }, i) in list"
          :item-info="itemInfo"
          :key="key"
        >
          <sar-list-item :title="data.title">
            <template #value>
              <sar-dnd-handle>
                <sar-icon name="list" size="36rpx" />
              </sar-dnd-handle>
            </template>
          </sar-list-item>
          <sar-divider
            v-if="i !== listData.length - 1"
            class="absolute my-0 left-0 right-0 bottom-0"
            style="margin: 0 var(--sar-list-item-padding-x)"
          />
        </sar-dnd-item>
      </sar-list>
    </template>
  </sar-dnd>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const listData = ref(
  Array(10)
    .fill(0)
    .map((_, i) => {
      return {
        title: `标题${i}`,
      }
    }),
)
</script>
