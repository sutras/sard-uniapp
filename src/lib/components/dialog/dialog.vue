<template>
  <sar-popup
    effect="zoom"
    :visible="visible"
    :duration="duration"
    :root-class="popupClass"
    :root-style="mergedPopupStyle"
    @overlay-click="onOverlayClick"
    @visible-hook="onVisibleHook"
  >
    <view :class="dialogClass" :style="dialogStyle">
      <view v-if="headed" :class="bem.e('header')">
        <view v-if="title" :class="bem.e('title')">
          {{ title }}
        </view>
        <view :class="bem.e('close')">
          <sar-button
            type="pale-text"
            theme="neutral"
            size="large"
            block
            @click="onClose"
          >
            <sar-icon name="close" />
          </sar-button>
        </view>
      </view>

      <view v-if="(!headed && title) || message" :class="bem.e('body')">
        <view v-if="!headed && title" :class="bem.e('title')">
          {{ title }}
        </view>
        <view v-if="message" :class="bem.e('message')">
          {{ message }}
        </view>
      </view>
      <slot></slot>

      <view :class="bem.e('footer')">
        <sar-button
          v-if="showCancel"
          :root-class="bem.e('button')"
          :loading="loading.cancel"
          :type="buttonProps.cancel.type"
          :theme="buttonProps.cancel.theme"
          :size="buttonProps.cancel.size"
          :round="buttonProps.confirm.round"
          block
          v-bind="cancelProps"
          @click="onCancel"
        >
          {{ cancelText || t('cancel') }}
        </sar-button>
        <view
          v-if="showCancel && buttonType === 'text'"
          :class="bem.e('divider')"
        />
        <sar-button
          v-if="showConfirm"
          :root-class="bem.e('button')"
          :loading="loading.confirm"
          :type="buttonProps.confirm.type"
          :theme="buttonProps.confirm.theme"
          :size="buttonProps.confirm.size"
          :round="buttonProps.confirm.round"
          block
          v-bind="confirmProps"
          @click="onConfirm"
        >
          {{ confirmText || t('confirm') }}
        </sar-button>
      </view>
    </view>
  </sar-popup>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  noop,
  isObject,
  isFunction,
} from '../../utils'
import { useTranslate } from '../locale'
import SarPopup from '../popup/popup.vue'
import SarButton from '../button/button.vue'
import SarIcon from '../icon/icon.vue'
import {
  type DialogProps,
  type DialogEmits,
  type DialogSlots,
  defaultDialogProps,
} from './common'
import { type ButtonProps } from '../button'
import { type TransitionHookName } from '../../use'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<DialogProps>(), defaultDialogProps)

defineSlots<DialogSlots>()

const emit = defineEmits<DialogEmits>()

const bem = createBem('dialog')

// main
const { t } = useTranslate('dialog')

const innerVisible = ref(props.visible)

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
  },
)

const loading = ref({
  cancel: false,
  confirm: false,
  close: false,
})

const perhapsClose = (type: 'close' | 'cancel' | 'confirm') => {
  emit(type as any)
  if (isFunction(props.beforeClose)) {
    const result = props.beforeClose(type)
    if (isObject(result) && isFunction(result.then)) {
      loading.value[type] = true

      return result
        .then(() => {
          innerVisible.value = false
          emit('update:visible', false)
        })
        .catch(noop)
        .finally(() => {
          loading.value[type] = false
        })
    } else if (result === false) {
      return
    }
  }

  innerVisible.value = false
  emit('update:visible', false)
}

const onOverlayClick = () => {
  if (props.overlayClosable) {
    perhapsClose('close')
  }
}

const onClose = () => {
  perhapsClose('close')
}

const onConfirm = () => {
  perhapsClose('confirm')
}

const onCancel = () => {
  perhapsClose('cancel')
}

const buttonProps = computed(() => {
  return {
    text: {
      cancel: {
        type: 'text',
        theme: 'neutral',
        size: 'large',
      },
      confirm: {
        type: 'text',
        theme: 'primary',
        size: 'large',
      },
    },
    round: {
      cancel: {
        type: 'pale',
        theme: 'primary',
        round: true,
      },
      confirm: {
        type: 'default',
        theme: 'primary',
        round: true,
      },
    },
  }[props.buttonType] as {
    [p in 'cancel' | 'confirm']: ButtonProps
  }
})

const onVisibleHook = (name: TransitionHookName) => {
  emit('visible-hook', name)
  emit(name as any)
}

// others
const dialogClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m('headed', props.headed),
    bem.m('untitled', !props.title),
    bem.m(props.buttonType),
    props.rootClass,
  )
})

const dialogStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const mergedPopupStyle = computed(() => {
  return stringifyStyle(
    { maxWidth: 'var(--sar-dialog-max-width)' },
    props.popupStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
