<template>
  <doc-page>
    <doc-demo>
      <sar-button @click="visible = true">New Collection</sar-button>
    </doc-demo>
    <sar-dialog
      v-model:visible="visible"
      title="Create a new collection"
      confirm-text="Create"
      cancel-text="Cancel"
      :before-close="beforeClose"
    >
      <sar-form ref="formRef" :model="formState">
        <sar-form-item
          name="title"
          label="Title"
          :rules="[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]"
        >
          <sar-input v-model="formState.title" />
        </sar-form-item>
        <sar-form-item name="description" label="Description">
          <sar-input type="textarea" v-model="formState.description" />
        </sar-form-item>
        <sar-form-item name="modifier">
          <sar-radio-group v-model="formState.modifier" direction="horizontal">
            <sar-radio value="public">Public</sar-radio>
            <sar-radio value="private">Private</sar-radio>
          </sar-radio-group>
        </sar-form-item>
      </sar-form>
      <view style="margin-bottom: 20rpx"></view>
    </sar-dialog>
  </doc-page>
</template>
<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue'
import { toast, type FormExpose, type FieldValidateError } from '@sard/uniapp'

interface Values {
  title: string
  description: string
  modifier: string
}

const formRef = ref<FormExpose>()
const visible = ref(false)

const formState = reactive<Values>({
  title: '',
  description: '',
  modifier: 'public',
})

const beforeClose = (type: string) => {
  if (type === 'confirm') {
    return formRef.value
      ?.validate()
      .then(() => {
        toast(JSON.stringify(formState))
        console.log('formState: ', toRaw(formState))
        formRef.value?.reset()
      })
      .catch((error: FieldValidateError[]) => {
        console.log('Validate Failed:', error)
        throw error
      })
  }
}
</script>
