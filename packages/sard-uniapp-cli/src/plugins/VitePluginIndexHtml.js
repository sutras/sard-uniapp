import mime from 'mime'
import { sardConfig } from '../utils/constants.js'

const {
  site: { logo, seo, tags },
} = sardConfig

export function VitePluginIndexHtml() {
  return {
    name: 'VitePluginIndexHtml',
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          ...tags,
          {
            tag: 'title',
            children: seo.title,
          },
          {
            tag: 'meta',
            attrs: {
              name: 'description',
              content: seo.description,
            },
          },
          {
            tag: 'link',
            attrs: {
              rel: 'icon',
              type: mime.getType(logo),
              href: logo,
            },
          },
        ],
      }
    },
  }
}
