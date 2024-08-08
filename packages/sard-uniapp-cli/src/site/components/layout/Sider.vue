<template>
  <template v-if="sidebarRoutes.length > 0">
    <Sideslip side="left" :title="sideslipTitle" v-model:visible="innerVisible">
      <div
        :class="[
          'doc-sider',
          {
            show: innerVisible,
          },
        ]"
      >
        <nav class="doc-sidenav">
          <Items></Items>
        </nav>
      </div>
    </Sideslip>
  </template>
</template>

<script setup lang="ts">
import { computed, h, onMounted, VNode, watch } from 'vue'
import { useRoute, RouterLink, RouteRecordRaw } from 'vue-router'
import Sideslip from './Sideslip.vue'

const props = defineProps<{
  visible?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): any
}>()

const innerVisible = computed({
  get() {
    return props.visible
  },
  set(visible) {
    emit('update:visible', visible)
  },
})

const currentRoute = useRoute()

const sidebarRoutes = computed(() => {
  return currentRoute.matched[1]?.children ?? []
})

const sideslipTitle = computed(() => {
  return (currentRoute.matched[1]?.meta?.title || '') as string
})

const renderLink = (item: RouteRecordRaw) => {
  return h(
    RouterLink,
    {
      key: item.path,
      class: 'doc-sidenav-link',
      exactActiveClass: 'active',
      to: item.path,
      onClick() {
        innerVisible.value = false
      },
    },
    () =>
      h(
        'span',
        {
          class: 'doc-sidenav-link-title',
        },
        item.meta!.title as string,
      ),
  )
}

const renderItems = (items: RouteRecordRaw[]): VNode[] => {
  return items.map<VNode>((item, i): any => {
    if (item.meta!.type === 'group') {
      return [
        h(
          'div',
          {
            key: i,
            class: 'doc-sidenav-title',
          },
          item.meta!.title as string,
        ),
        Array.isArray(item.children) && item.children.length > 0
          ? renderItems(item.children)
          : null,
      ]
    }

    return renderLink(item)
  })
}

function Items() {
  return sidebarRoutes.value.length > 0
    ? renderItems(sidebarRoutes.value)
    : null
}

function scrollIntoView() {
  const activeLink = document.querySelector('.doc-sidenav-link.active')
  if (activeLink) {
    activeLink.scrollIntoView({
      block: 'nearest',
      behavior: 'instant',
    })
  }
}

onMounted(() => {
  scrollIntoView()
})

const route = useRoute()

watch(
  () => route.path,
  () => {
    setTimeout(() => {
      scrollIntoView()
    }, 150)
  },
)
</script>

<style lang="scss">
.doc-sider {
  box-sizing: border-box;
  height: calc(100vh - var(--doc-navbar-height));
  flex: none;
  padding: 16px 16px 32px;
  overflow: auto;
  background-color: var(--doc-emphasis-bg);

  @media (min-width: 769px) {
    position: sticky;
    left: 0;
    top: var(--doc-navbar-height);
    z-index: 1010;
    width: var(--doc-sider-width);
    padding: 8px 8px 32px;
    border-right: 1px solid var(--doc-border-color);

    &:not(:hover)::-webkit-scrollbar {
      display: none;
    }
  }
}

.doc-sidenav {
  display: flex;
  flex-direction: column;

  &-title {
    margin-top: 32px;
    margin-bottom: 10px;
    padding: 0 10px;
    font-size: var(--doc-text-xs);
    color: var(--doc-tertiary-color);
  }

  &-link {
    position: relative;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    margin: 5px 0 0;
    color: var(--doc-body-color);
    font-size: var(--doc-text-sm);
    line-height: 1.5;
    white-space: nowrap;
    text-decoration: none;
    border-radius: var(--doc-rounded);

    &:hover {
      text-decoration: none;
      background-color: rgba(var(--doc-blue-rgb), 0.1);
    }
    &.active {
      font-weight: 500;
      color: var(--doc-primary);
      background-color: rgba(var(--doc-blue-rgb), 0.1);
    }

    &-link-value {
      margin-left: 10px;
      font-size: 85%;
      color: var(--doc-gray-600);
    }
  }
}
</style>
