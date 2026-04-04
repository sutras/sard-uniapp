import { isObject } from './is'

export function logError(error: unknown) {
  const message =
    error instanceof Error
      ? error.message
      : error && isObject(error) && 'errMsg' in error
        ? error.errMsg
        : String(error)
  console.error(`[Sard Error] ${message}`)
}
