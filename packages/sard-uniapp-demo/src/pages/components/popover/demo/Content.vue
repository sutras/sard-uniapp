<template>
  <sar-popover v-model:visible="visible">
    <sar-popover-reference>
      <sar-button>显示气泡弹出框</sar-button>
    </sar-popover-reference>

    <template #content>
      <sar-grid clickable root-style="width: 560rpx">
        <sar-grid-item
          v-for="n in 8"
          :key="n"
          :text="`选项${n}`"
          icon="image"
          @click="onSelect(n)"
        />
      </sar-grid>
    </template>
  </sar-popover>
</template>

<script setup lang="ts">
import { toast } from '@sard/uniapp'
import { ref } from 'vue'

const visible = ref(false)

const onSelect = (n: number) => {
  toast(`选项${n}`)
  visible.value = false
}
</script>
