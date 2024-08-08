import { ComponentInternalInstance } from 'vue'

export type ScrollIntoViewPosition = 'start' | 'center' | 'end' | 'nearest'

export interface ScrollIntoViewValueOptions {
  position?: ScrollIntoViewPosition
  startOffset?: number
  endOffset?: number
}

export interface ScrollIntoViewOptions {
  position?: ScrollIntoViewPosition
  startOffset?: number
  endOffset?: number
  duration?: number
}

/**    
```
                      page               
                     ╱ 
    ╭───────────────╮    viewport
  ╭─│─ ─ ─ ─ ─ ─ ─ ─│─╮ ╱  
  │ │ ╭───────────╮ │ │
  │ │ │  element  │ │ │
  │ │ ╰───────────╯ │ │
  ╰─│─ ─ ─ ─ ─ ─ ─ ─│─╯
    │               │
    │               │
    ╰───────────────╯
```

# 参数
- viewportHeight: viewport 高度
- viewportScrollTop: viewport 垂直滚动值
- elementHeight: element 高度
- elementOffsetTop: element 距离页面顶部距离

# 选项
- position: element 在视窗中的位置(start, center, end, nearest)
- startOffset: element 距离视窗顶部的偏移量
- endOffset: element 距离视窗底部的偏移量

# 结果值
- viewportScrollTop: viewport 新的垂直滚动值

*/
export function getScrollIntoViewValue(
  viewportHeight: number,
  viewportScrollTop: number,
  elementHeight: number,
  elementOffsetTop: number,
  options: ScrollIntoViewValueOptions = {},
) {
  const { startOffset = 0, endOffset = 0 } = options

  let position = options.position || 'nearest'

  const elementToViewportTopOffset =
    elementOffsetTop - viewportScrollTop - startOffset
  const elementToViewportBottomOffset =
    elementOffsetTop +
    elementHeight -
    viewportScrollTop -
    viewportHeight +
    endOffset

  if (position === 'nearest') {
    if (elementToViewportTopOffset >= 0 && elementToViewportBottomOffset <= 0) {
      return viewportScrollTop
    } else {
      position =
        Math.abs(elementToViewportTopOffset) >
        Math.abs(elementToViewportBottomOffset)
          ? 'end'
          : 'start'
    }
  }

  let nextScrollTop = 0

  switch (position) {
    case 'start':
      nextScrollTop = elementOffsetTop - startOffset
      break
    case 'center':
      nextScrollTop =
        elementOffsetTop -
        (viewportHeight - elementHeight - endOffset - startOffset) / 2 +
        startOffset
      break
    case 'end':
      nextScrollTop =
        elementOffsetTop + elementHeight - viewportHeight + endOffset
      break
  }

  return nextScrollTop
}

export interface NodeRect {
  top: number
  right: number
  bottom: number
  left: number
  height: number
  width: number
}

/**
 * uni boundingClientRect的 Promise 版本
 * @param selector 组件选择器
 * @param instance 父组件实例
 * @returns Promise<NodeRect>
 */
export function getBoundingClientRect(
  selector: string,
  instance: ComponentInternalInstance | null,
) {
  return new Promise<NodeRect>((resolve) => {
    uni
      .createSelectorQuery()
      .in(instance)
      .select(selector)
      .boundingClientRect((data) => {
        resolve(data as NodeRect)
      })
      .exec()
  })
}

/**
 * 获取可使用窗口尺寸
 * @returns Promise<WindowInfo>
 */
export function getWindowInfo() {
  return new Promise<WindowInfo>((resolve) => {
    uni.getSystemInfo().then((res) => {
      resolve({
        windowWidth: res.windowWidth,
        windowHeight: res.windowHeight,
        windowTop: res.windowTop,
        windowBottom: res.windowBottom,
        statusBarHeight: res.statusBarHeight || 0,
      })
    })
  })
}

export interface WindowInfo {
  windowWidth: number
  windowHeight: number
  windowTop: number
  windowBottom: number
  statusBarHeight: number
}

export interface ViewportScrollInfo {
  scrollLeft: number
  scrollTop: number
}

/**
 * 获取可使用窗口尺寸、滚动信息
 */
export function getViewportScrollInfo() {
  return new Promise<ViewportScrollInfo>((resolve) => {
    uni
      .createSelectorQuery()
      .selectViewport()
      .scrollOffset((res) => {
        resolve(res as ViewportScrollInfo)
      })
      .exec()
  })
}

interface MatchScrollVisibleOptions {
  offset?: number
  errorValue?: number
}

/**
 * @description: 匹配元素列表中第一个位于滚动盒子可视区域的元素
 */
export async function matchScrollVisible(
  rects: NodeRect[],
  callback: (index: number) => unknown,
  options: MatchScrollVisibleOptions = {},
) {
  const { offset: optionOffset = 0, errorValue = 3 } = options
  const offset = optionOffset + errorValue

  for (let i = 0, l = rects.length; i < l; i++) {
    const rect = rects[i]

    if (i === 0) {
      if (rect.top > offset) {
        return callback(i)
      }
    } else if (i > 0 && i < l - 1) {
      if (rect.top > offset) {
        return callback(i - 1)
      } else if (rect.top <= offset && rect.bottom > offset) {
        return callback(i)
      }
    } else {
      return callback(i)
    }
  }
}

export function toTouchEvent(event: MouseEvent | TouchEvent, windowTop = 0) {
  if (!('touches' in event)) {
    ;(event as any).touches = [
      {
        clientX: event.clientX,
        clientY: event.clientY - windowTop,
      },
    ]
  }
  return event as TouchEvent
}
