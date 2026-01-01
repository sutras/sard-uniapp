<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="添加/删除表单项">
    <sar-form ref="formRef" :model="dynamicValidateForm">
      <sar-form-item
        name="email"
        label="Email"
        :rules="[
          {
            required: true,
            message: 'Please input email address',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Please input correct email address',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <sar-input v-model="dynamicValidateForm.email" />
      </sar-form-item>
      <sar-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="domain.key"
        :label="'Domain' + index"
        :name="['domains', index, 'value']"
        :rules="{
          required: true,
          message: 'domain can not be null',
        }"
      >
        <view style="display: flex; flex-direction: row; gap: 10rpx">
          <sar-input v-model="domain.value" />
          <sar-button
            type="text"
            theme="danger"
            icon="trash"
            @click.prevent="removeDomain(domain)"
          />
        </view>
      </sar-form-item>
      <sar-form-item>
        <sar-button @click="submitForm(formRef)">Submit</sar-button>
        <sar-button
          type="outline"
          root-style="margin-top: 20rpx"
          @click="addDomain"
        >
          New domain
        </sar-button>
        <sar-button
          type="outline"
          root-style="margin-top: 20rpx"
          @click="resetForm(formRef)"
        >
          Reset
        </sar-button>
      </sar-form-item>
    </sar-form>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import { toast, type FormExpose } from 'sard-uniapp'

const formRef = ref<FormExpose>()
const dynamicValidateForm = reactive<{
  domains: DomainItem[]
  email: string
}>({
  domains: [
    {
      key: 1,
      value: '',
    },
  ],
  email: '',
})

interface DomainItem {
  key: number
  value: string
}

const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.domains.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1)
  }
}

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    value: '',
  })
}

const submitForm = (formEl?: FormExpose) => {
  if (!formEl) return
  formEl
    .validate()
    .then(() => {
      toast('Success!')
      console.log('Success!')
    })
    .catch(() => {
      console.log('error submit!')
    })
}

const resetForm = (formEl?: FormExpose) => {
  if (!formEl) return
  formEl.reset()
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
