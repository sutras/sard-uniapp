import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Waterfall from '../waterfall.vue'
import WaterfallItem from '../../waterfall-item/waterfall-item.vue'
import WaterfallLoad from '../../waterfall-load/waterfall-load.vue'
import SimulatedImage from './SimulatedImage.vue'
import { random, sleep } from '../../../utils'

export const text = `黄初三年，余朝京师，还济洛川。古人有言，斯水之神，名曰宓妃。感宋玉对楚王神女之事，遂作斯赋。其辞曰：
    余从京域，言归东藩。背伊阙，越轘辕，经通谷，陵景山。日既西倾，车殆马烦。尔乃税驾乎蘅皋，秣驷乎芝田，容与乎阳林，流眄乎洛川。于是精移神骇，忽焉思散。俯则未察，仰以殊观，睹一丽人，于岩之畔。乃援御者而告之曰：“尔有觌于彼者乎？彼何人斯？若此之艳也！”御者对曰：“臣闻河洛之神，名曰宓妃。然则君王之所见也，无乃是乎？其状若何？臣愿闻之。”
    余告之曰：“其形也，翩若惊鸿，婉若游龙。荣曜秋菊，华茂春松寐归乎东路。`

const getData = () => {
  return Array(3)
    .fill(0)
    .map(() => {
      const min = 20
      const max = 50
      const startIndex = random(0, text.length - max)
      const length = random(min, max)
      return {
        title: text.slice(startIndex, startIndex + length),
        img: {
          width: random(100, 500),
          height: random(100, 500),
        },
      }
    })
}

describe('Waterfall', () => {
  test('basic', async () => {
    const onLoad = vi.fn()
    const onLoadStart = vi.fn()

    mount(
      h(Waterfall, { onLoad, onLoadstart: onLoadStart }, () => {
        return getData().map(() => {
          return h(WaterfallItem, null, {
            default: ({ onLoad }: any) => {
              return [
                h(WaterfallLoad, {}),
                h(SimulatedImage, {
                  meta: {
                    width: 0,
                    height: 0,
                  },
                  onLoad,
                }),
              ]
            },
          })
        })
      }),
    )

    expect(onLoadStart).toHaveBeenCalled()
    await sleep(160)
    expect(onLoad).toHaveBeenCalled()
  })
})
