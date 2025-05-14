<template>
  <doc-page title="动态增减嵌套字段">
    <sar-form ref="formRef" :model="dynamicValidateForm">
      <sar-form-item
        v-for="(user, index) in dynamicValidateForm.users"
        :key="user.id"
      >
        <sar-space align="center">
          <sar-form-item
            :name="['users', index, 'first']"
            :rules="{
              required: true,
              message: 'Missing first name',
            }"
            inlaid
          >
            <sar-input inlaid v-model="user.first" placeholder="First Name" />
          </sar-form-item>
          <sar-form-item
            :name="['users', index, 'last']"
            :rules="{
              required: true,
              message: 'Missing last name',
            }"
            inlaid
          >
            <sar-input inlaid v-model="user.last" placeholder="Last Name" />
          </sar-form-item>
          <sar-button
            type="text"
            icon="trash"
            size="small"
            theme="danger"
            @click="removeUser(user)"
          />
        </sar-space>
      </sar-form-item>
      <sar-form-item>
        <sar-button type="outline" icon="plus" @click="addUser()">
          Add user
        </sar-button>
      </sar-form-item>
      <sar-form-item>
        <sar-button @click="onSubmit">Submit</sar-button>
      </sar-form-item>
    </sar-form>
  </doc-page>
</template>

<script lang="ts" setup>
import { toRaw, reactive, ref } from 'vue'
import { toast, type FormExpose } from 'sard-uniapp'

interface User {
  first: string
  last: string
  id: number
}
const formRef = ref<FormExpose>()
const dynamicValidateForm = reactive<{ users: User[] }>({
  users: [],
})
const removeUser = (item: User) => {
  const index = dynamicValidateForm.users.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.users.splice(index, 1)
  }
}
const addUser = () => {
  dynamicValidateForm.users.push({
    first: '',
    last: '',
    id: Date.now(),
  })
}

const onSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => {
      toast('Success')
      console.log('Received values of form:', toRaw(dynamicValidateForm))
    })
    .catch(() => {
      console.log('fail')
    })
}
</script>
