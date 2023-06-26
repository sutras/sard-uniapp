import deepMerge from './deepMerge.js'
import defaultSardConfig from './defaultSardConfig.js'

export function getMergeSardConfig(config) {
  return deepMerge({}, defaultSardConfig, config)
}
