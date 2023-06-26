<template>
  <div class="doc-layout-header">
    <h1 class="doc-brand">
      <img :src="logo" alt="" />
      <span>{{ title }}</span>
    </h1>
    <ul class="doc-topnav">
      <li v-for="route in routes" class="doc-topnav-item" :key="route.path">
        <router-link
          class="doc-topnav-link"
          :activeClass="getActiveClass(route.path)"
          :to="route.path"
        >
          {{ route.title }}
        </router-link>
      </li>
      <li class="doc-topnav-divide"></li>
      <li class="doc-topnav-item">
        <!-- <Theme></Theme> -->
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import sardConfig from 'virtual:sard-config'
import Theme from './Theme.vue'

const {
  site: { title, logo, routes },
} = sardConfig

const route = useRoute()

const getActiveClass = (path) => {
  return path === '/' ? (route.path === '/' ? 'active' : '') : 'active'
}
</script>
