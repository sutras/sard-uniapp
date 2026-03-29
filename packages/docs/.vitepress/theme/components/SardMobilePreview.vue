<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, withBase } from 'vitepress'

type BridgeMessage = {
  type?: string
  data?: unknown
}

const route = useRoute()
const iframeRef = ref<HTMLIFrameElement | null>(null)
const previewReady = ref(false)

const componentName = computed(() => {
  const matched = route.path.match(
    new RegExp(`^${withBase('/components/')}([^/#?]+?)(?:/)?$`),
  )
  return matched?.[1] ?? ''
})

const isComponentDoc = computed(() => Boolean(componentName.value))

const previewOrigin = import.meta.env.VITE_H5_LOCAL_URL || '/mobile/'

const previewLink = computed(() => previewOrigin)

function sendMessage(message: { type: string; data?: any }) {
  iframeRef.value?.contentWindow?.postMessage(message, '*')
}

function postRouteMessage() {
  sendMessage({
    type: 'route',
    data: componentName.value,
  })
}

function handleMessage(event: MessageEvent<BridgeMessage>) {
  if (event.source !== iframeRef.value?.contentWindow) {
    return
  }

  const { type, data } = event.data || {}

  switch (type) {
    case 'loaded':
      previewReady.value = true
      postRouteMessage()
      setTimeout(() => {
        postHashchangeMessage()
      }, 150)
      break
    case 'url':
      window.open(data as string, '_blank')
      break
    default:
      break
  }
}

watch(componentName, () => {
  postRouteMessage()
})

watch(isComponentDoc, (value) => {
  if (!value) {
    previewReady.value = false
  }
})

const postHashchangeMessage = () => {
  sendMessage({
    type: 'hashchange',
    data: decodeURIComponent(location.hash.slice(1)),
  })
}

onMounted(() => {
  window.addEventListener('message', handleMessage)
  window.addEventListener('hashchange', postHashchangeMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage)
  window.removeEventListener('hashchange', postHashchangeMessage)
})

const handleOpenNewWindow = (event: MouseEvent) => {
  event.preventDefault()
  sendMessage({
    type: 'getUrl',
  })
}
</script>

<template>
  <section v-if="isComponentDoc" class="sard-mobile-preview">
    <iframe
      ref="iframeRef"
      class="sard-mobile-preview__iframe"
      :src="previewOrigin"
      title="Sard Uniapp mobile preview"
    />
    <div class="sard-mobile-preview__toolbar">
      <a
        class="sard-mobile-preview__link"
        :href="previewLink"
        target="_blank"
        rel="noreferrer"
        @click="handleOpenNewWindow"
      >
        在新窗口打开⤴
      </a>
    </div>
  </section>
</template>
