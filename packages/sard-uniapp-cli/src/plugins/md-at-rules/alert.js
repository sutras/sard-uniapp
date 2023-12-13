const mapTypeIconName = {
  success: 'bi-hand-thumbs-up',
  danger: 'bi-exclamation-triangle',
  warning: 'bi-exclamation-circle',
  info: 'bi-chat-right-text',
}

const mapTypeTitle = {
  success: '推荐',
  danger: '警告',
  warning: '注意',
  info: '提示',
}

function alert(meta) {
  const type = meta.tagName
  const title = meta.params[0] || ''
  const content = meta.content.replace(/(?:^\s|\s$)/g, '')

  return `<div class="doc-alert ${`doc-alert-${type}`}">
  <div class="doc-alert-title">
    <i class="doc-alert-icon ${mapTypeIconName[type]}"></i>
    ${title || mapTypeTitle[type]}
  </div>
  <div class="doc-alert-content">

${content}

  </div>
</div>`
}

export function success(meta) {
  return alert(meta)
}
success.tagName = 'success'

export function danger(meta) {
  return alert(meta)
}
danger.tagName = 'danger'

export function warning(meta) {
  return alert(meta)
}
warning.tagName = 'warning'

export function info(meta) {
  return alert(meta)
}
info.tagName = 'info'
