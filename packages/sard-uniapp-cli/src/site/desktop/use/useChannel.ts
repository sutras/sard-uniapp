import { Ref, onMounted, onUnmounted } from 'vue'
import { createEvent } from '../../../utils/event'

const event = createEvent()

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

  onMounted(() => {
    if (iframe.value) {
      mWindow = iframe.value.contentWindow
    }
    window.addEventListener('message', handler)
  })

  onUnmounted(() => {
    window.removeEventListener('message', handler)
  })
}

export function useChannel() {
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
