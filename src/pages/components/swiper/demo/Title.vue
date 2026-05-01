<template>
  <sar-swiper :list="list" dot-type="title"></sar-swiper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref([
  {
    image: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg',
    title: '老夫聊发少年狂，左牵黄，右擎苍，锦帽貂裘，千骑卷平冈。',
  },
  {
    image: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic2.jpg',
    title: '为报倾城随太守，亲射虎，看孙郎。',
  },
  {
    image: 'https://fastly.jsdelivr.net/npm/@sard/assets/pic3.jpg',
    title:
      '酒酣胸胆尚开张。鬓微霜，又何妨！持节云中，何日遣冯唐？会挽雕弓如满月，西北望，射天狼。',
  },
])
</script>
