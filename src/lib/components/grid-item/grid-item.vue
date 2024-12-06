<template>
  <view :class="itemClass" :style="itemStyle">
    <view :class="bem.e('wrapper')">
      <view
        :class="classNames(bem.e('content'), contentClass)"
        :style="stringifyStyle(contentStyle)"
        @click="onClick"
      >
        <slot>
          <view :class="bem.e('icon')">
            <slot name="icon">
              <sar-icon
                :name="icon"
                :color="iconColor"
                :size="iconSize"
                :family="iconFamily"
              />
            </slot>
          </view>
          <view :class="bem.e('text')">
            <slot name="text">{{ text }}</slot>
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { stringifyStyle, createBem, classNames } from '../../utils'
import {
  type GridItemProps,
  type GridItemSlots,
  type GridItemEmits,
  type GridContext,
  gridSymbol,
} from '../grid/common'
import SarIcon from '../icon/icon.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<GridItemProps>(), {})

defineSlots<GridItemSlots>()

const emit = defineEmits<GridItemEmits>()

const bem = createBem('grid')

// main
const context = inject<GridContext>(gridSymbol) as GridContext

if (!context) {
  throw new Error('GridItem must be included in Grid.')
}

const onClick = (event: any) => {
  emit('click', event)
}

// others
const itemClass = computed(() => {
  return classNames(bem.e('item'), props.rootClass)
})

const itemStyle = computed(() => {
  const width = (1 / context.columns) * 100 + '%'

  const gutter = context.gutter

  return stringifyStyle(
    context.gap
      ? {
          paddingLeft: gutter[0] + gutter[1],
          paddingRight: gutter[0] + gutter[1],
        }
      : null,
    {
      width,
      flexBasis: width,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
