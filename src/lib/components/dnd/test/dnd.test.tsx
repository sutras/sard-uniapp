import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { h, ref } from 'vue'
import Dnd from '../dnd.vue'
import DndItem from '../../dnd-item/dnd-item.vue'
import DndHandle from '../../dnd-handle/dnd-handle.vue'
import List from '../../list/list.vue'
import ListItem from '../../list-item/list-item.vue'
import Icon from '../../icon/icon.vue'

const listData = ref(
  Array(10)
    .fill(0)
    .map((_, i) => {
      return {
        title: `标题${i}`,
      }
    }),
)

describe('Divider', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(
        Dnd,
        {
          list: listData.value,
          'onUpdate:list': (list: any[]) => (listData.value = list),
        },
        {
          default: ({ list }: any) => {
            return h(List, null, () =>
              list.map(({ key, itemInfo, data }: any) =>
                h(DndItem, { key, itemInfo }, () =>
                  h(
                    ListItem,
                    { title: data.title },
                    {
                      value: () =>
                        h(DndHandle, null, () =>
                          h(Icon, { name: 'list', size: '36px' }),
                        ),
                    },
                  ),
                ),
              ),
            )
          },
        },
      ),
    )

    expect(
      wrapper
        .find(
          '.sar-dnd .sar-list .sar-dnd-item. sar-list-item .sar-list-item__value .sar-dnd-handle .sar-icon',
        )
        .exists(),
    ).toBeTruthy()
  })
})
