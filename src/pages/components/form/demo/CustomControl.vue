<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="自定义表单控件">
    <sar-form :model="formState" ref="formRef">
      <sar-form-item
        name="price"
        label="Price"
        :rules="[{ validator: checkPrice }]"
      >
        <price-input v-model="formState.price" />
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
import { reactive, ref, toRaw } from 'vue'
import PriceInput, { type Currency } from './PriceInput.vue'
import { toast, type FormExpose } from 'sard-uniapp'

const formRef = ref<FormExpose>()

const formState = reactive({
  price: {
    number: 0,
    currency: 'rmb' as Currency,
  },
})

const onSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => {
      toast('Success')
      console.log('Received values from form: ', toRaw(formState))
    })
    .catch(() => {
      toast('Fail')
    })
}

const checkPrice = (value: { number: number }) => {
  if (value.number > 0) {
    return true
  }
  return 'Price must be greater than zero!'
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
