<template>
  <sar-list card>
    <sar-list-item arrow hover title="登录表单" @click="visible = true" />
  </sar-list>

  <sar-dialog
    v-model:visible="visible"
    title="登录"
    :before-close="beforeClose"
  >
    <sar-form ref="formRef" :model="formState">
      <sar-form-item name="name" label="用户名" :rules="[{ required: true }]">
        <sar-input inlaid placeholder="请输入" v-model="formState.name" />
      </sar-form-item>
      <sar-form-item name="password" label="密码" :rules="[{ required: true }]">
        <sar-input
          type="password"
          inlaid
          placeholder="请输入"
          v-model="formState.password"
        />
      </sar-form-item>
    </sar-form>
  </sar-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'sard-uniapp'
import { reactive } from 'vue'

const visible = ref(false)

const formRef = ref()

const formState = reactive({
  name: '',
  password: '',
})

const beforeClose = (type: string) => {
  if (type === 'confirm') {
    return formRef.value?.validate().then(() => {
      toast(JSON.stringify(formState))
      formRef.value?.reset()
    })
  }
}
</script>
