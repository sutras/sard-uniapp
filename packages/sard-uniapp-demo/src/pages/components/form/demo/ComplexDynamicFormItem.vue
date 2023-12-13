<template>
  <doc-page>
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
        <view style="display: flex; align-items: center; gap: 20rpx">
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
          <sar-button type="mild" size="small" @click="removeSight(sight)">
            <sar-icon name="minus" />
          </sar-button>
        </view>
      </sar-form-item>
      <sar-form-item>
        <sar-button type="outline" @click="addSight()">
          <sar-icon name="plus" />
          Add sights
        </sar-button>
      </sar-form-item>
      <sar-form-item>
        <sar-button @click="onSubmit">Submit</sar-button>
      </sar-form-item>
    </sar-form>
  </doc-page>
</template>
<script lang="ts" setup>
import { toRaw } from 'vue'
import { reactive, ref, watch } from 'vue'
import { toast, type FormExpose } from '@sard/uniapp'

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
</script>
