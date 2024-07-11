<template>
  <doc-page>
    <sar-form ref="formRef" :model="formState" class="form" :showError="false">
      <sar-form-item
        name="username"
        class="form-item"
        :rules="[{ required: true, message: '请输入手机号!' }]"
      >
        <sar-input
          v-model="formState.username"
          placeholder="请输入手机号"
          borderless
        />
      </sar-form-item>

      <sar-form-item
        name="password"
        class="form-item"
        :rules="[{ required: true, message: '请输入短信验证码!' }]"
      >
        <view style="display: flex">
          <sar-input
            v-model="formState.password"
            type="password"
            placeholder="请输入短信验证码"
            borderless
          />
          <sar-button type="pale-text">发送验证码</sar-button>
        </view>
      </sar-form-item>

      <sar-form-item class="form-item">
        <sar-button @click="submitForm" round>登录</sar-button>
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
</script>

<style lang="scss" scoped>
.form {
  padding: 32rpx;
}
.form-item {
  padding-left: 0;
  padding-right: 0;
}
</style>
