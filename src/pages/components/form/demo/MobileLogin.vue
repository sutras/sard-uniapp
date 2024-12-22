<template>
  <doc-page emphasis>
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
        name="password"
        :rules="[{ required: true, message: '请输入密码' }]"
        inlaid
        root-class="auth-form-item"
      >
        <sar-input
          v-model="formState.password"
          type="password"
          placeholder="密码"
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
          登录
        </sar-button>
      </sar-form-item>
    </sar-form>
  </doc-page>
</template>

<script lang="ts" setup>
import { ref, reactive, toRaw } from 'vue'
import { toast, type FormExpose, type FieldValidateError } from 'sard-uniapp'

const formRef = ref<FormExpose>()

interface FormState {
  phone: string
  password: string
}

const formState = reactive<FormState>({
  phone: '',
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
      toast('登录成功')
      console.log('Success:', toRaw(formState))
    })
    .catch((error: FieldValidateError[]) => {
      toast(error[0].message)
      console.log('Failed:', error)
    })
}
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
