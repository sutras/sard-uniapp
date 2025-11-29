import {
  type ComputedRef,
  type Ref,
  computed,
  inject,
  reactive,
  ref,
  shallowRef,
  watch,
} from 'vue'
import {
  cascaderOptionsContextSymbol,
  type CascaderValue,
  type CascaderFieldKeys,
  type CascaderOption,
  type CascaderProps,
  type CascaderStateNode,
} from './common'
import {
  isNumber,
  isString,
  setCheckedRecursively,
  walkAncestor,
  walkNodes,
} from '../../utils'

export function useCascaderTree(
  props: CascaderProps,
  config: {
    fieldKeys: ComputedRef<Required<CascaderFieldKeys>>
    innerValue: Ref<CascaderValue | undefined>
  },
) {
  const { fieldKeys, innerValue } = config
  const options = computed(() => props.options || [])

  const legacyLoadChildren = ref(false)

  const treeData = ref<CascaderStateNode[]>([])

  const originalTreeData = shallowRef<CascaderOption[]>([])

  const loadStatus = ref<'idle' | 'loading' | 'error' | 'loaded'>('loaded')

  const toStateNodes = (
    options: CascaderOption[],
    parent: CascaderStateNode | null,
  ) => {
    const keys = fieldKeys.value
    return options.map((option): CascaderStateNode => {
      const key = option[keys.value]
      const stateNode = reactive<CascaderStateNode>({
        label: option[keys.label],
        value: option[keys.value],
        key,
        disabled: !!option[keys.disabled],
        parent,
        isLeaf: !!option[keys.isLeaf],
        depth: parent ? parent.depth + 1 : 0,
        indeterminate: false,
        checked: false,
        selected: false,
        loadStatus: 'idle',
        option,
      })

      const children = option[keys.children]

      if (children) {
        stateNode.children = toStateNodes(children, stateNode)
      }

      treeMap.value[key] = stateNode

      return stateNode
    })
  }

  const isLeaf = (node: CascaderStateNode) => {
    return node.isLeaf || !Array.isArray(node.children)
  }

  const clearSelected = () => {
    walkNodes(treeData.value, (node) => {
      node.selected = false
    })
  }

  const setAncestorSelected = (node: CascaderStateNode) => {
    walkAncestor(node, (node) => {
      node.selected = true
    })
  }

  const setSelectedByNode = (node: CascaderStateNode) => {
    clearSelected()
    setAncestorSelected(node)
  }

  const clearChecked = () => {
    walkNodes(treeData.value, (node) => {
      node.checked = false
      node.indeterminate = false
    })
  }

  const setCheckedByNode = (node: CascaderStateNode, checked: boolean) => {
    setCheckedRecursively(node, checked, props.checkStrictly)
  }

  const getCheckedLeaves = () => {
    const nodes: CascaderStateNode[] = []

    walkNodes(treeData.value, (node) => {
      if (node.checked && isLeaf(node)) {
        nodes.push(node)
      }
    })

    return nodes
  }

  const getCheckedNodes = () => {
    const nodes: CascaderStateNode[] = []

    walkNodes(treeData.value, (node) => {
      if (node.checked) {
        nodes.push(node)
      }
    })

    return nodes
  }

  const getAncestors = (node: CascaderStateNode) => {
    const nodes: CascaderStateNode[] = []

    walkAncestor(node, (node) => {
      nodes.unshift(node)
    })

    return nodes
  }

  const updateChecked = (value?: CascaderValue) => {
    clearSelected()

    // 多选
    if (props.multiple) {
      clearChecked()

      if (Array.isArray(value)) {
        let lastNode: CascaderStateNode | undefined

        const maySetChecked = (value: unknown) => {
          if (isString(value) || isNumber(value)) {
            const node = treeMap.value[value]
            if (node) {
              lastNode = node
              setCheckedByNode(node, true)
            }
          }
        }

        // 全路径
        if (props.allLevels) {
          value.forEach((item) => {
            if (Array.isArray(item)) {
              maySetChecked(item[item.length - 1])
            }
          })
        }

        // 最后一级
        else {
          value.forEach(maySetChecked)
        }

        if (lastNode) {
          setAncestorSelected(lastNode)
        }
      }
    }

    // 单选
    else {
      const maySetSelected = (value: unknown) => {
        if (isString(value) || isNumber(value)) {
          const node = treeMap.value[value]
          if (node) {
            setAncestorSelected(node)
          }
        }
      }

      // 全路径
      if (props.allLevels) {
        if (Array.isArray(value)) {
          maySetSelected(value[value.length - 1])
        }
      }

      // 最后一级
      else {
        maySetSelected(value)
      }
    }
  }

  const initialize = async () => {
    if (props.lazy && props.load) {
      try {
        loadStatus.value = 'loading'
        const data = await props.load()
        loadStatus.value = 'loaded'
        initializeTree(data)
      } catch {
        loadStatus.value = 'error'
      }
    } else {
      initializeTree(options.value)
    }
  }

  const treeMap = shallowRef<Record<string | number, CascaderStateNode>>({})

  const initializeTree = (data: CascaderOption[]) => {
    if (legacyLoadChildren.value) {
      legacyLoadChildren.value = false
      return
    }

    treeMap.value = {}
    treeData.value = toStateNodes(data, null)
    updateChecked(innerValue.value)
    originalTreeData.value = data
  }

  watch(options, () => {
    initializeTree(options.value)
  })

  const optionsContext = inject(cascaderOptionsContextSymbol, null)

  watch(originalTreeData, () => {
    if (optionsContext) {
      optionsContext.set(originalTreeData.value)
    }
  })

  return {
    treeData,
    originalTreeData,
    loadStatus,
    legacyLoadChildren,
    toStateNodes,
    setSelectedByNode,
    updateChecked,
    setCheckedByNode,
    isLeaf,
    getCheckedLeaves,
    getCheckedNodes,
    getAncestors,
    initialize,
  }
}
