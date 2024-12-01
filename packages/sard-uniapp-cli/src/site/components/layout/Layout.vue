<template>
  <div
    :class="[
      'doc-layout',
      {
        'doc-layout-horizontal': row,
      },
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  row: Boolean,
})
</script>

<style lang="scss" scoped>
.doc-layout {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.doc-layout-horizontal {
  flex-direction: row;
}
</style>
