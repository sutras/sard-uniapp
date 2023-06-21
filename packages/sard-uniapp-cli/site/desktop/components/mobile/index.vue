<template>
  <div v-if="visible" class="doc-mobile">
    <iframe :src="url" class="doc-mobile-iframe" frameborder="0"></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const url = ref('__PLACEHOLDER__MOBILE_URL')

const visible = ref(false)

const route = useRoute()

watchEffect(() => {
  visible.value = route.matched.some((route) => route.path === '/components')
})
</script>

<style>
@import url('./index.scss');
</style>
