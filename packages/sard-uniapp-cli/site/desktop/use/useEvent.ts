/**
 * 简化受控组件状态的操作
 * ==========================
 */

import { useRef, useCallback } from 'react'

export function useEvent<T extends (...args: any[]) => any>(callback: T) {
  const callbackRef = useRef<T>()

  callbackRef.current = callback

  return useCallback((...args: any[]) => {
    const callback = callbackRef.current
    return callback?.(...args)
  }, [])
}

export default useEvent
