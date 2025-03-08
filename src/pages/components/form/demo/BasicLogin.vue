<template>
  <doc-page title="简单登录框">
    <sar-form :model="formState" ref="formRef">
      <sar-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <sar-input v-model="formState.username" />
      </sar-form-item>

      <sar-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <sar-input type="password" v-model="formState.password" />
      </sar-form-item>

      <sar-form-item label="" name="remember">
        <sar-checkbox v-model:checked="formState.remember">
          Remember me
        </sar-checkbox>
      </sar-form-item>

      <sar-form-item>
        <sar-button @click="submitForm">Submit</sar-button>
      </sar-form-item>
    </sar-form>
  </doc-page>
</template>

<script lang="ts" setup>
import { ref, reactive, toRaw } from 'vue'
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
      toast('Success!')
      console.log('Success:', toRaw(formState))
    })
    .catch((error: FieldValidateError[]) => {
      console.log('Failed:', error)
    })
}
</script>
