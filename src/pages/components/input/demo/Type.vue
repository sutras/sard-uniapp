<template>
  <sar-input placeholder="text" type="text" />
  <sar-input placeholder="number" type="number" />
  <sar-input placeholder="idcard" type="idcard" />
  <sar-input placeholder="digit" type="digit" />
  <sar-input placeholder="tel" type="tel" />
  <sar-input placeholder="password" type="password" />
  <sar-input placeholder="password show-eye" type="password" show-eye />
  <sar-input
    placeholder="password show-eye clearable"
    type="password"
    show-eye
    clearable
  />
  <sar-input placeholder="password" :type="isPlainText ? 'text' : 'password'">
    <template #append>
      <view @click="isPlainText = !isPlainText">
        {{ isPlainText ? '显示密文' : '显示明文' }}
      </view>
    </template>
  </sar-input>
  <sar-input
    placeholder="password clearable"
    :type="isPlainText ? 'text' : 'password'"
    clearable
  >
    <template #append>
      <view class="ml-16" @click="isPlainText = !isPlainText">
        {{ isPlainText ? '显示密文' : '显示明文' }}
      </view>
    </template>
  </sar-input>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const isPlainText = ref(false)
</script>
