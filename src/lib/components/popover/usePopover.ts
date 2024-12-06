import { getCurrentInstance, onMounted } from 'vue'
import { type NodeRect, getBoundingClientRect } from '../../utils'
import { type PopoverContext } from './common'

export interface PopoverController {
  show: (getRect?: () => NodeRect | Promise<NodeRect>) => void
  _inject: (value: PopoverContext) => void
}

export function usePopover(selector?: string): PopoverController {
  const instance = getCurrentInstance()
  let context: PopoverContext
  let customGetRect: (() => NodeRect | Promise<NodeRect>) | undefined

  function _inject(value: PopoverContext) {
    context = value
  }

  function getRect() {
    if (customGetRect) {
      const tempGetRect = customGetRect
      customGetRect = undefined
      return tempGetRect()
    }
    if (selector) {
      return getBoundingClientRect(selector, instance)
    }
  }

  onMounted(() => {
    context?.register({
      getRect,
    })
  })

  const show: PopoverController['show'] = (getRectFn) => {
    customGetRect = getRectFn
    if (selector || customGetRect) {
      context?.show()
    }
  }

  return {
    show,
    _inject,
  }
}
