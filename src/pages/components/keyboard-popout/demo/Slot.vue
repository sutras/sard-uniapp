<template>
  <sar-list card>
    <sar-list-item title="打开键盘" arrow hover @click="visible = true" />
    <sar-keyboard-popout
      v-model:visible="visible"
      title="安全键盘"
      :show-cancel="false"
      :show-confirm="false"
      @input="onInput"
      @delete="onDelete"
      @before-enter="value = ''"
    >
      <view class="px-32 pb-32">
        <sar-password-input
          v-model="value"
          type="underline"
          :length="6"
          custom-keyboard
          focused
        />
      </view>
    </sar-keyboard-popout>
  </sar-list>
</template>

<script setup lang="ts">
import { toast } from 'sard-uniapp'
import { ref } from 'vue'

const visible = ref(false)
const value = ref('')

const onInput = (key: string) => {
  value.value = (value.value + key).slice(0, 6)

  if (value.value.length === 6) {
    visible.value = false
    toast(`输入完成，密码：${value.value}`)
  }
}

const onDelete = () => {
  value.value = value.value.slice(0, -1)
}
</script>
