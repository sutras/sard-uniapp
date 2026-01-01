<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="Label 宽度">
    <sar-form :model="formState" ref="formRef" label-width="200rpx">
      <sar-form-item label="Activity name">
        <sar-input v-model="formState.name" />
      </sar-form-item>
      <sar-form-item label="Instant delivery">
        <sar-switch v-model="formState.delivery" />
      </sar-form-item>
      <sar-form-item label="Activity type">
        <sar-checkbox-group v-model="formState.type">
          <sar-checkbox value="1">Online</sar-checkbox>
          <sar-checkbox value="2">Promotion</sar-checkbox>
          <sar-checkbox value="3">Offline</sar-checkbox>
        </sar-checkbox-group>
      </sar-form-item>
      <sar-form-item label="Resources">
        <sar-radio-group v-model="formState.resource">
          <sar-radio value="1">Sponsor</sar-radio>
          <sar-radio value="2">Venue</sar-radio>
        </sar-radio-group>
      </sar-form-item>
      <sar-form-item label="Activity form">
        <sar-input type="textarea" v-model="formState.desc" />
      </sar-form-item>
      <sar-form-item>
        <sar-button @click="onSubmit">Create</sar-button>
        <sar-button type="outline" root-style="margin-top: 20rpx">
          Cancel
        </sar-button>
      </sar-form-item>
    </sar-form>
  </doc-page>
</template>
<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import { reactive, toRaw, ref, type UnwrapRef } from 'vue'
import { type FormExpose } from 'sard-uniapp'

const formRef = ref<FormExpose>()

interface FormState {
  name: string
  delivery: boolean
  type: string[]
  resource: string
  desc: string
}
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const onSubmit = () => {
  formRef.value?.validate().then(() => {
    console.log('submit!', toRaw(formState))
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
