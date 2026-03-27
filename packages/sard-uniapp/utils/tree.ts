type TNode = {
  children?: TNode[]
  parent: TNode | null
  checked: boolean
  indeterminate: boolean
  key: number | string
  [k: string]: any
}

export function walkDescendant<T extends TNode>(
  node: T,
  callback: (node: T) => boolean | void | undefined,
) {
  if (!callback(node) && node.children) {
    node.children.forEach((node) => {
      walkDescendant(node as T, callback)
    })
  }
}

export function walkAncestor<T extends TNode>(
  node: T | null,
  callback: (node: T) => void,
) {
  if (node) {
    callback(node)
    walkAncestor(node.parent as T, callback)
  }
}

export function walkNodes<T extends TNode>(
  nodes: T[],
  callback: (node: T) => void,
): void | boolean {
  nodes.forEach((node) => {
    callback(node)
    if (node.children) {
      walkNodes(node.children as T[], callback)
    }
  })
}

export function getNodeLevel<T extends TNode>(node: T) {
  let level = 0
  while (node.parent) {
    level++
    node = node.parent as T
  }
  return level
}

export function setCheckedRecursively<T extends TNode>(
  node: T,
  checked: boolean,
  strictly?: boolean,
) {
  if (strictly) {
    node.checked = checked
  } else {
    walkDescendant(node, (node) => {
      node.checked = checked
      node.indeterminate = false
    })
    updateAncestorsChecked(node.parent)
  }
}

export function updateAncestorsChecked<T extends TNode>(
  parentNode: T | null,
  strictly?: boolean,
) {
  if (!strictly) {
    walkAncestor(parentNode, (node) => {
      const children = node.children || []
      const numChecked = children.filter((node) => node.checked).length
      node.checked = numChecked > 0 && numChecked === children.length
      node.indeterminate =
        !node.checked &&
        (numChecked > 0 || children.some((node) => node.indeterminate))
    })
  }
}

export function initializeCheckNodes<T extends TNode>(
  nodes: T[],
  treeMap: Record<string | number, T>,
  keys: (string | number)[],
  strictly?: boolean,
) {
  if (strictly) {
    const mapKeys = keys.reduce<Record<string | number, true>>((map, key) => {
      map[key] = true
      return map
    }, {})

    walkNodes(nodes, (node) => {
      node.checked = mapKeys[node.key] ? true : false
    })
  } else {
    walkNodes(nodes, (node) => {
      node.checked = false
      node.indeterminate = false
    })

    keys.forEach((key) => {
      const node = treeMap[key]
      if (node && !node.checked) {
        setCheckedRecursively(node, true, strictly)
      }
    })
  }
}

export function getTreeCheckedKeys<T extends TNode>(nodes: T[]) {
  const checkedKeys: (number | string)[] = []
  walkNodes(nodes, (node) => {
    if (node.checked) {
      checkedKeys.push(node.key)
    }
  })
  return checkedKeys
}

export function getTreeHalfCheckedKeys<T extends TNode>(nodes: T[]) {
  const halfCheckedKeys: (number | string)[] = []
  walkNodes(nodes, (node) => {
    if (node.indeterminate) {
      halfCheckedKeys.push(node.key)
    }
  })
  return halfCheckedKeys
}
