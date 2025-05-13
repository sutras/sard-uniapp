<template>
  <sar-list card>
    <sar-list-item
      arrow
      hover
      title="显示复杂的对话框"
      @click="visible = true"
    />
  </sar-list>

  <sar-dialog
    v-model:visible="visible"
    title="复杂的对话框"
    :before-close="beforeClose"
    popup-style="top: 50%"
  >
    <scroll-view
      style="height: 60vh; margin-top: 1px; margin-bottom: 16rpx"
      scroll-y
    >
      <sar-form ref="formRef" :model="formModel">
        <sar-form-item
          name="name"
          label="Activity name"
          :rules="[{ required: true }]"
        >
          <sar-input
            inlaid
            v-model="formModel.name"
            placeholder="Please input Activity name"
          />
        </sar-form-item>
        <sar-form-item name="region" label="Activity zone">
          <sar-picker-input
            v-model="formModel.region"
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
        <sar-form-item name="date1" label="Activity time">
          <sar-datetime-picker-input
            v-model="formModel.date1"
            type="yMd"
            placeholder="Pick a date"
          />
        </sar-form-item>
        <sar-form-item name="date2" label="">
          <sar-datetime-picker-input
            v-model="formModel.date2"
            type="hms"
            placeholder="Pick a time"
          />
        </sar-form-item>
        <sar-form-item name="date3" label="Active date range">
          <sar-datetime-range-picker-input
            v-model="formModel.date3"
            type="hms"
            :tabs="['start', 'end']"
            placeholder="Pick a time"
          />
        </sar-form-item>
        <sar-form-item name="delivery" label="Instant delivery">
          <sar-switch v-model="formModel.delivery" />
        </sar-form-item>
        <sar-form-item name="type" label="Activity type">
          <sar-checkbox-input
            v-model="formModel.type"
            placeholder="Pick Activity type"
            :options="[
              { label: 'Online activities', value: 'Online activities' },
              { label: 'Promotion activities', value: 'Promotion activities' },
              { label: 'Offline activities', value: 'Offline activities' },
              {
                label: 'Simple brand exposure',
                value: 'Simple brand exposure',
              },
            ]"
          />
        </sar-form-item>
        <sar-form-item name="resource" label="Resources">
          <sar-radio-input
            v-model="formModel.resource"
            placeholder="Pick Resources"
            :options="[
              { label: 'Sponsor', value: 'Sponsor' },
              { label: 'Venue', value: 'Venue' },
            ]"
          />
        </sar-form-item>
        <sar-form-item name="desc" label="Activity form" label-valign="start">
          <sar-input
            inlaid
            v-model="formModel.desc"
            type="textarea"
            placeholder="Please input Activity form"
            show-count
          />
        </sar-form-item>
      </sar-form>
    </scroll-view>
  </sar-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'sard-uniapp'
import { reactive } from 'vue'

const visible = ref(false)

const formRef = ref()

const formModel = reactive({
  name: '',
  region: '',
  date1: undefined,
  date2: undefined,
  date3: undefined,
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const beforeClose = (type: string) => {
  if (type === 'confirm') {
    return formRef.value?.validate().then(() => {
      toast('提交成功！')
      formRef.value?.reset()
    })
  }
}
</script>
