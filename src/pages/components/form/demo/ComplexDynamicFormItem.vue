<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="复杂的动态增减表单项">
    <sar-form ref="formRef" :model="dynamicValidateForm">
      <sar-form-item
        name="area"
        label="Area"
        :rules="[{ required: true, message: 'Missing area' }]"
      >
        <sar-picker-input
          v-model="dynamicValidateForm.area"
          placeholder="Area"
          :columns="areas"
        />
      </sar-form-item>
      <sar-form-item
        v-for="(sight, index) in dynamicValidateForm.sights"
        :key="sight.id"
      >
        <sar-space align="center">
          <sar-form-item
            :name="['sights', index, 'value']"
            label="Sight"
            label-width="100rpx"
            :rules="{
              required: true,
              message: 'Missing sight',
            }"
            inlaid
          >
            <sar-picker-input
              v-model="sight.value"
              placeholder="Sight"
              :disabled="!dynamicValidateForm.area"
              :columns="
                (sights[dynamicValidateForm.area] || []).map((a) => ({
                  value: a,
                  label: a,
                }))
              "
            />
          </sar-form-item>
          <sar-form-item
            :name="['sights', index, 'price']"
            label="Price"
            label-width="100rpx"
            :rules="{
              required: true,
              message: 'Missing price',
            }"
            inlaid
          >
            <sar-input inlaid placeholder="Price" v-model="sight.price" />
          </sar-form-item>
          <sar-button
            type="text"
            icon="trash"
            size="small"
            theme="danger"
            @click="removeSight(sight)"
          />
        </sar-space>
      </sar-form-item>
      <sar-form-item>
        <sar-button type="outline" icon="plus" @click="addSight()">
          Add sights
        </sar-button>
      </sar-form-item>
      <sar-form-item>
        <sar-button @click="onSubmit">Submit</sar-button>
      </sar-form-item>
    </sar-form>
  </doc-page>
</template>
<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import { toRaw } from 'vue'
import { reactive, ref, watch } from 'vue'
import { toast, type FormExpose } from 'sard-uniapp'

interface Sights {
  value: string
  price: string
  id: number
}
const areas = [
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
]

const sights: { [key: string]: string[] } = {
  Beijing: ['Tiananmen', 'Great Wall'],
  Shanghai: ['Oriental Pearl', 'The Bund'],
}

const formRef = ref<FormExpose>()
const dynamicValidateForm = reactive<{ sights: Sights[]; area: string }>({
  sights: [],
  area: '',
})

watch(
  () => dynamicValidateForm.area,
  () => {
    dynamicValidateForm.sights = []
  },
)

const removeSight = (item: Sights) => {
  const index = dynamicValidateForm.sights.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.sights.splice(index, 1)
  }
}
const addSight = () => {
  dynamicValidateForm.sights.push({
    value: '',
    price: '',
    id: Date.now(),
  })
}

const onSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => {
      console.log('Received values of form:', toRaw(dynamicValidateForm))
      toast('success')
    })
    .catch(() => {
      console.log('fail')
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
