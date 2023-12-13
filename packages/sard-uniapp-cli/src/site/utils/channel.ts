import { type Ref, onMounted, onUnmounted, watch, inject } from 'vue'
import { createEvent } from '../../utils/event'

const event = createEvent()

function createChannel() {
  return {
    on(type: string, handler: (data) => void) {
      event.on(type, handler)
    },
    off(type: string, handler?: (data) => void) {
      event.off(type, handler)
    },
    emit(type: string, data) {
      sendMessage({
        type,
        data,
      })
    },
  }
}

export const channel = createChannel()

let mWindow: Window

export function sendMessage(message: { type: string; data? }) {
  if (mWindow) {
    mWindow.postMessage(message, '*')
  }
}

export function useBuildChannel(iframe: Ref<HTMLIFrameElement>) {
  const handler = ({
    data: { type, data },
  }: MessageEvent<{
    type: string
    data
  }>) => {
    event.emit(type, data)
  }

  const context = inject<any>('theme')

  watch(
    context.theme,
    () => {
      if (context.theme.value) {
        channel.emit('theme', context.theme.value)
      }
    },
    {
      immediate: true,
    },
  )

  watch(
    iframe,
    () => {
      if (iframe.value) {
        mWindow = iframe.value.contentWindow
      }
    },
    {
      immediate: true,
    },
  )

  onMounted(() => {
    window.addEventListener('message', handler)
  })

  onUnmounted(() => {
    window.removeEventListener('message', handler)
  })
}
