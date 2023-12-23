<template>
  <Backdrop v-model:visible="innerVisible"></Backdrop>

  <div
    :class="[
      'doc-sideslip',
      `doc-sideslip-${side}`,
      {
        show: innerVisible,
      },
    ]"
  >
    <div class="doc-sideslip-header">
      <div class="doc-sideslip-title">{{ title }}</div>
      <div class="doc-sideslip-close" @click="innerVisible = false">
        <i class="hsi hsi-x-lg"></i>
      </div>
    </div>
    <div class="doc-sideslip-body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Backdrop from './Backdrop.vue'
import { useResize } from '../../use/useResize'

const props = withDefaults(
  defineProps<{
    title?: string
    visible?: boolean
    side?: 'left' | 'right'
  }>(),
  {
    side: 'left',
  },
)

const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
}>()

const innerVisible = computed({
  get() {
    return props.visible
  },
  set(visible) {
    emit('update:visible', visible)
  },
})

useResize(() => {
  if (innerVisible.value && window.innerWidth > 768) {
    innerVisible.value = false
  }
})
</script>

<style lang="scss" scoped>
.doc-sideslip {
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 1010;
    width: 320px;
    max-width: 80vw;
    height: 100vh;
    background-color: var(--doc-emphasis-bg);
    box-shadow: var(--doc-shadow-xl);
    transition: transform 300ms;

    &-left {
      right: 100vw;
      &.show {
        transform: translateX(100%);
      }
    }

    &-right {
      left: 100vw;
      &.show {
        transform: translateX(-100%);
      }
    }

    &-header {
      position: relative;
      display: flex;
      flex-direction: row;
      padding: 16px 24px;

      &::after {
        position: absolute;
        left: 24px;
        right: 24px;
        bottom: 0;
        content: '';
        border-bottom: 1px var(--doc-border-color) solid;
      }
    }

    &-title {
      font-size: var(--doc-text-base);
      font-weight: bold;
    }

    &-close {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: -16px -24px;
      margin-left: auto;
      padding: 16px 24px;
      font-size: var(--doc-text-base);
      cursor: pointer;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }

  @media (min-width: 769px) {
    display: flex;
    margin-left: auto;

    &-header {
      display: none;
    }

    &-body {
      display: flex;
    }
  }
}
</style>
