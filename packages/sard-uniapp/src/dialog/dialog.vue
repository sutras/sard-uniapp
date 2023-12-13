<template>
  <Popup
    effect="zoom"
    :visible="visible"
    @overlay-click="onOverlayClick"
    :root-style="{ maxWidth: 'var(--sar-dialog-max-width)' }"
  >
    <view :class="dialogClass" :style="dialogStyle">
      <view v-if="headed" :class="bem.e('header')">
        <view v-if="title" :class="bem.e('title')">
          {{ title }}
        </view>
        <view :class="bem.e('close')">
          <Button
            type="pale-text"
            theme="secondary"
            size="large"
            @click="onClose"
          >
            <Icon name="close" />
          </Button>
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
        <Button
          v-if="showCancel"
          :root-class="bem.e('button')"
          :loading="loading.cancel"
          :type="buttonProps.cancel.type"
          :theme="buttonProps.cancel.theme"
          :size="buttonProps.cancel.size"
          :round="buttonProps.confirm.round"
          @click="onCancel"
        >
          {{ cancelText || t('cancel') }}
        </Button>
        <view
          v-if="showCancel && buttonType === 'text'"
          :class="bem.e('divider')"
        />
        <Button
          v-if="showConfirm"
          :root-class="bem.e('button')"
          :loading="loading.confirm"
          :type="buttonProps.confirm.type"
          :theme="buttonProps.confirm.theme"
          :size="buttonProps.confirm.size"
          :round="buttonProps.confirm.round"
          @click="onConfirm"
        >
          {{ confirmText || t('confirm') }}
        </Button>
      </view>
    </view>
  </Popup>
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
import { classNames, stringifyStyle, createBem, noop } from '../utils'
import { useTranslate } from '../locale'
import Popup from '../popup/popup.vue'
import Button from '../button/button.vue'
import Icon from '../icon/icon.vue'
import { dialogProps } from './common'
import { type ButtonProps } from '../button'

const props = defineProps(dialogProps)

const emit = defineEmits(['update:visible', 'close', 'cancel', 'confirm'])

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
})

const perhapsClose = (type: 'close' | 'cancel' | 'confirm') => {
  emit(type as any)
  if (typeof props.beforeClose === 'function') {
    const result = props.beforeClose(type)
    if (result instanceof Promise) {
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
        theme: 'secondary',
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
</script>

<style lang="scss">
@use './index.scss';
</style>
