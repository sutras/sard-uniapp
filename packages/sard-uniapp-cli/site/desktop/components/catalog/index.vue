<template>
  <div v-if="visible" class="doc-catalog">
    <ul v-html="dom"></ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const visible = computed(() => {
  return route.matched[1].children?.length > 0
})

function getDom(context: Element) {
  return [...context.querySelectorAll('h1, h2, h3')]
    .map((heading) => {
      return `<li data-level="${heading.nodeName.slice(
        1,
      )}"><a class="doc-catalog-link" href="#${
        heading.id
      }">${heading.textContent.replace(/#/g, '')}</a></li>`
    })
    .join('')
}

let observer: MutationObserver = null
const dom = ref('')

onMounted(() => {
  const mainEl = document.querySelector('.doc-layout-main')

  if (mainEl) {
    dom.value = getDom(mainEl)

    observer = new MutationObserver((mutationRecord) => {
      for (const mutation of mutationRecord) {
        if (mutation.type === 'childList') {
          dom.value = getDom(mainEl)
        }
      }
    })
    observer.observe(mainEl, {
      childList: true,
    })
  }

  return () => {
    observer?.disconnect()
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
