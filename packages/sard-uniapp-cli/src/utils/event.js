export function createEvent() {
  const queues = {}

  function on(type, handler) {
    let handlers = queues[type]
    if (!handlers) {
      handlers = queues[type] = []
    }
    handlers.push(handler)
  }

  function emit(type, payload) {
    const handlers = queues[type]
    if (handlers) {
      handlers.forEach((handler) => {
        handler(payload)
      })
    }
  }

  function off(type, handler) {
    if (!handler) {
      delete queues[type]
      return
    }
    let handlers = queues[type]
    if (handlers) {
      handlers = queues[type] = handlers.filter((item) => item !== handler)
      if (handlers.length === 0) {
        this.off(type)
      }
    }
  }

  return {
    on,
    emit,
    off,
  }
}
