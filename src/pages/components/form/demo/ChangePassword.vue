<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page emphasis title="修改密码">
    <sar-form
      ref="formRef"
      :model="formState"
      root-class="auth-form"
      :show-error="false"
    >
      <sar-form-item
        name="oldPassword"
        :rules="[{ required: true, message: '请输入旧密码' }]"
        inlaid
        root-class="auth-form-item"
      >
        <sar-input
          v-model="formState.oldPassword"
          type="password"
          placeholder="旧密码"
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

      <sar-form-item
        name="newPassword"
        :rules="[{ required: true, message: '请输入新密码' }]"
        inlaid
        root-class="auth-form-item"
      >
        <sar-input
          v-model="formState.newPassword"
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
  oldPassword: string
  newPassword: string
}

const formState = reactive<FormState>({
  oldPassword: '',
  newPassword: '',
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

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
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
