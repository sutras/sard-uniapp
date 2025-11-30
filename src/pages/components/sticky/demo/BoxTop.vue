<template>
  <sar-sticky-box style="height: 400rpx; background: var(--sar-emphasis-bg)">
    <sar-sticky :offset-top="offsetTop" style="margin-left: 300rpx">
      <sar-button inline background="var(--sar-purple)">
        容器中的吸顶
      </sar-button>
    </sar-sticky>
  </sar-sticky-box>
</template>

<script setup lang="ts">
import { safeAreaTop } from '@/utils'

const offsetTop = safeAreaTop + 50
</script>
