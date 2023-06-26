import { onMounted, onUnmounted } from 'vue'

export default function useHash(
  selector: string,
  callback?: (id: string) => void,
) {
  const handler = (event: Event) => {
    const element = event.target as HTMLElement

    if (element.matches(selector)) {
      event.preventDefault()

      const targetSelector =
        element.getAttribute('href') || element.dataset.href
      if (targetSelector) {
        const el = document.querySelector(targetSelector)
        if (el) {
          window.scrollBy({
            top: el.getBoundingClientRect().top - 60 - 10,
            behavior: 'smooth',
          })
          callback?.(targetSelector.replace(/^#/, ''))
        }
      }
    }
  }

  onMounted(() => {
    document.addEventListener('click', handler)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}
