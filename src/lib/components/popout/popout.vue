<template>
  <sar-popup
    effect="slide-bottom"
    :visible="visible"
    :duration="duration"
    :keep-render="keepRender"
    @overlay-click="onOverlayClick"
    @before-enter="onBeforeEnter"
    @after-leave="onAfterLeave"
    @visible-hook="onVisibleHook"
  >
    <view :class="popoutClass" :style="popoutStyle" @transitionend.stop>
      <view :class="classNames(bem.e('header'), bem.em('header', props.type))">
        <view v-if="type === 'compact'" :class="bem.e('button-wrap')">
          <sar-button
            type="pale-text"
            theme="neutral"
            :root-class="classNames(bem.e('header-cancel'))"
            :loading="loading.cancel"
            block
            @click="onCancel"
          >
            <template v-if="cancelText">{{ cancelText }}</template>
            <slot v-else-if="$slots.cancel" name="cancel"></slot>
            <template v-else>{{ t('cancel') }}</template>
          </sar-button>
        </view>
        <slot name="title-prepend"></slot>
        <view :class="bem.e('title')">
          <template v-if="title">
            <text :class="bem.e('title-text')">{{ title }}</text>
          </template>
          <slot v-else-if="$slots.title" name="title"></slot>
        </view>
        <view v-if="type === 'compact'" :class="bem.e('button-wrap')">
          <sar-button
            type="pale-text"
            theme="primary"
            :root-class="classNames(bem.e('header-confirm'))"
            :loading="loading.confirm"
            :disabled="confirmDisabled"
            block
            @click="onConfirm"
          >
            <template v-if="confirmText">{{ confirmText }}</template>
            <slot v-else-if="$slots.confirm" name="confirm"></slot>
            <template v-else>{{ t('confirm') }}</template>
          </sar-button>
        </view>
        <view
          v-if="type === 'loose' && showClose"
          :class="bem.e('close')"
          @click="onCloseClick"
        >
          <sar-button type="pale-text" theme="neutral" size="large" block>
            <sar-icon family="sari" name="close" />
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
          block
          @click="onCancel"
        >
          <template v-if="cancelText">{{ cancelText }}</template>
          <slot v-else-if="$slots.cancel" name="cancel"></slot>
          <template v-else>{{ t('cancel') }}</template>
        </sar-button>
        <sar-button
          v-if="showConfirm"
          type="default"
          theme="primary"
          round
          :loading="loading.confirm"
          :disabled="confirmDisabled"
          block
          @click="onConfirm"
        >
          <template v-if="confirmText">{{ confirmText }}</template>
          <slot v-else-if="$slots.confirm" name="confirm"></slot>
          <template v-else>{{ t('confirm') }}</template>
        </sar-button>
      </view>
    </view>
  </sar-popup>
</template>

<script setup lang="ts">
import { computed, reactive, readonly, ref, watch } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  noop,
  isFunction,
  isObject,
} from '../../utils'
import SarPopup from '../popup/popup.vue'
import SarButton from '../button/button.vue'
import SarIcon from '../icon/icon.vue'
import { usePopupVisibleHookProvide } from '../popup/common'
import { type TransitionHookName } from '../../use'
import { useTranslate } from '../locale'
import {
  type PopoutProps,
  type PopoutSlots,
  type PopoutEmits,
  defaultPopoutProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<PopoutProps>(), defaultPopoutProps)

defineSlots<PopoutSlots>()

const emit = defineEmits<PopoutEmits>()

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

const onVisibleHook = (name: TransitionHookName) => {
  callVisibleHook(name)
  emit('visible-hook', name)
  emit(name as any)
}

const loading = reactive({
  cancel: false,
  confirm: false,
  close: false,
})

const readonlyLoading = readonly(loading)

const asyncSet = new Set<{ valid: boolean }>()

watch(
  innerVisible,
  () => {
    if (innerVisible.value === false) {
      asyncSet.forEach((obj) => {
        obj.valid = false
      })
      Object.assign(loading, {
        cancel: false,
        confirm: false,
        close: false,
      })
    }
  },
  {
    flush: 'sync',
  },
)

const perhapsClose = (type: 'close' | 'cancel' | 'confirm') => {
  emit(type as any)
  if (isFunction(props.beforeClose)) {
    const result = props.beforeClose(type, readonlyLoading)
    if (isObject(result) && isFunction(result.then)) {
      loading[type] = true

      const obj = {
        valid: true,
      }
      asyncSet.add(obj)

      return result
        .then(() => {
          if (obj.valid) {
            innerVisible.value = false
            emit('update:visible', false)
          }
        })
        .catch(noop)
        .finally(() => {
          loading[type] = false
          asyncSet.delete(obj)
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
