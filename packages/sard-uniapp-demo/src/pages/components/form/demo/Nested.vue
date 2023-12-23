<template>
  <doc-page>
    <sar-form :model="formState" ref="formRef">
      <sar-form-item
        :name="['user', 'name']"
        label="Name"
        :rules="[{ required: true }]"
      >
        <sar-input v-model="formState.user.name" />
      </sar-form-item>
      <sar-form-item
        :name="['user', 'email']"
        label="Email"
        :rules="[{ type: 'email' }]"
      >
        <sar-input v-model="formState.user.email" />
      </sar-form-item>
      <sar-form-item
        :name="['user', 'age']"
        label="Age"
        :rules="[{ type: 'number', min: 0, max: 99 }]"
      >
        <sar-stepper v-model="formState.user.age" />
      </sar-form-item>
      <sar-form-item :name="['user', 'website']" label="Website">
        <sar-input v-model="formState.user.website" />
      </sar-form-item>
      <sar-form-item :name="['user', 'introduction']" label="Introduction">
        <sar-input type="textarea" v-model="formState.user.introduction" />
      </sar-form-item>
      <sar-form-item>
        <sar-button @click="onSubmit">Submit</sar-button>
      </sar-form-item>
    </sar-form>
  </doc-page>
</template>

<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue'
import { toast, type FormExpose } from 'sard-uniapp'

const formRef = ref<FormExpose>()

const formState = reactive({
  user: {
    name: '',
    age: undefined,
    email: '',
    website: '',
    introduction: '',
  },
})

const onSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => {
      toast('Success')
      console.log('Success:', toRaw(formState))
    })
    .catch(() => {
      toast('fail!')
    })
}
</script>
