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
  scrollTo(data: string) {
    function attention(el: any) {
      if (el.__flashTimer) {
        clearTimeout(el.__flashTimer)
      }

      el.classList.add('attention')

      el.__flashTimer = setTimeout(() => {
        el.classList.remove('attention')
      }, 1300)
    }

    const titles = document.querySelectorAll('.demo-title')
    Array.prototype.slice.call(titles).some((el) => {
      if (el.textContent.replace(/\s/g, '') === data) {
        window.scrollBy({
          top: el.getBoundingClientRect().top - 60 - 10,
          behavior: 'smooth',
        })
        attention(el.parentNode)
        return true
      }
    })
  },
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

function sendMessage(message: { type: string; data?: any }) {
  parent.postMessage(message, '*')
}

sendMessage({
  type: 'loaded',
})
