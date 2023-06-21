import {
  Children,
  cloneElement,
  FC,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react'

export const ENTERING = 'entering'
export const ENTERED = 'entered'
export const EXITING = 'exiting'
export const EXITED = 'exited'

type Status = 'entering' | 'entered' | 'exiting' | 'exited'

export interface TransitionProps {
  in?: boolean
  children?:
    | ReactElement
    | ((status: Status, props: { [p: string]: any }) => ReactElement | null)
  mountOnEnter?: boolean
  unmountOnExit?: boolean
  appear?: boolean
  enter?: boolean
  exit?: boolean
  timeout?: number | { enter?: number; exit?: number; appear?: number }
  onEnter?: () => void
  onEntering?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExiting?: () => void
  onExited?: () => void
  mergeProps?: (props: any, restProps: any) => any
  [p: string]: any
}

interface NextCallback {
  (): void
  cancel: () => void
}

function noop() {
  null
}

export const Transition: FC<TransitionProps> = (props) => {
  const {
    children,
    in: _in = false,
    mountOnEnter = false,
    unmountOnExit = false,
    appear = false,
    enter = true,
    exit = true,
    timeout,

    onEnter = noop,
    onEntering = noop,
    onEntered = noop,

    onExit = noop,
    onExiting = noop,
    onExited = noop,

    mergeProps,

    ...restProps
  } = props

  const willAppear = useRef(false)
  const initialUnmount = useRef(false)
  const [status, setStatus] = useState<Status>(() => {
    if (_in) {
      if (appear) {
        willAppear.current = true
        return EXITED
      } else {
        return ENTERED
      }
    } else {
      if (unmountOnExit || mountOnEnter) {
        initialUnmount.current = true
      }
      return EXITED
    }
  })

  const processing = useRef(false)

  const nextCallback = useRef<NextCallback | null>(null)

  const getTimeouts = () => {
    let exit, enter, appear
    exit = enter = appear = timeout as number

    if (timeout !== undefined && typeof timeout !== 'number') {
      exit = timeout.exit
      enter = timeout.enter
      appear = timeout.appear ?? enter
    }
    return {
      exit,
      enter,
      appear,
    }
  }

  const setNextCallback = (callback: () => void) => {
    let active = true
    nextCallback.current = (() => {
      if (active) {
        active = false
        nextCallback.current = null

        callback()
      }
    }) as NextCallback

    nextCallback.current.cancel = () => {
      active = false
    }
    return nextCallback.current
  }

  const finishNextCallback = (_in: boolean) => {
    if (!nextCallback.current) {
      return
    }
    cancelNextCallback()

    processing.current = false

    if (_in) {
      onExited?.()
    } else {
      onEntered?.()
    }
  }

  const cancelNextCallback = () => {
    if (nextCallback.current) {
      nextCallback.current.cancel()
      nextCallback.current = null
    }
  }

  const onTransitionEnd = (
    timeout: null | number | undefined,
    handler: () => void,
  ) => {
    setTimeout(setNextCallback(handler), timeout || 0)
  }

  useEffect(() => {
    if (_in) {
      if (status !== ENTERING && status !== ENTERED) {
        finishNextCallback(_in)

        setStatus(ENTERING)
        onEnter?.()

        const timeouts = getTimeouts()
        const timeout = willAppear.current
          ? timeouts.appear
          : enter
          ? timeouts.enter
          : 0
        onTransitionEnd(timeout, () => {
          setStatus(ENTERED)
        })

        if (willAppear.current) {
          willAppear.current = false
        }
      }

      if (status === ENTERING && !processing.current) {
        processing.current = true
        onEntering?.()
      }

      if (status === ENTERED && processing.current) {
        processing.current = false
        onEntered?.()
      }
    } else {
      if (status !== EXITING && status !== EXITED) {
        finishNextCallback(_in)

        setStatus(EXITING)
        onExit?.()

        onTransitionEnd(exit ? getTimeouts().exit : 0, () => {
          setStatus(EXITED)
        })
      }

      if (status === EXITING && !processing.current) {
        processing.current = true
        onExiting?.()
      }

      if (status === EXITED && processing.current) {
        processing.current = false
        onExited?.()
      }
    }
  })

  useEffect(() => {
    initialUnmount.current = false
    return cancelNextCallback
  }, [])

  if (initialUnmount.current || (status === EXITED && unmountOnExit)) {
    return null
  }

  if (typeof children === 'function') {
    return children(status, restProps)
  }

  if (!children) {
    return null
  }

  const element = Children.only(children)
  return cloneElement(
    element,
    mergeProps ? mergeProps(element.props, restProps) : restProps,
  )
}

export default Transition
