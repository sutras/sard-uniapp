<template>
  <sar-input placeholder="请输入验证码">
    <template #append>
      <sar-button
        size="small"
        :loading="loading"
        :disabled="disabled"
        @click="onClick"
        root-style="min-width: 200rpx"
      >
        <sar-count-down
          v-if="disabled"
          :time="1000 * 8"
          format="重发验证码(s)"
          @finish="disabled = false"
        />
        <text v-else-if="loading">正在发送</text>
        <text v-else>发送验证码</text>
      </sar-button>
    </template>
  </sar-input>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'sard-uniapp'

const loading = ref(false)
const disabled = ref(false)

const sendCaptcha = () => {
  return new Promise((resolve) => setTimeout(resolve, 1000))
}

const onClick = () => {
  loading.value = true
  sendCaptcha()
    .then(() => {
      toast('已发送验证码')
      disabled.value = true
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
