import { useLocation } from 'react-router-dom'
import { useDeferredValue, useMemo } from 'react'

export default function RouterTransition({ children }) {
  const location = useLocation()

  const deferred = useDeferredValue(location.pathname)

  return useMemo(() => {
    return children
  }, [deferred])
}
