<template>
  <view
    :class="
      classNames(
        bem.e('item'),
        bem.em('item', 'disabled', props.disabled),
        bem.em('item', 'loading', props.loading),
      )
    "
    :style="itemStyle"
    @click="onClick"
  >
    <template v-if="!props.loading">
      <view v-if="$slots.default" :class="bem.e('item-content')">
        <slot />
      </view>
      <template v-else>
        <view :class="bem.e('item-name')">
          <slot name="name">{{ props.name }}</slot>
        </view>
        <view
          v-if="props.description || $slots.description"
          :class="bem.e('item-description')"
        >
          <slot name="description">{{ props.description }}</slot>
        </view>
      </template>
    </template>
    <view v-else :class="bem.e('loading')">
      <sar-loading />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarLoading from '../loading/loading.vue'
import {
  type ActionSheetItemProps,
  type ActionSheetItemEmits,
  type ActionSheetItemSlots,
} from './common'
import { useActionSheetItem } from '../action-sheet/context'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<ActionSheetItemProps>(), {
  loading: false,
  disabled: false,
})

defineSlots<ActionSheetItemSlots>()

const emit = defineEmits<ActionSheetItemEmits>()

const bem = createBem('action-sheet')

const { onItemSelect: triggerItemSelect } = useActionSheetItem(props)

const itemStyle = computed(() => {
  return stringifyStyle({ color: props.color })
})

const onClick = () => {
  if (!props.disabled && !props.loading) {
    emit('click')
    triggerItemSelect()
  }
}
</script>

<style lang="scss">
@import '../action-sheet/index.scss';
</style>
