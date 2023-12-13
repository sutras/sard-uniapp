<template>
  <ul class="doc-topnav">
    <template v-for="route in secondLevelRoutes" :key="route.path">
      <li v-if="!route.meta.hidden" class="doc-topnav-item">
        <router-link
          class="doc-topnav-link"
          :active-class="getActiveClass(route.path)"
          :to="route.path"
          @click="emit('link-click')"
        >
          {{ route.meta.title }}
        </router-link>
      </li>
    </template>
    <li class="doc-topnav-divide"></li>
    <li class="doc-topnav-item">
      <a
        class="doc-topnav-link"
        target="_blank"
        rel="noreferrer"
        href="https://github.com/sutras/sard-uniapp"
      >
        <i class="bi-github"></i>
        <span class="doc-topnav-icon-text">Github</span>
      </a>
    </li>
    <li class="doc-topnav-item">
      <a
        class="doc-topnav-link"
        target="_blank"
        rel="noreferrer"
        href="https://gitee.com/sutras/sard-uniapp"
      >
        <i class="bi-github"></i>
        <span class="doc-topnav-icon-text">Gitee</span>
      </a>
    </li>
    <li class="doc-topnav-divide"></li>
    <li class="doc-topnav-item">
      <Theme class="doc-topnav-theme">
        <span class="doc-topnav-icon-text">切换主题</span>
      </Theme>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import Theme from './Theme.vue'

const emit = defineEmits<{
  (e: 'link-click'): void
}>()

const router = useRouter()
const route = useRoute()

const secondLevelRoutes = router.options.routes[0].children

const getActiveClass = (path) => {
  return path === '/' ? (route.path === '/' ? 'active' : '') : 'active'
}
</script>

<style lang="scss" scoped>
.doc-topnav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
  margin-left: auto;
  padding: 0;
  height: 100%;
  list-style: none;

  &-item {
    display: flex;
    height: 100%;
  }

  &-link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 0;
    padding: 0 10px;
    color: inherit;
    text-decoration: none;
    &:hover {
      color: var(--doc-emphasis-color);
      text-decoration: none;
    }
    &.active {
      font-weight: bold;
      color: var(--doc-emphasis-color);
    }
  }

  &-divide {
    width: 1px;
    height: 40%;
    background: var(--doc-border-color);
    margin: 0 10px;
  }

  &-icon-text {
    display: none;
    margin-left: 10px;
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
    align-items: stretch;
    padding: 16px 24px;

    &-item {
      width: 50%;
    }

    &-link {
      width: 100%;
      justify-content: flex-start;
      padding: 8px 0;
    }

    &-divide {
      width: 100%;
      height: 1px;
      margin: 16px 0;
    }

    &-icon-text {
      display: flex;
    }

    .doc-topnav-theme {
      justify-content: flex-start;
      width: 100%;
      padding: 0;
    }
  }
}
</style>
