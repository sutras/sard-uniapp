const strategies: {
  [key: string]: (data: any) => void
} = {
  route(data: string) {
    const pages = getCurrentPages()
    const toRoute = pages.length < 2 ? uni.navigateTo : uni.redirectTo
    toRoute({
      url: `/pages/components/${data}/index`,
    })
  },

  hashchange(data: string) {
    const titles = document.querySelectorAll('.doc-demo__title')

    ;[...titles].some((el) => {
      if (el.textContent.replace(/\s/g, '') === data) {
        window.scrollBy({
          top: el.getBoundingClientRect().top - 60 - 10,
          behavior: 'smooth',
        })
        return true
      }
    })
  },

  theme(data: string) {
    document.documentElement.dataset.sardTheme = data
  },

  getUrl() {
    sendMessage({
      type: 'url',
      data: window.location.href,
    })
  },
}

function sendMessage(message: { type: string; data?: any }) {
  parent.postMessage(message, '*')
}

window.addEventListener(
  'message',
  (
    event: MessageEvent<{
      type: string
      data: any
    }>,
  ) => {
    const {
      data: { type, data },
    } = event

    const handler = strategies[type]
    if (typeof handler === 'function') {
      handler(data)
    }
  },
)

window.addEventListener('load', () => {
  sendMessage({
    type: 'loaded',
  })
})
