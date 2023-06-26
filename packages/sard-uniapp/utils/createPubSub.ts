export interface PubSub {
  on(type: string, handler: (...args: any[]) => any): void
  off(type?: string, handler?: (...args: any[]) => any): void
  emit(type: string, ...payload): void
  once(type: string, handler: (...args: any[]) => any): void
}

export function createPubSub(): PubSub {
  const events = {}

  const on: PubSub['on'] = (type, handler) => {
    let handlers
    if (!(handlers = events[type])) {
      handlers = events[type] = new Set()
    }

    handlers.add(handler)
  }

  const off: PubSub['off'] = (type?, handler?) => {
    let handlers
    if (!type) {
      delete events[type]
    }
    if (!(handlers = events[type])) {
      return
    }
    if (!handler) {
      delete events[type]
      return
    }
    handlers.delete(handler)
    if (handlers.size === 0) {
      delete events[type]
    }
  }

  const emit: PubSub['emit'] = (type, ...payload) => {
    let handlers
    if (!(handlers = events[type])) {
      return
    }
    handlers.forEach((handler: (...args: any[]) => any) => {
      handler(...payload)
    })
  }

  const once: PubSub['once'] = (type, handler) => {
    const oldHandler = handler
    handler = () => {
      oldHandler()
      off(type, handler)
    }
  }

  return {
    on,
    off,
    emit,
    once,
  }
}

export const pubSub = createPubSub()
