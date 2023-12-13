import * as ghpages from 'gh-pages'
import { sardConfig } from '../utils/constants.js'

export async function deploy() {
  ghpages.publish(sardConfig.buildSite.outDir)
}
