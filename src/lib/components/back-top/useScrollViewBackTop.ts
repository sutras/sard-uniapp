import { ref } from 'vue'

export function useScrollViewBackTop() {
  const scrollTop = ref(0)

  const onScroll = (event: any) => {
    scrollTop.value = event.detail.scrollTop
  }

  const onClick = () => {
    scrollTop.value = 0
  }

  return {
    scrollTop,
    onScroll,
    onClick,
  }
}
