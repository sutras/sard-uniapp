<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="toast显示验证错误信息">
    <sar-form ref="formRef" :model="formState" class="form" :showError="false">
      <sar-form-item
        name="username"
        class="form-item"
        :rules="[{ required: true, message: '请输入手机号!' }]"
      >
        <sar-input
          v-model="formState.username"
          placeholder="请输入手机号"
          inlaid
        />
      </sar-form-item>

      <sar-form-item
        name="password"
        class="form-item"
        :rules="[{ required: true, message: '请输入短信验证码!' }]"
      >
        <sar-space>
          <sar-input
            v-model="formState.password"
            type="password"
            placeholder="请输入短信验证码"
            inlaid
          />
          <sar-button type="pale-text" root-style="height: 100%">
            发送验证码
          </sar-button>
        </sar-space>
      </sar-form-item>

      <sar-form-item class="form-item">
        <sar-button @click="submitForm" round>登录</sar-button>
      </sar-form-item>
    </sar-form>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import { ref, reactive, toRaw } from 'vue'
import { toast, type FormExpose, type FieldValidateError } from 'sard-uniapp'

const formRef = ref<FormExpose>()

interface FormState {
  username: string
  password: string
}

const formState = reactive<FormState>({
  username: '',
  password: '',
})

const submitForm = () => {
  formRef.value
    ?.validate()
    .then(() => {
      toast('Success!')
      console.log('Success:', toRaw(formState))
    })
    .catch((error: FieldValidateError[]) => {
      toast(error[0].message)
      console.log('Failed:', error)
    })
}

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
