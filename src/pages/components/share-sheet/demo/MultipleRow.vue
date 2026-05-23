<template>
  <sar-button @click="visible = true">显示分享面板</sar-button>
  <sar-share-sheet
    v-model:visible="visible"
    :item-list="itemList"
    show-cancel
    @select="onSelect"
  />
</template>

<script setup lang="ts">
import { toast, type ShareSheetItemProps } from 'sard-uniapp'
import { ref } from 'vue'

const itemList = [
  [
    {
      label: 'Wechat',
      color: '#fff',
      background: '#0bc15f',
      iconFamily: 'demo-icons',
      icon: 'wechat-fill',
    },
    {
      label: 'Alipay',
      color: '#fff',
      background: '#1677ff',
      iconFamily: 'demo-icons',
      icon: 'alipay-fill',
    },
    {
      label: 'Twitter',
      color: '#fff',
      background: '#1d9bf0',
      iconFamily: 'demo-icons',
      icon: 'twitter-fill',
    },
    {
      label: 'Facebook',
      color: '#fff',
      background: '#1877f2',
      iconFamily: 'demo-icons',
      icon: 'facebook-circle-fill',
    },
  ],
  [
    {
      label: 'Spotify',
      color: '#fff',
      background: '#1ed760',
      iconFamily: 'demo-icons',
      icon: 'spotify-fill',
    },
    {
      label: 'Skype',
      color: '#fff',
      background: '#0b64a4',
      iconFamily: 'demo-icons',
      icon: 'skype-fill',
    },
    {
      label: 'Youtube',
      color: '#fff',
      background: '#ff0000',
      iconFamily: 'demo-icons',
      icon: 'youtube-fill',
    },
    {
      label: 'Paypal',
      color: '#fff',
      background: '#0070ba',
      iconFamily: 'demo-icons',
      icon: 'paypal-fill',
    },
    {
      label: 'Whatsapp',
      color: '#fff',
      background: '#128c7e',
      iconFamily: 'demo-icons',
      icon: 'whatsapp-fill',
    },
    {
      label: 'Telegram',
      color: '#fff',
      background: '#0088cc',
      iconFamily: 'demo-icons',
      icon: 'telegram-fill',
    },
    {
      label: 'Snapchat',
      color: '#000',
      background: '#fffc00',
      iconFamily: 'demo-icons',
      icon: 'snapchat-fill',
    },
  ],
]

const visible = ref(false)

const onSelect = (item: ShareSheetItemProps) => {
  toast(item.label)
}
</script>
