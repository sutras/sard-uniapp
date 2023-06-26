<template>
  <button
    :class="buttonClass"
    :style="buttonStyle"
    :disabled="disabled"
    hoverClass="sar-button-hover"
    type="default"
    :formType="formType"
    :openType="openType"
    :hoverStartTime="hoverStartTime"
    :hoverStayTime="hoverStayTime"
    :appParameter="appParameter"
    :hoverStopPropagation="hoverStopPropagation"
    :lang="lang"
    :sessionFrom="sessionFrom"
    :sendMessageTitle="sendMessageTitle"
    :sendMessagePath="sendMessagePath"
    :showMessageCard="showMessageCard"
    :groupId="groupId"
    :guildId="guildId"
    :publicId="publicId"
    :dataImId="dataImId"
    :dataImType="dataImType"
    :dataGoodsId="dataGoodsId"
    :dataOrderId="dataOrderId"
    :dataBizLine="dataBizLine"
    @tap="onClick"
    @getphonenumber="onGetphonenumber"
    @getuserinfo="onGetuserinfo"
    @error="onError"
    @opensetting="onOpensetting"
    @launchapp="onLaunchapp"
    @contact="onContact"
    @chooseavatar="onChooseavatar"
    @addgroupapp="onAddgroupapp"
    @chooseaddress="onChooseaddress"
    @chooseinvoicetitle="onChooseinvoicetitle"
    @subscribe="onSubscribe"
    @login="onLogin"
    @im="onIm"
  >
    <template v-if="loading">
      <Loading size="inherit" color="inherit" :type="loadingType"></Loading>
      <view
        v-if="$slots.loadingText || loadingText"
        class="sar-button-loading-text"
      >
        <slot name="loadingText">
          {{ loadingText }}
        </slot>
      </view>
    </template>
    <slot v-else></slot>
  </button>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import Loading from '../loading/index.vue'
import {
  classNames,
  styleToString,
  type StyleProp,
  type ClassProp,
} from '../../utils'

export interface ButtonOriginalProps {
  formType?: 'submit' | 'reset'
  openType?:
    | 'feedback'
    | 'share'
    | 'getUserInfo'
    | 'contact'
    | 'getPhoneNumber'
    | 'launchApp'
    | 'openSetting'
    | 'chooseAvatar'
    | 'uploadDouyinVideo'
    | 'im'
    | 'getAuthorize'
    | 'lifestyle'
    | 'contactShare'
    | 'openGroupProfile'
    | 'openGuildProfile'
    | 'openPublicProfile'
    | 'shareMessageToFriend'
    | 'addFriend'
    | 'addColorSign'
    | 'addGroupApp'
    | 'addToFavorites'
    | 'chooseAddress'
    | 'chooseInvoiceTitle'
    | 'login'
    | 'subscribe'
    | 'favorite'
    | 'watchLater'
    | 'openProfile'
  hoverStartTime?: number
  hoverStayTime?: number
  appParameter?: string
  hoverStopPropagation?: boolean
  lang?: string
  sessionFrom?: string
  sendMessageTitle?: string
  sendMessagePath?: string
  sendMessageImg?: string
  showMessageCard?: boolean
  groupId?: string
  guildId?: string
  publicId?: string
  dataImId?: string
  dataImType?: string
  dataGoodsId?: string
  dataOrderId?: string
  dataBizLine?: string
}

export interface ButtonProps extends ButtonOriginalProps {
  styles?: StyleProp
  classes?: ClassProp
  type?: 'default' | 'pale' | 'mild' | 'outline' | 'text' | 'pale-text'
  theme?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  size?: 'medium' | 'small' | 'large'
  round?: boolean
  block?: boolean
  disabled?: boolean
  loading?: boolean
  loadingType?: 'clock' | 'circular'
  loadingText?: string
}
const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  theme: 'primary',
  size: 'medium',
})

export interface ButtonOriginalEmits {
  (e: 'getphonenumber', event: any): void
  (e: 'getuserinfo', event: any): void
  (e: 'error', event: any): void
  (e: 'opensetting', event: any): void
  (e: 'launchapp', event: any): void
  (e: 'contact', event: any): void
  (e: 'chooseavatar', event: any): void
  (e: 'addgroupapp', event: any): void
  (e: 'chooseaddress', event: any): void
  (e: 'chooseinvoicetitle', event: any): void
  (e: 'subscribe', event: any): void
  (e: 'login', event: any): void
  (e: 'im', event: any): void
}

export interface ButtonEmits extends ButtonOriginalEmits {
  (e: 'click', event: any): void
}
const emit = defineEmits<ButtonEmits>()

// interface ButtonSlots {
//   default(props: Record<string, never>): any
//   loadingText(props: Record<string, never>): any
// }
// defineSlots<ButtonSlots>()

const disabled = computed(() => {
  return props.disabled || props.loading
})

const buttonClass = computed(() => {
  return classNames(
    'sar-button',
    'sar-button-' + props.theme,
    'sar-button-' + props.type,
    {
      ['sar-button-' + props.size]: props.size !== 'medium',
      'sar-button-round': props.round,
      'sar-button-block': props.block,
      'sar-button-disabled': props.disabled,
      'sar-button-loading': props.loading,
    },
    props.classes,
  )
})

const buttonStyle = computed(() => {
  return styleToString(props.styles)
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
const onIm = (event: any) => {
  emit('im', event)
}
</script>
