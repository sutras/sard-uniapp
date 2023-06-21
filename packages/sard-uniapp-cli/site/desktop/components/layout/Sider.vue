<template>
  <template v-if="rootRoute.children?.length > 0">
    <div :class="sidebarClass">
      <nav class="doc-sidenav">
        <Items></Items>
      </nav>
    </div>
    <SiderToggle v-model:show="show"></SiderToggle>
    <Backdrop v-model:show="show"></Backdrop>
  </template>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import SiderToggle from './SiderToggle.vue'
import Backdrop from './Backdrop.vue'
import { useRoute, RouterLink } from 'vue-router'
import sardConfig from 'virtual:sard-config'

const {
  site: { routes },
} = sardConfig

const show = ref(false)

const sidebarClass = computed(() => {
  return [
    'doc-layout-sider',
    {
      show: show.value,
    },
  ]
})

const currentRoute = useRoute()

const rootRoute = computed(() => {
  for (let route of routes) {
    if (route.path === currentRoute.matched[1].path) {
      return route
    }
  }
  return null
})

const renderLink = (item) => {
  return h(
    RouterLink,
    {
      key: item.path,
      class: 'doc-sidenav-link',
      exactActiveClass: 'active',
      to: rootRoute.value.path + '/' + item.path,
      onClick() {
        show.value = false
      },
    },
    () =>
      h(
        'span',
        {
          class: 'doc-sidenav-link-title',
        },
        item.title,
      ),
  )
}

const renderItems = (items) => {
  return items.map((item) => {
    if (item.type === 'group') {
      return h(
        'div',
        {
          key: item.title,
          class: 'doc-sidenav-title',
        },
        [
          item.title,
          Array.isArray(item.items) ? renderItems(item.items) : null,
        ],
      )
    }

    return renderLink(item)
  })
}

function Items() {
  return rootRoute.value.children?.length > 0
    ? renderItems(rootRoute.value.children)
    : null
}
</script>
