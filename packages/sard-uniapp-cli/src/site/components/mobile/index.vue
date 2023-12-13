<template>
  <div v-if="visible" class="doc-mobile">
    <iframe
      :src="url"
      ref="iframe"
      class="doc-mobile-iframe"
      frameborder="0"
    ></iframe>
    <div class="doc-mobile-toolbar">
      <div class="doc-mobile-open" @click="openWindown">在新窗口打开⤴</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useBuildChannel, channel } from '../../utils/channel'

const context = inject<any>('theme')

const baseUrl = ref('__MOBILE_URL_PLACEHOLDER__')
const url = ref(baseUrl.value)

function getComponentPathName(path: string) {
  return path.replace(/^.*\//, '')
}

const route = useRoute()

const visible = computed(() => {
  return route.matched.some((route) => route.path === '/components')
})

const iframe = ref<HTMLIFrameElement>()

useBuildChannel(iframe)

const emitRoute = () => {
  channel.emit('route', route.path.replace(/^.*\//, ''))
}

channel.on('loaded', () => {
  emitRoute()
  channel.emit('theme', context.theme.value)
})

watch(
  () => route.path,
  () => {
    emitRoute()
  },
)

const openWindown = () => {
  window.open(
    `${baseUrl.value.replace(
      /\/$/,
      '',
    )}/#/pages/components/${getComponentPathName(route.path)}/index`,
  )
}
</script>

<style lang="scss">
.doc-mobile {
  position: sticky;
  top: calc(var(--doc-navbar-height) + 16px);
  width: var(--doc-mobile-width);
  height: calc(var(--doc-mobile-height) + 32px);
  border: 1px solid var(--doc-border-color);
  border-radius: var(--doc-rounded-xl);
  overflow: hidden;

  &-iframe {
    display: block;
    width: var(--doc-mobile-width);
    height: var(--doc-mobile-height);
    border: none;
  }

  &-toolbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 32px;
    padding: 0 16px;
    border-top: 1px solid var(--doc-border-color);
    background-color: var(--doc-emphasis-bg);
  }

  &-open {
    margin-left: auto;
    font-size: var(--doc-text-sm);
    cursor: pointer;
  }

  @media (max-width: 980px) {
    display: none;
  }

  @media (max-width: 1440px) {
    margin-right: 20px;
  }
}
</style>
