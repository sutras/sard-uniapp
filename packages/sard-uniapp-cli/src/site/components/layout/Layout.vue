<template>
  <div
    :class="[
      'doc-layout',
      {
        'doc-layout-with-sider': row,
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

  &-with-sider {
    flex-direction: row;
  }
}
</style>
