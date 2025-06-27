<template>
  <sar-sticky-box
    style="
      display: flex;
      align-items: center;
      height: 600rpx;
      background: var(--sar-emphasis-bg);
    "
  >
    <sar-sticky
      :offset-top="offsetTop"
      :offset-bottom="40"
      style="margin-left: 300rpx"
    >
      <sar-button inline background="var(--sar-indigo)">
        容器中的吸顶和吸底
      </sar-button>
    </sar-sticky>
  </sar-sticky-box>
</template>

<script lang="ts" setup>
import { safeAreaTop } from '@/utils'

const offsetTop = safeAreaTop + 50
</script>
