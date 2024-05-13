<template>
  <view :class="loadMoreClass" :style="loadMoreStyle" @click="onClick">
    <slot v-if="status === 'incomplete'" name="incomplete">
      {{ incompleteText || t('incompleteText') }}
    </slot>
    <slot v-else-if="status === 'loading'" name="loading">
      <sar-loading>
        {{ loadingText || t('loadingText') }}
      </sar-loading>
    </slot>
    <slot v-else-if="status === 'complete'" name="complete">
      {{ completeText || t('completeText') }}
    </slot>
    <slot v-else-if="status === 'error'" name="error">
      {{ errorText || t('errorText') }}
    </slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type LoadMoreProps,
  type LoadMoreSlots,
  type LoadMoreEmits,
  loadMorePropsDefaults,
} from './common'
import { useTranslate } from '../locale'
import SarLoading from '../loading/loading.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<LoadMoreProps>(), loadMorePropsDefaults)

defineSlots<LoadMoreSlots>()

const emit = defineEmits<LoadMoreEmits>()

const bem = createBem('load-more')

// main
const { t } = useTranslate('loadMore')

const onClick = () => {
  if (props.status === 'incomplete') {
    emit('load-more')
  } else if (props.status === 'error') {
    emit('reload')
  }
}

// others
const loadMoreClass = computed(() => {
  return classNames(bem.b(), bem.m(props.status), props.rootClass)
})

const loadMoreStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
