<template>
  <sar-fab icon="share" icon-family="demo-icons" @click="onClick" />
</template>

<script lang="ts" setup>
import { toast } from 'sard-uniapp'

const onClick = () => {
  toast('点击了按钮')
}
</script>
