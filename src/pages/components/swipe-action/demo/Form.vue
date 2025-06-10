<template>
  <sar-form ref="formRef" :model="dynamicValidateForm" card>
    <sar-form-item
      v-for="(user, index) in dynamicValidateForm.users"
      :key="user.id"
      style="padding: 1px 0 0"
    >
      <sar-swipe-action>
        <sar-form-item>
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
          </sar-space>
        </sar-form-item>

        <template #right>
          <sar-button
            theme="danger"
            square
            inline
            style="height: 100%"
            @click="removeUser(user)"
          >
            删除
          </sar-button>
        </template>
      </sar-swipe-action>
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
  users: [
    {
      first: '',
      last: '',
      id: 1,
    },
  ],
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
