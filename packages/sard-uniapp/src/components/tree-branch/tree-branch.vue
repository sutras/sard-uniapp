<template>
  <template v-for="(node, index) of nodes" :key="node.key">
    <sar-tree-node v-if="node.visible" :index="index" :node="node" />
  </template>
</template>

<script lang="ts" setup>
import { type TreeBranchProps } from '../tree/common'
import SarTreeNode from '../tree-node/tree-node.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

withDefaults(defineProps<TreeBranchProps>(), {})
</script>
