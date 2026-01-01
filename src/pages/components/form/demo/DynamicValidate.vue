<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="动态校验规则">
    <sar-form ref="formRef" :model="formState">
      <sar-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <sar-input v-model="formState.username" />
      </sar-form-item>

      <sar-form-item
        label="Nickname"
        name="nickname"
        :rules="[
          {
            required: formState.checkNick,
            message: 'Please input your nickname!',
          },
        ]"
      >
        <sar-input v-model="formState.nickname" />
      </sar-form-item>

      <sar-form-item name="checkNick">
        <sar-checkbox v-model:checked="formState.checkNick">
          Nickname is required
        </sar-checkbox>
      </sar-form-item>

      <sar-form-item>
        <sar-button @click="onCheck">Check</sar-button>
      </sar-form-item>
    </sar-form>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import { reactive, ref, watch, toRaw } from 'vue'
import { toast, type FormExpose, type FieldValidateError } from 'sard-uniapp'

interface FormState {
  username: string
  nickname: string
  checkNick: boolean
}
const formRef = ref<FormExpose>()
const formState = reactive<FormState>({
  username: '',
  nickname: '',
  checkNick: false,
})

watch(
  () => formState.checkNick,
  () => {
    formRef.value?.validate(['nickname']).catch(() => void 0)
  },
  { flush: 'post' },
)

const onCheck = async () => {
  formRef.value
    ?.validate()
    .then(() => {
      console.log('Success:', toRaw(formState))
      toast('success')
    })
    .catch((error: FieldValidateError[]) => {
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
