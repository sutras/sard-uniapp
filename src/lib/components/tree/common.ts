import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'
import { type NodeRect } from '../../utils'

export interface TreeNode {
  title?: string | number
  key?: any
  children?: TreeNode[]
  disabled?: boolean
  [prop: string]: any
}

export interface TreeCleanNode {
  title: string | number
  key: string | number
  children?: TreeCleanNode[]
}

export interface TreeStateNode {
  title: string | number
  key: string | number
  expanded: boolean
  checked: boolean
  children?: TreeStateNode[]
  parent: TreeStateNode | null
  indeterminate: boolean
  level: number
  offsetLevel: number
  visible: boolean
  disabled: boolean
}

export interface TreeNodeKeys {
  title?: string
  key?: string
  children?: string
}

export const defaultNodeKeys = {
  title: 'title',
  key: 'key',
  children: 'children',
}

export interface TreeProps {
  rootStyle?: StyleValue
  rootClass?: string
  data?: TreeNode[]
  nodeKeys?: TreeNodeKeys
  defaultExpandAll?: boolean
  defaultExpandedKeys?: (string | number)[]
  accordion?: boolean
  selectable?: boolean
  checkStrictly?: boolean
  singleSelectable?: boolean
  leafOnly?: boolean
  current?: string | number
  defaultCheckedKeys?: (string | number)[]
  draggable?: boolean
  editable?: boolean
  filterMode?: 'lenient' | 'strict'
  filterMethod?: (value: string, node: TreeStateNode) => boolean
}

export const defaultTreeProps = () => ({
  ...defaultConfig.tree,
  data: () => [],
})

export interface TreeEmits {
  (e: 'update:current', key: string | number, node: TreeStateNode): void
  (e: 'select', key: string | number, node: TreeStateNode): void
  (e: 'check', event: { checked: boolean; node: TreeStateNode }): void
  (e: 'node-click', event: { event: any; node: TreeStateNode }): void
}

export interface TreeExpose {
  setExpanded: (key: string | number, expanded: boolean) => void
  toggleExpanded: (key: string | number) => void
  setExpandedKeys: (keys: (string | number)[]) => void
  getExpandedKeys: () => (string | number)[]
  getCheckedKeys: () => (string | number)[]
  getHalfCheckedKeys: () => (string | number)[]
  setCheckedKeys: (keys: (string | number)[]) => void
  setChecked: (key: string | number, checked: boolean) => void
  addRootNode: () => void
  getCleanTreeData: () => TreeCleanNode[]
  filter: (searchString: string) => void
}

export interface TreeNodeProps {
  node: TreeStateNode
  index: number
}

export interface TreeBranchProps {
  nodes: TreeStateNode[]
}

export interface TreeContext {
  selectable: TreeProps['selectable']
  draggable: TreeProps['draggable']
  editable: TreeProps['editable']
  singleSelectable: TreeProps['singleSelectable']
  leafOnly: TreeProps['leafOnly']
  treeData: TreeStateNode[]
  setExpandedByNode: (node: TreeStateNode, expanded: boolean) => void
  toggleExpandedByNode: (node: TreeStateNode) => void
  toggleCheck: (node: TreeStateNode, checked: boolean) => void
  levelup: (node: TreeStateNode) => void
  leveldown: (node: TreeStateNode) => void
  edit: (node: TreeStateNode, getEditRect: () => Promise<NodeRect>) => void
  drop: (
    dropOriginNode: TreeStateNode,
    dropTargetNode: TreeStateNode,
    position: number,
  ) => void
  currentKey: string | number | undefined
  singleSelect: (node: TreeStateNode) => void
  nodeClick: (node: TreeStateNode, event: any) => void
}

export const treeContextSymbol = Symbol('tree-context')
