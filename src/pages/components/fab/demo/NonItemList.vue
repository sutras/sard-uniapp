<template>
  <sar-fab @click="onClick" />
</template>

<script lang="ts" setup>
import { toast } from 'sard-uniapp'

const onClick = () => {
  toast('点击了按钮')
}
</script>
