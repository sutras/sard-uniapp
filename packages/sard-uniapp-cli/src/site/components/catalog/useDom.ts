import { onMounted, ref } from 'vue'

function getDom(context: Element) {
  return [...context.querySelectorAll('h1, h2, h3, h4')].map((heading) => {
    return `<li data-level="${heading.nodeName.slice(
      1,
    )}"><a class="doc-catalog-link" href="#${
      heading.id
    }">${heading.textContent.replace(/#/g, '')}</a></li>`
  })
}

export function useDom() {
  const dom = ref([])

  onMounted(() => {
    const mainEl = document.querySelector('.doc-layout-main')
    let observer: MutationObserver = null

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

  return dom
}
