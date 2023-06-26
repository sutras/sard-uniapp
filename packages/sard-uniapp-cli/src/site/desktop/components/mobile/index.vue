<template>
  <div v-if="visible" class="doc-mobile">
    <iframe
      :src="url"
      ref="iframe"
      class="doc-mobile-iframe"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBuildChannel, useChannel } from '../../use/useChannel'

const baseUrl = ref('__MOBILE_URL_PLACEHOLDER__')
const url = ref(baseUrl.value)

const route = useRoute()

const visible = computed(() => {
  return route.matched.some((route) => route.path === '/components')
})

const iframe = ref<HTMLIFrameElement>()

useBuildChannel(iframe)

const channel = useChannel()

const emitRoute = () => {
  channel.emit('route', route.path.replace(/^.*\//, ''))
}

channel.on('loaded', () => {
  emitRoute()
})

watch(
  () => route.path,
  () => {
    emitRoute()
  },
)
</script>

<style>
@import url('./index.scss');
</style>
