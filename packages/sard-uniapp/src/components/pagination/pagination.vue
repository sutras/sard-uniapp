<template>
  <view :class="paginationClass" :style="paginationStyle">
    <view
      :class="
        classNames(
          bem.e('item'),
          bem.em('item', 'disabled', innerCurrent === 1),
          bem.e('prev'),
        )
      "
      @click="onPrevClick"
    >
      <slot name="prev">
        {{ t('previous') }}
      </slot>
    </view>
    <view v-if="type === 'simple'" :class="bem.e('ratio')">
      {{ innerCurrent }}/{{ innerPageCount }}
    </view>
    <template v-else>
      <view
        v-for="item in multiItems"
        :key="item.key"
        :class="
          classNames(bem.e('item'), bem.em('item', 'current', item.active))
        "
        @click="onItemClick(item.page)"
      >
        {{ item.text }}
      </view>
    </template>
    <view
      :class="
        classNames(
          bem.e('item'),
          bem.em('item', 'disabled', innerCurrent === innerPageCount),
          bem.e('next'),
        )
      "
      @click="onNextClick"
    >
      <slot name="next">
        {{ t('next') }}
      </slot>
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
import { computed, ref, watch } from 'vue'
import { classNames, stringifyStyle, createBem, minmax } from '../../utils'
import { useTranslate } from '../locale'
import { paginationProps, getPageRange } from './common'

const { t } = useTranslate('pagination')

const props = defineProps(paginationProps)

const emit = defineEmits(['update:current'])

const bem = createBem('pagination')

// main
const innerPageCount = computed(() => {
  return (props.pageCount ?? Math.ceil(props.total / props.pageSize)) || 1
})

const innerCurrent = ref(props.current)

watch(
  () => props.current,
  () => {
    innerCurrent.value = props.current
  },
)

const range = computed(() => {
  return getPageRange(
    innerCurrent.value,
    innerPageCount.value,
    props.pageButtonCount,
  )
})

const onPrevClick = () => {
  if (innerCurrent.value > 1) {
    changeTo(innerCurrent.value - 1)
  }
}

const onNextClick = () => {
  if (innerCurrent.value < innerPageCount.value) {
    changeTo(innerCurrent.value + 1)
  }
}

const onItemClick = (page: number) => {
  changeTo(page)
}

const changeTo = (page: number) => {
  if (page !== innerCurrent.value) {
    innerCurrent.value = page
    emit('update:current', page)
  }
}

const multiItems = computed(() => {
  if (props.type === 'simple') {
    return []
  }

  const length = range.value[1] - range.value[0] + 1

  return Array(length)
    .fill(0)
    .map((_, i) => {
      let page = i + range.value[0]
      const isPrevMulti = i === 0 && page !== 1
      const isNextMulti = i === length - 1 && page !== innerPageCount.value
      const type = isPrevMulti ? -1 : isNextMulti ? 1 : 0

      page =
        type === 0
          ? page
          : minmax(
              innerCurrent.value + type * props.multiCount,
              1,
              innerPageCount.value,
            )

      return {
        active: innerCurrent.value === page,
        page,
        key: i,
        text: props.ellipsis && (isPrevMulti || isNextMulti) ? '...' : page,
      }
    })
})

// others
const paginationClass = computed(() => {
  return classNames(bem.b(), bem.m(props.type), props.rootClass)
})

const paginationStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
