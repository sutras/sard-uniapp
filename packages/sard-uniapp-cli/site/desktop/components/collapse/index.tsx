import { CSSProperties, FC, ReactNode, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Transition } from '../transition/index'
import useEvent from '../../use/useEvent'

export interface CollapseProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  visible?: boolean
  duration?: number
  onEnter?: () => void
  onEntering?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExiting?: () => void
  onExited?: () => void
}

export const Collapse: FC<CollapseProps> = (props) => {
  const {
    className,
    style,
    children,
    visible,
    duration = 500,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    ...restProps
  } = props

  const timer = useRef(0)

  const elRef = useRef<HTMLDivElement>(null)

  const handleEnter = useEvent(() => {
    onEnter?.()
  })

  const handleEntering = useEvent(() => {
    const el = elRef.current
    if (el) {
      el.classList.add('doc-show')
      const height = el.offsetHeight
      el.style.height = '0px'
      el.offsetHeight
      el.style.height = height + 'px'
      el.classList.add('doc-collapsing')
    }
    onEntering?.()
  })

  const handleEntered = useEvent(() => {
    const el = elRef.current
    if (el) {
      el.classList.remove('doc-collapsing')
      el.style.height = ''
    }
    onEntered?.()
  })

  const handleExit = useEvent(() => {
    onExit?.()
  })

  const handleExiting = useEvent(() => {
    const el = elRef.current
    if (el) {
      const height = el.offsetHeight
      el.style.height = height + 'px'
      el.offsetHeight
      el.style.height = '0px'
      el.classList.add('doc-collapsing')
    }
    onExiting?.()
  })

  const handleExited = useEvent(() => {
    const el = elRef.current
    if (el) {
      el.classList.remove('doc-show', 'doc-collapsing')
      el.style.height = ''
    }
    onExited?.()
  })

  useEffect(() => {
    if (visible && elRef.current) {
      elRef.current.classList.add('doc-show')
    }

    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const collapseClass = classNames('doc-collapse', className)

  const collapseStyle = {
    ...style,
    transitionDuration: duration + 'ms',
  }

  return (
    <Transition
      {...restProps}
      timeout={duration}
      in={visible}
      onEnter={handleEnter}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onExit={handleExit}
      onExiting={handleExiting}
      onExited={handleExited}
    >
      <div ref={elRef} className={collapseClass} style={collapseStyle}>
        {children}
      </div>
    </Transition>
  )
}

export default Collapse
