<template>
  <sar-button @click="visible = true">显示分享面板</sar-button>
  <sar-share-sheet
    v-model:visible="visible"
    :item-list="itemList"
    cancel="取消"
    @select="onSelect"
  />
</template>

<script setup lang="ts">
import { toast, type ShareSheetItem } from '@sard/uniapp'
import { ref } from 'vue'

const itemList = [
  [
    {
      name: 'Wechat',
      color: '#fff',
      background: '#0bc15f',
      iconFamily: 'demo-icons',
      icon: 'wechat-fill',
    },
    {
      name: 'Alipay',
      color: '#fff',
      background: '#1677ff',
      iconFamily: 'demo-icons',
      icon: 'alipay-fill',
    },
    {
      name: 'Twitter',
      color: '#fff',
      background: '#1d9bf0',
      iconFamily: 'demo-icons',
      icon: 'twitter-fill',
    },
    {
      name: 'Facebook',
      color: '#fff',
      background: '#1877f2',
      iconFamily: 'demo-icons',
      icon: 'facebook-circle-fill',
    },
  ],
  [
    {
      name: 'Spotify',
      color: '#fff',
      background: '#1ed760',
      iconFamily: 'demo-icons',
      icon: 'spotify-fill',
    },
    {
      name: 'Skype',
      color: '#fff',
      background: '#0b64a4',
      iconFamily: 'demo-icons',
      icon: 'skype-fill',
    },
    {
      name: 'Youtube',
      color: '#fff',
      background: '#ff0000',
      iconFamily: 'demo-icons',
      icon: 'youtube-fill',
    },
    {
      name: 'Paypal',
      color: '#fff',
      background: '#0070ba',
      iconFamily: 'demo-icons',
      icon: 'paypal-fill',
    },
    {
      name: 'Whatsapp',
      color: '#fff',
      background: '#128c7e',
      iconFamily: 'demo-icons',
      icon: 'whatsapp-fill',
    },
    {
      name: 'Telegram',
      color: '#fff',
      background: '#0088cc',
      iconFamily: 'demo-icons',
      icon: 'telegram-fill',
    },
    {
      name: 'Snapchat',
      color: '#000',
      background: '#fffc00',
      iconFamily: 'demo-icons',
      icon: 'snapchat-fill',
    },
  ],
]

const visible = ref(false)

const onSelect = (item: ShareSheetItem) => {
  toast(item.name as string)
}
</script>
