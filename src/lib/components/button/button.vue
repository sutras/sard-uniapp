<template>
  <button
    :class="buttonClass"
    :style="buttonStyle"
    :disabled="isDisabled || loading"
    :hover-class="bem.m('hover')"
    :form-type="formType"
    :open-type="openType"
    :app-parameter="appParameter"
    :hover-stop-propagation="hoverStopPropagation"
    :lang="lang"
    :session-from="sessionFrom"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :send-message-img="sendMessageImg"
    :show-message-card="showMessageCard"
    :group-id="groupId"
    :guild-id="guildId"
    :public-id="publicId"
    @click="onClick"
    @getphonenumber="onGetphonenumber"
    @getuserinfo="onGetuserinfo"
    @error="onError"
    @opensetting="onOpensetting"
    @launchapp="onLaunchapp"
    @contact="onContact"
    @chooseavatar="onChooseavatar"
    @agreeprivacyauthorization="onAgreeprivacyauthorization"
    @addgroupapp="onAddgroupapp"
    @chooseaddress="onChooseaddress"
    @chooseinvoicetitle="onChooseinvoicetitle"
    @subscribe="onSubscribe"
    @login="onLogin"
  >
    <view
      v-if="loading"
      :class="
        classNames(
          bem.e('loading'),
          bem.em('loading', 'with-slot', !!$slots.default),
        )
      "
    >
      <sar-loading :type="loadingType" />
    </view>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarLoading from '../loading/loading.vue'
import { useFormContext } from '../form/common'
import {
  type ButtonProps,
  type ButtonSlots,
  type ButtonEmits,
  defaultButtonProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<ButtonProps>(), defaultButtonProps)

defineSlots<ButtonSlots>()

const emit = defineEmits<ButtonEmits>()

const bem = createBem('button')

// main
const formContext = useFormContext()

const isDisabled = computed(() => {
  return formContext?.disabled || props.disabled
})

const onClick = (event: any) => {
  emit('click', event)
}

const onGetphonenumber = (event: any) => {
  emit('getphonenumber', event)
}

const onGetuserinfo = (event: any) => {
  emit('getuserinfo', event)
}

const onError = (event: any) => {
  emit('error', event)
}

const onOpensetting = (event: any) => {
  emit('opensetting', event)
}

const onLaunchapp = (event: any) => {
  emit('launchapp', event)
}

const onContact = (event: any) => {
  emit('contact', event)
}

const onChooseavatar = (event: any) => {
  emit('chooseavatar', event)
}

const onAgreeprivacyauthorization = (event: any) => {
  emit('agreeprivacyauthorization', event)
}

const onAddgroupapp = (event: any) => {
  emit('addgroupapp', event)
}

const onChooseaddress = (event: any) => {
  emit('chooseaddress', event)
}

const onChooseinvoicetitle = (event: any) => {
  emit('chooseinvoicetitle', event)
}

const onSubscribe = (event: any) => {
  emit('subscribe', event)
}

const onLogin = (event: any) => {
  emit('login', event)
}

// others
const buttonClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(props.size),
    bem.m(props.type),
    bem.m(`${props.type}-${props.theme}`),
    bem.m('round', props.round),
    bem.m('disabled', isDisabled.value),
    bem.m('loading', props.loading),
    bem.m('block', props.inline ? false : props.block),
    props.rootClass,
  )
})

const buttonStyle = computed(() => {
  return stringifyStyle(
    {
      color: props.color,
      background: props.background,
    },
    props.rootStyle,
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
