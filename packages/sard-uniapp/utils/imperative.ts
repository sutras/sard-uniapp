import {
  createElement,
  useState,
  useRef,
  ReactNode,
  useEffect,
  MutableRefObject,
} from 'react'

import { createRoot } from 'react-dom/client'
import { PopupProps } from '../components/popup'

export type AgentProps<
  ComponentProps extends {
    onVisible?: (visible: boolean) => void
    popupProps?: PopupProps
  },
> = {
  id?: string
  $$afterRender?: () => void
  popupProps?: PopupProps
} & ComponentProps

export interface AgentRef<ComponentProps> {
  show(props: ComponentProps): void
  hide(): void
}

export interface MapIdAgent<ComponentProps, ComponentRef> {
  [id: string]: MutableRefObject<AgentRef<ComponentProps> & ComponentRef>
}

export function useAgent<
  ComponentProps extends { onVisible?(visible: boolean): void },
  ComponentRef,
>(
  component,
  agentProps: AgentProps<ComponentProps>,
  mapIdAgent: MapIdAgent<ComponentProps, ComponentRef>,
  defaultId: string,
) {
  const { id = defaultId, $$afterRender, ...restProps } = agentProps

  const [visible, setVisible] = useState(false)
  const [props, setProps] = useState<ComponentProps>()

  const componentRef = useRef<ComponentRef>(null)

  const ref = useRef<ComponentRef & AgentRef<ComponentProps>>()

  useEffect(() => {
    mapIdAgent[id] = ref

    return () => {
      delete mapIdAgent[id]
    }
  }, [id])

  useEffect(() => {
    ref.current = {
      show(props) {
        setProps(props)
        setVisible(true)
      },
      hide() {
        setVisible(false)
      },
      ...componentRef.current,
    }

    $$afterRender?.()
  }, [])

  return createElement(component, {
    ...restProps,
    ...props,
    visible,
    onVisible(visible) {
      setVisible(visible)
      agentProps.onVisible?.(visible)
    },
    ref: componentRef,
  } as any)
}

export function mountComponent() {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const root = createRoot(container)

  return {
    unmount() {
      setTimeout(() => {
        root.unmount()
        document.body.removeChild(container)
      })
    },
    mount(element: ReactNode) {
      root.render(element)
    },
    container,
  }
}

export function mountAgent<ComponentProps, ComponentRef>(
  id: string,
  agent: (
    agentProps: AgentProps<ComponentProps>,
  ) => React.CElement<any, React.Component<any, any, any>>,
  mapIdAgent: MapIdAgent<ComponentProps, ComponentRef>,
  props: ComponentProps,
) {
  const { mount, unmount, container } = mountComponent()

  const element = createElement(agent, {
    id,
    $$afterRender() {
      mapIdAgent[id]?.current?.show(props)
    },
    popupProps: {
      container,
      onExited() {
        unmount()
      },
    },
  } as unknown as AgentProps<ComponentProps>)

  mount(element)
}
