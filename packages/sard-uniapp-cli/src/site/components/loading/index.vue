<template>
  <div class="doc-loading">加载中...</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

onMounted(() => {
  NProgress.start()
})

onUnmounted(() => {
  NProgress.done()
})
</script>

<style lang="scss">
@import './index.scss';
</style>
