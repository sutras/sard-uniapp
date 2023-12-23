<template>
  <view :class="classNames(bem.e('item'), rootClass)" :style="itemStyle">
    <view :class="bem.e('wrapper')">
      <view :class="bem.e('content')" @click="onClick">
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

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { stringifyStyle, createBem, classNames } from '../../utils'
import { type GridContext, gridSymbol, gridItemProps } from '../grid/common'
import SarIcon from '../icon/icon.vue'

const props = defineProps(gridItemProps)

const emit = defineEmits(['click'])

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
