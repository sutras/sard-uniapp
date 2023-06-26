<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  row: Boolean,
})

const className = computed(() => [
  'doc-layout',
  {
    'doc-layout-has-sider': props.row,
  },
])
</script>

<!-- import { ReactNode, Children, useMemo, CSSProperties } from 'react'
import classNames from 'classnames'
import Sider from './Sider'

export interface LayoutProps {
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export default function Layout(props) {
  const { children, className, style } = props

  const hasSider = useMemo(
    () =>
      Children.toArray(children).some((item) => {
        return (item as any).type === Sider
      }),
    [children],
  )

  return (
    <div
      className={classNames(
        'doc-layout',
        {
          'doc-layout-has-sider': hasSider,
        },
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
} -->
