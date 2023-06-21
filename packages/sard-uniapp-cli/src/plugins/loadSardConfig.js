import fse from 'fs-extra'
import { resolve } from 'node:path'
import {
  CWD,
  SARD_CONFIG_NAME,
  VIRTUAL_SARD_CONFIG,
} from '../utils/constants.js'

const resolvedModuleId = '\0' + VIRTUAL_SARD_CONFIG

export function loadSardConfig() {
  return {
    name: 'loadSardConfig',
    enforce: 'pre',
    resolveId(id) {
      if (id === VIRTUAL_SARD_CONFIG) {
        return resolvedModuleId
      }
    },
    load(id) {
      if (id === resolvedModuleId) {
        return fse.readFileSync(resolve(CWD, SARD_CONFIG_NAME)).toString()
      }
    },
  }
}
