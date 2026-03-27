import { computed, Ref, ref, watch } from 'vue'
import {
  type CascaderPanel,
  type CascaderProps,
  type CascaderStateNode,
} from './common'
import { useTranslate } from '../locale'

export function useCascaderTabs(
  props: CascaderProps,
  config: {
    treeData: Ref<CascaderStateNode[]>
  },
) {
  const { treeData } = config

  const currentTab = ref(0)

  const renderedPane = ref(false)

  const panels = computed(() => {
    let currentPanels: CascaderPanel = {
      nodes: treeData.value,
      selected: null,
    }

    const panels: CascaderPanel[] = [currentPanels]

    while (currentPanels) {
      const node: CascaderStateNode | undefined = currentPanels.nodes.find(
        (node) => node.selected,
      )

      if (node) {
        currentPanels.selected = node
      }

      if (node && node.children && node.children.length) {
        panels.push(
          (currentPanels = {
            nodes: node.children,
            selected: null,
          }),
        )
      } else {
        break
      }
    }

    return panels
  })

  watch(
    panels,
    () => {
      if (!renderedPane.value) {
        setTimeout(() => {
          renderedPane.value = true
          // 确保小程序端已渲染完毕
        }, 30)
      }
    },
    {
      immediate: true,
    },
  )

  const { t } = useTranslate('cascader')

  const innerPaceholder = computed(() => {
    return props.hintText || t('pleaseSelect')
  })

  const tabList = computed(() => {
    return panels.value.map((panel) => {
      const { selected } = panel
      const label = selected ? selected.label : innerPaceholder.value
      return {
        title: label,
      }
    })
  })

  return {
    panels,
    renderedPane,
    currentTab,
    tabList,
  }
}
