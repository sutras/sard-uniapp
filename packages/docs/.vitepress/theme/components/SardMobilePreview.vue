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

const previewOrigin = import.meta.env.VITE_H5_LOCAL_URL

const previewLink = computed(() => previewOrigin)

function postRouteMessage() {
  if (
    !previewReady.value ||
    !iframeRef.value?.contentWindow ||
    !componentName.value
  ) {
    return
  }

  iframeRef.value.contentWindow.postMessage(
    {
      type: 'route',
      data: componentName.value,
    },
    '*',
  )
}

function handleMessage(event: MessageEvent<BridgeMessage>) {
  if (event.source !== iframeRef.value?.contentWindow) {
    return
  }

  if (event.data?.type === 'loaded') {
    previewReady.value = true
    postRouteMessage()
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

onMounted(() => {
  window.addEventListener('message', handleMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage)
})
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
      >
        在新窗口打开⤴
      </a>
    </div>
  </section>
</template>
