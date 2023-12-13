<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import useTheme from './use/useTheme'
import useHash from './use/useHash'
import { channel } from './utils/channel'

useTheme()

useHash(`.doc-anchor, .doc-catalog-link`, (id) => {
  channel.emit('scrollTo', id)
})
</script>
