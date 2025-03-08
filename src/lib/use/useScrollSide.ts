import { ref } from 'vue'

export function useScrollSide() {
  const scrollSide = ref<'start' | 'center' | 'end' | null>(null)

  let prevScrollTop = 0

  const onScroll = (event: any) => {
    const scrollTop = event.detail.scrollTop
    if (scrollTop === 0) {
      scrollSide.value = 'start'
    } else {
      // 支付宝 lower-threshold 设为0不会触发 scrolltolower
      // 可设 trap-scroll 使到达边界时仍触发 scroll 来判断是否触底
      if (prevScrollTop === scrollTop) {
        scrollSide.value = 'end'
      } else {
        scrollSide.value = 'center'
      }
    }
    prevScrollTop = scrollTop
  }

  const onScrolltoupper = () => {
    scrollSide.value = 'start'
  }

  const onScrolltolower = () => {
    scrollSide.value = 'end'
  }

  return {
    scrollSide,
    onScroll,
    onScrolltoupper,
    onScrolltolower,
  }
}
