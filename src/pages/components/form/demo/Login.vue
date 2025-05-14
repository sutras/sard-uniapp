<template>
  <doc-page title="登录框">
    <sar-form :model="formState" ref="formRef">
      <sar-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <sar-input v-model="formState.username">
          <template #prepend>
            <sar-icon name="person" family="demo-icons" />
          </template>
        </sar-input>
      </sar-form-item>

      <sar-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <sar-input type="password" v-model="formState.password">
          <template #prepend>
            <sar-icon name="key" family="demo-icons" />
          </template>
        </sar-input>
      </sar-form-item>

      <sar-form-item>
        <sar-space justify="between">
          <sar-form-item name="remember" inlaid>
            <sar-checkbox v-model:checked="formState.remember">
              Remember me
            </sar-checkbox>
          </sar-form-item>
          <sar-button inline type="pale-text">Forgot password</sar-button>
        </sar-space>
      </sar-form-item>

      <sar-form-item>
        <sar-button @click="submitForm" :disabled="disabled">Log in</sar-button>
        <sar-space align="center" justify="end">
          <text>Or</text>
          <sar-button inline type="pale-text">register now!</sar-button>
        </sar-space>
      </sar-form-item>
    </sar-form>
  </doc-page>
</template>
<script lang="ts" setup>
import { reactive, computed, ref } from 'vue'
import { toast, type FormExpose, type FieldValidateError } from 'sard-uniapp'

const formRef = ref<FormExpose>()

interface FormState {
  username: string
  password: string
  remember: boolean
}
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
})

const submitForm = () => {
  formRef.value
    ?.validate()
    .then(() => {
      toast('Success')
      console.log('Success:', formState)
    })
    .catch((error: FieldValidateError[]) => {
      console.log('Failed:', error)
    })
}

const disabled = computed(() => {
  return !(formState.username && formState.password)
})
</script>
