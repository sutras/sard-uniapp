import consola from 'consola'

function addPrefix(msg) {
  return `[sard] ${msg}`
}

export function logSuccess(msg) {
  consola.success(addPrefix(msg))
}

export function logWarning(msg) {
  consola.warn(addPrefix(msg))
}

export function logError(msg) {
  consola.error(addPrefix(msg))
}

export function logFatalError(msg) {
  logError(msg)
  process.exit()
}
