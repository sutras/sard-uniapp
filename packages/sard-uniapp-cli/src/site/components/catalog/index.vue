<template>
  <div v-if="visible" class="doc-catalog">
    <ul v-html="finalDom"></ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDom } from './useDom'
import { useScrollSpy } from './useScrollSpy'

const route = useRoute()

const dom = useDom()
const index = useScrollSpy(dom)

const finalDom = computed(() => {
  const item = dom.value[index.value]
  if (!item) {
    return ''
  }
  return dom.value
    .map((item, i) => {
      return i === index.value
        ? item.replace('doc-catalog-link', 'doc-catalog-link active')
        : item
    })
    .join('')
})

const visible = computed(() => {
  return route.matched[1].children?.length > 0
})
</script>

<style lang="scss">
$vertical-gap: 3px !default;
$indent-gap: 16px !default;

.doc-catalog {
  position: sticky;
  top: var(--doc-navbar-height);
  box-sizing: border-box;
  width: 200px;
  height: calc(100vh - var(--doc-navbar-height));
  padding: 24px;
  overflow-y: auto;

  ul {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
    font-size: var(--doc-text-xs);

    ul {
      margin-top: $vertical-gap;
      padding-left: $indent-gap;
    }
  }

  li {
    margin-bottom: $vertical-gap;
    &[data-level='1'] {
      display: none;
      margin-bottom: 5px;
      padding-bottom: 5px;
      border-bottom: 1px solid var(--doc-border-color);
      font-size: var(--doc-text-base);
    }
    &[data-level='2'] {
      ~ [data-level='3'] {
        padding-left: 16px;
      }
      ~ [data-level='4'] {
        font-size: 12px;
        padding-left: 32px;
      }
    }
  }

  a {
    color: var(--doc-tertiary-color);
    text-decoration: none;
    word-break: break-all;

    &:hover {
      color: var(--doc-emphasis-color);
      text-decoration: underline;
    }

    &.active {
      color: var(--doc-primary);
    }
  }
}

@media (max-width: 1440px) {
  .doc-catalog {
    display: none;
  }
}
</style>
