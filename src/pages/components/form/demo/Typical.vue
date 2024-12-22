<template>
  <doc-page>
    <sar-form :model="form" label-width="240rpx">
      <sar-form-item label="Activity name">
        <sar-input
          inlaid
          v-model="form.name"
          placeholder="Please input Activity name"
        />
      </sar-form-item>
      <sar-form-item label="Activity zone">
        <sar-picker-input
          v-model="form.region"
          placeholder="please select your zone"
          title="please select your zone"
          :columns="[
            {
              label: 'Zone one',
              value: 'shanghai',
            },
            {
              label: 'Zone two',
              value: 'beijing',
            },
          ]"
        />
      </sar-form-item>
      <sar-form-item label="Activity time">
        <sar-datetime-picker-input
          v-model="form.date1"
          type="yMd"
          placeholder="Pick a date"
        />
      </sar-form-item>
      <sar-form-item label="">
        <sar-datetime-picker-input
          v-model="form.date2"
          type="hms"
          placeholder="Pick a time"
        />
      </sar-form-item>
      <sar-form-item label="Instant delivery">
        <sar-switch v-model="form.delivery" />
      </sar-form-item>
      <sar-form-item label="Activity type">
        <sar-checkbox-input
          v-model="form.type"
          placeholder="Pick Activity type"
          :options="[
            { label: 'Online activities', value: 'Online activities' },
            { label: 'Promotion activities', value: 'Promotion activities' },
            { label: 'Offline activities', value: 'Offline activities' },
            { label: 'Simple brand exposure', value: 'Simple brand exposure' },
          ]"
        />
      </sar-form-item>
      <sar-form-item label="Resources">
        <sar-radio-input
          v-model="form.resource"
          placeholder="Pick Resources"
          :options="[
            { label: 'Sponsor', value: 'Sponsor' },
            { label: 'Venue', value: 'Venue' },
          ]"
        />
      </sar-form-item>
      <sar-form-item label="Activity form" label-valign="start">
        <sar-input
          inlaid
          v-model="form.desc"
          type="textarea"
          placeholder="Please input Activity form"
          show-count
        />
      </sar-form-item>
      <sar-form-item>
        <sar-button @click="onSubmit">Create</sar-button>
        <sar-button root-style="margin-top: 20rpx" type="outline">
          Cancel
        </sar-button>
      </sar-form-item>
    </sar-form>
  </doc-page>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { toast } from 'sard-uniapp'

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: undefined,
  date2: undefined,
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  toast('submit!')
}
</script>
