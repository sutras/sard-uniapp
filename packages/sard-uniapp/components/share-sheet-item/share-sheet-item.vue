<template>
  <view
    :class="
      classNames(bem.e('item'), bem.em('item', 'disabled', props.disabled))
    "
    @click="onClick"
  >
    <view
      :class="bem.e('icon-wrapper')"
      :style="
        stringifyStyle({
          backgroundColor: props.background,
          color: props.color,
        })
      "
    >
      <template v-if="$slots.icon">
        <slot name="icon" />
      </template>
      <template v-else-if="isImg(props.icon)">
        <image :src="props.icon" mode="aspectFill" :class="bem.e('image')" />
      </template>
      <sar-icon v-else :name="props.icon" :family="props.iconFamily" />
    </view>
    <view :class="bem.e('item-name')">
      <slot name="name">{{ props.name }}</slot>
    </view>
    <view
      v-if="props.description || $slots.description"
      :class="bem.e('item-description')"
    >
      <slot name="description">{{ props.description }}</slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { classNames, stringifyStyle, createBem, isFileUrl } from '../../utils'
import SarIcon from '../icon/icon.vue'
import {
  type ShareSheetItemProps,
  type ShareSheetItemEmits,
  type ShareSheetItemSlots,
} from './common'
import { useShareSheetItem } from '../share-sheet/context'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<ShareSheetItemProps>(), {
  disabled: false,
})

defineSlots<ShareSheetItemSlots>()

const emit = defineEmits<ShareSheetItemEmits>()

const bem = createBem('share-sheet')

const { onItemSelect: triggerItemSelect } = useShareSheetItem(props)

const isImg = (url: any) => {
  return typeof url === 'string' && isFileUrl(url)
}

const onClick = () => {
  if (!props.disabled) {
    emit('click')
    triggerItemSelect()
  }
}
</script>

<style lang="scss">
@import '../share-sheet/index.scss';
</style>
