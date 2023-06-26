<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// import useTheme from './use/useTheme'
// useTheme()

import useHash from './use/useHash'
import { useChannel } from './use/useChannel'

const channel = useChannel()

useHash(`.doc-anchor, .doc-catalog-link`, (id) => {
  channel.emit('scrollTo', id)
})
</script>
