<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="多表单联动">
    <sar-form ref="formRef" :model="formState" label-width="200rpx">
      <sar-form-item
        name="group"
        label="Group Name"
        :rules="[{ required: true, message: 'Please input group name!' }]"
      >
        <sar-input v-model="formState.group" />
      </sar-form-item>

      <sar-form-item label="User List">
        <template v-if="formState.users.length">
          <sar-list inlaid>
            <template v-for="user in formState.users" :key="user.key">
              <sar-list-item :title="`${user.name} - ${user.age}`">
                <template #icon>
                  <sar-avatar size="64rpx" icon-size="40rpx" />
                </template>
              </sar-list-item>
            </template>
          </sar-list>
        </template>
        <template v-else>
          <text>( No user yet. )</text>
        </template>
      </sar-form-item>

      <sar-form-item>
        <sar-button @click="onSubmit">Submit</sar-button>
        <sar-button
          type="outline"
          root-style="margin-top: 20rpx"
          @click="visible = true"
        >
          Add User
        </sar-button>
      </sar-form-item>
    </sar-form>

    <sar-dialog
      v-model:visible="visible"
      title="Basic Drawer"
      :before-close="beforeClose"
    >
      <sar-form ref="modalFormRef" :model="modalFormState">
        <sar-form-item
          name="name"
          label="User Name"
          :rules="[{ required: true }]"
        >
          <sar-input
            v-model="modalFormState.name"
            inlaid
            placeholder="Input User Name"
          />
        </sar-form-item>
        <sar-form-item
          name="age"
          label="User Age"
          :rules="[{ required: true }]"
        >
          <sar-stepper v-model="modalFormState.age" />
        </sar-form-item>
      </sar-form>
    </sar-dialog>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import { reactive, ref, toRaw } from 'vue'
import { toast, type FormExpose, type FieldValidateError } from 'sard-uniapp'

interface UserType {
  name?: string
  age?: number
  key?: number
}

interface FormState {
  group: string
  users: UserType[]
}

const formRef = ref<FormExpose>()
const modalFormRef = ref<FormExpose>()
const visible = ref(false)
const formState = reactive<FormState>({
  group: '',
  users: [],
})
const modalFormState = ref<UserType>({})

const beforeClose = (type: string) => {
  if (type === 'confirm') {
    return modalFormRef.value?.validate().then(() => {
      formState.users.push({ ...modalFormState.value, key: Date.now() })
      modalFormRef.value?.reset()
    })
  }
}
const onSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => {
      console.log('Finish:', toRaw(formState))
      toast('Success')
    })
    .catch((error: FieldValidateError[]) => {
      console.log('error', error)
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
