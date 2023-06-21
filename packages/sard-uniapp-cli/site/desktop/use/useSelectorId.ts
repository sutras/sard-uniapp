import { useMemo } from 'react'

export function uniqid(prefix = 's_') {
  return prefix + (~~(Math.random() * 10e8)).toString(36)
}

export function useSelectorId() {
  return useMemo(() => uniqid(), [])
}

export default useSelectorId
