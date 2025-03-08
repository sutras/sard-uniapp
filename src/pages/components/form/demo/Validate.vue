<template>
  <doc-page title="表单校验">
    <sar-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <sar-form-item label="Activity name" name="name">
        <sar-input inlaid v-model="ruleForm.name" placeholder="Activity name" />
      </sar-form-item>
      <sar-form-item label="Activity zone" name="region">
        <sar-picker-input
          v-model="ruleForm.region"
          placeholder="Activity zone"
          :columns="[
            { label: 'Zone one', value: 'shanghai' },
            { label: 'Zone two', value: 'beijing' },
          ]"
        />
      </sar-form-item>
      <sar-form-item label="Activity count" name="count">
        <sar-picker-input
          v-model="ruleForm.count"
          placeholder="Activity count"
          :columns="options"
        />
      </sar-form-item>
      <sar-form-item label="Activity time" required name="date1">
        <sar-datetime-picker-input
          v-model="ruleForm.date1"
          type="yMd"
          placeholder="Pick a date"
        />
      </sar-form-item>
      <sar-form-item label="" hide-star name="date2">
        <sar-datetime-picker-input
          v-model="ruleForm.date2"
          type="hms"
          placeholder="Pick a time"
        />
      </sar-form-item>
      <sar-form-item label="Instant delivery" name="delivery">
        <sar-switch v-model="ruleForm.delivery" />
      </sar-form-item>
      <sar-form-item label="Activity type" name="type">
        <sar-checkbox-input
          v-model="ruleForm.type"
          placeholder="Pick Activity type"
          :options="[
            { label: 'Online activities', value: 'Online activities' },
            { label: 'Promotion activities', value: 'Promotion activities' },
            { label: 'Offline activities', value: 'Offline activities' },
            { label: 'Simple brand exposure', value: 'Simple brand exposure' },
          ]"
        />
      </sar-form-item>
      <sar-form-item label="Resources" name="resource">
        <sar-radio-input
          v-model="ruleForm.resource"
          placeholder="Pick Resources"
          :options="[
            { label: 'Sponsor', value: 'Sponsor' },
            { label: 'Venue', value: 'Venue' },
          ]"
        />
      </sar-form-item>
      <sar-form-item label="Activity form" name="desc">
        <sar-input v-model="ruleForm.desc" type="textarea" />
      </sar-form-item>
      <sar-form-item>
        <sar-button @click="submitForm(ruleFormRef)">Create</sar-button>
        <sar-button
          type="outline"
          @click="resetForm(ruleFormRef)"
          root-style="margin-top: 20rpx"
        >
          Reset
        </sar-button>
      </sar-form-item>
    </sar-form>
  </doc-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import {
  toast,
  type FormRules,
  type FormExpose,
  type FieldValidateError,
} from 'sard-uniapp'

interface RuleForm {
  name: string
  region: string
  count: string
  date1: Date | undefined
  date2: Date | undefined
  delivery: boolean
  type: string[]
  resource: string
  desc: string
}

const ruleFormRef = ref<FormExpose>()
const ruleForm = reactive<RuleForm>({
  name: 'Hello',
  region: '',
  count: '',
  date1: undefined,
  date2: undefined,
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})

const submitForm = (formEl?: FormExpose) => {
  if (!formEl) {
    return
  }

  formEl
    .validate()
    .then(() => {
      toast('Success!')
      console.log('Success!')
    })
    .catch((error: FieldValidateError[]) => {
      console.log('error submit!', error)
    })
}

const resetForm = (formEl?: FormExpose) => {
  if (!formEl) return
  formEl.reset()
}

const options = Array.from({ length: 100 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>
