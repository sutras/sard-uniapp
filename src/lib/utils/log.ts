export function logError(error: unknown) {
  const message = error instanceof Error ? error.message : error
  console.error(`[Sard Error] ${message}`)
}
