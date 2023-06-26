<template>
  <div :class="toggleClass" @click="onClick" :ref="elRef"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:show'])

const elRef = ref()

const handler = (event) => {
  if (event) {
    event.preventDefault()
  }
}

onMounted(() => {
  if (elRef.value) {
    elRef.value.addEventListener('touchmove', handler, {
      passive: false,
    })
  }
})

onUnmounted(() => {
  if (elRef.value) {
    elRef.value.removeEventListener('touchmove', handler)
  }
})

const onClick = () => {
  emit('update:show', false)
}

const toggleClass = computed(() => {
  return [
    `doc-layout-backdrop`,
    {
      show: props.show,
    },
  ]
})
</script>

<!-- import classNames from 'classnames'
import { useRef, useEffect } from 'react'

export default function Backdrop({ show, onClick, ...restProps }) {
  const elRef = useRef(null)
  const toggleClass = classNames(`doc-layout-backdrop`, {
    show,
  })

  useEffect(() => {
    const handler = (event) => {
      if (event) {
        event.preventDefault()
      }
    }
    if (elRef.current) {
      elRef.current.addEventListener('touchmove', handler, {
        passive: false,
      })
    }
    return () => {
      if (elRef.current) {
        elRef.current.removeEventListener('touchmove', handler)
      }
    }
  }, [])

  return (
<div
      {...restProps}
      className={toggleClass}
      onClick={onClick}
      ref={elRef}
    ></div>
  )
} -->
