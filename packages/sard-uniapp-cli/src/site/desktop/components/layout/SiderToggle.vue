<template>
  <button type="button" :class="toggleClass" @click="onClick">
    <span></span>
    <span></span>
    <span></span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:show'])

const onClick = () => {
  emit('update:show', true)
}

const toggleClass = computed(() => {
  return [
    'doc-layout-sider-toggle',
    {
      show: props.show,
    },
  ]
})
</script>
