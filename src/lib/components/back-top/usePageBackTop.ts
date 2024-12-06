import { onPageScroll } from '@dcloudio/uni-app'
import { ref } from 'vue'

export function usePageBackTop(duration = 300) {
  const scrollTop = ref(0)

  onPageScroll((event) => {
    scrollTop.value = event.scrollTop
  })

  const onClick = () => {
    uni.pageScrollTo({
      scrollTop: 0,
      duration,
    })
  }

  return {
    scrollTop,
    onClick,
  }
}
