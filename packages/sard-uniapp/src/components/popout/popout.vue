<template>
  <sar-popup
    effect="slide-bottom"
    :visible="visible"
    :duration="duration"
    @overlay-click="onOverlayClick"
    @before-enter="onBeforeEnter"
    @after-leave="onAfterLeave"
    @visible-hook="onVisiblecallVisibleHook"
  >
    <view :class="popoutClass" :style="popoutStyle" @transitionend.stop>
      <view :class="classNames(bem.e('header'), bem.em('header', props.type))">
        <view v-if="type === 'compact'" :class="bem.e('button-wrap')">
          <sar-button
            type="pale-text"
            theme="neutral"
            :root-class="classNames(bem.e('header-cancel'))"
            :loading="loading.cancel"
            @click="onCancel"
          >
            <slot name="cancel">
              {{ cancelText || t('cancel') }}
            </slot>
          </sar-button>
        </view>
        <view :class="bem.e('title')">
          <slot name="title">
            <text :class="bem.e('title-text')">{{ title }}</text>
          </slot>
        </view>
        <view v-if="type === 'compact'" :class="bem.e('button-wrap')">
          <sar-button
            type="pale-text"
            theme="primary"
            :root-class="classNames(bem.e('header-confirm'))"
            :loading="loading.confirm"
            :disabled="confirmDisabled"
            @click="onConfirm"
          >
            <slot name="confirm">
              {{ confirmText || t('confirm') }}
            </slot>
          </sar-button>
        </view>
        <view
          v-if="type === 'loose' && showClose"
          :class="bem.e('close')"
          @click="onCloseClick"
        >
          <sar-button type="pale-text" theme="neutral" size="large">
            <sar-icon name="close" />
          </sar-button>
        </view>
      </view>
      <slot></slot>
      <slot name="visible" :whole="wholeVisible" :already="already"></slot>
      <view v-if="showFooter && type === 'loose'" :class="bem.e('footer')">
        <sar-button
          v-if="showCancel"
          type="pale"
          theme="primary"
          round
          :loading="loading.cancel"
          @click="onCancel"
        >
          <slot name="cancel">
            {{ cancelText || t('cancel') }}
          </slot>
        </sar-button>
        <sar-button
          v-if="showConfirm"
          type="default"
          theme="primary"
          round
          :loading="loading.confirm"
          :disabled="confirmDisabled"
          @click="onConfirm"
        >
          <slot name="confirm">
            {{ confirmText || t('confirm') }}
          </slot>
        </sar-button>
      </view>
    </view>
  </sar-popup>
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
import { classNames, stringifyStyle, createBem, noop } from '../../utils'
import SarPopup from '../popup/popup.vue'
import SarButton from '../button/button.vue'
import SarIcon from '../icon/icon.vue'
import { usePopupVisibleHookProvide } from '../popup/common'
import { type TransitionHookName } from '../../use'
import { useTranslate } from '../locale'
import { popoutProps } from './common'

const props = defineProps(popoutProps)

const emit = defineEmits([
  'update:visible',
  'close',
  'cancel',
  'confirm',
  'visible-hook',
])

const bem = createBem('popout')

// main
const { t } = useTranslate('popout')

// visible
const innerVisible = ref(props.visible)

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
  },
)

const already = ref(props.visible)

watch(innerVisible, () => {
  if (!already.value && innerVisible.value) {
    already.value = true
  }
})

const wholeVisible = ref(props.visible)

const onBeforeEnter = () => {
  wholeVisible.value = true
}

const onAfterLeave = () => {
  wholeVisible.value = false
}

const callVisibleHook = usePopupVisibleHookProvide()

const onVisiblecallVisibleHook = (name: TransitionHookName) => {
  emit('visible-hook', name)
  callVisibleHook(name)
}

const loading = ref({
  cancel: false,
  confirm: false,
  close: false,
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

const onCloseClick = () => {
  perhapsClose('close')
}

const onConfirm = () => {
  perhapsClose('confirm')
}

const onCancel = () => {
  perhapsClose('cancel')
}

// others
const popoutClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const popoutStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
