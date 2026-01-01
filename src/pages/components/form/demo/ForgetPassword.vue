<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page emphasis title="忘记密码">
    <sar-form
      ref="formRef"
      :model="formState"
      :show-error="false"
      root-class="auth-form"
    >
      <sar-form-item
        name="phone"
        :rules="[{ required: true, message: '请输入手机号码' }]"
        inlaid
        root-class="auth-form-item"
      >
        <sar-input
          v-model="formState.phone"
          placeholder="手机号码"
          inlaid
          root-class="auth-form-input"
        >
          <template #prepend>
            <sar-icon
              family="demo-icons"
              name="phone"
              size="32rpx"
              color="var(--sar-tertiary-color)"
            />
          </template>
        </sar-input>
      </sar-form-item>

      <sar-form-item
        name="captcha"
        :rules="[{ required: true, message: '请输入验证码' }]"
        inlaid
        root-class="auth-form-item"
      >
        <sar-input
          v-model="formState.captcha"
          placeholder="验证码"
          inlaid
          root-class="auth-form-input"
          root-style="padding-right: 0;"
        >
          <template #prepend>
            <sar-icon
              family="demo-icons"
              name="captcha"
              size="32rpx"
              color="var(--sar-tertiary-color)"
            />
          </template>
          <template #append>
            <sar-button
              type="pale-text"
              :loading="captchaLoading"
              :disabled="captchaDisabled"
              @click="onCaptchaClick"
            >
              <sar-count-down
                v-if="captchaDisabled"
                :time="1000 * 8"
                format="重发验证码(s)"
                @finish="captchaDisabled = false"
              />
              <text v-else-if="captchaLoading">正在发送</text>
              <text v-else>发送验证码</text>
            </sar-button>
          </template>
        </sar-input>
      </sar-form-item>

      <sar-form-item
        name="password"
        :rules="[{ required: true, message: '请输入新密码' }]"
        inlaid
        root-class="auth-form-item"
      >
        <sar-input
          v-model="formState.password"
          type="password"
          placeholder="新密码"
          inlaid
          root-class="auth-form-input"
        >
          <template #prepend>
            <sar-icon
              family="demo-icons"
              name="key"
              size="32rpx"
              color="var(--sar-tertiary-color)"
            />
          </template>
        </sar-input>
      </sar-form-item>

      <sar-form-item inlaid>
        <sar-button round :loading="submitting" @click="submitForm">
          提交
        </sar-button>
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
  phone: string
  captcha: string
  password: string
}

const formState = reactive<FormState>({
  phone: '',
  captcha: '',
  password: '',
})

const submitting = ref(false)

const submit = async () => {
  submitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 500))
  submitting.value = false
}

const submitForm = () => {
  formRef.value
    ?.validate()
    .then(async () => {
      await submit()
      toast('修改成功')
      console.log('Success:', toRaw(formState))
    })
    .catch((error: FieldValidateError[]) => {
      toast(error[0].message)
      console.log('Failed:', error)
    })
}

const captchaLoading = ref(false)
const captchaDisabled = ref(false)

const sendCaptcha = () => {
  return new Promise((resolve) => setTimeout(resolve, 1000))
}

const onCaptchaClick = () => {
  captchaLoading.value = true
  sendCaptcha()
    .then(() => {
      toast('已发送验证码')
      captchaDisabled.value = true
    })
    .finally(() => {
      captchaLoading.value = false
    })
}

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, backPress } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    backPress()
    return true
  }
})
</script>

<style lang="scss">
.auth-form {
  margin: 0 32rpx;

  .auth-form-item {
    margin-bottom: 48rpx;
  }
  .auth-form-input {
    height: 80rpx;
    border-radius: 9999px;
    padding: 0 48rpx;
    background: rgba(var(--sar-primary-rgb), 0.05);
  }
}
</style>
