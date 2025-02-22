import { type TreeStateNode } from './common'

export function recurDescendant(
  node: TreeStateNode,
  callback: (node: TreeStateNode) => boolean | void | undefined,
) {
  if (!callback(node) && node.children) {
    node.children.forEach((node) => {
      recurDescendant(node, callback)
    })
  }
}

export function recurAncestor(
  node: TreeStateNode | null,
  callback: (node: TreeStateNode) => void,
) {
  if (node) {
    callback(node)
    recurAncestor(node.parent, callback)
  }
}

export function recurNodes(
  nodes: TreeStateNode[],
  callback: (node: TreeStateNode) => void,
): void | boolean {
  nodes.forEach((node) => {
    callback(node)
    if (node.children) {
      recurNodes(node.children, callback)
    }
  })
}

export function getNodeLevel(node: TreeStateNode) {
  let level = 0
  while (node.parent) {
    level++
    node = node.parent
  }
  return level
}
