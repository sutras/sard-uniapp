<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="自定义校验规则">
    <sar-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <sar-form-item label="Password" name="pass">
        <sar-input v-model="ruleForm.pass" type="password" />
      </sar-form-item>
      <sar-form-item label="Confirm" name="checkPass">
        <sar-input v-model="ruleForm.checkPass" type="password" />
      </sar-form-item>
      <sar-form-item label="Age" name="age">
        <template #validate="{ state }">
          <sar-input v-model="ruleForm.age">
            <template #append>
              <sar-loading
                v-if="state === 'validating'"
                color="var(--sar-tertiary-color)"
              />
            </template>
          </sar-input>
        </template>
      </sar-form-item>
      <sar-form-item>
        <sar-button @click="submitForm(ruleFormRef)">Submit</sar-button>
        <sar-button
          type="outline"
          root-style="margin-top: 20rpx"
          @click="resetForm(ruleFormRef)"
        >
          Reset
        </sar-button>
      </sar-form-item>
    </sar-form>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import { toast, type FormRules, type FormExpose } from 'sard-uniapp'

const ruleFormRef = ref<FormExpose>()

const checkAge = (value: any) => {
  return new Promise<void>((resolve, reject) => {
    if (!value) {
      return reject('Please input the age')
    }
    setTimeout(() => {
      if (!Number.isInteger(Number(value))) {
        reject('Please input digits')
      } else {
        if (value < 18) {
          reject('Age must be greater than 18')
        } else {
          resolve()
        }
      }
    }, 1000)
  })
}

const validatePass = (value: any) => {
  if (value === '') {
    return 'Please input the password'
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) {
        return true
      }
      ruleFormRef.value.validate(['checkPass']).catch(() => void 0)
    }
    return true
  }
}
const validatePass2 = (value: any) => {
  if (value === '') {
    return 'Please input the password again'
  } else if (value !== ruleForm.pass) {
    return "Two inputs don't match!"
  } else {
    return true
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  age: '',
})

const rules = reactive<FormRules>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }],
})

const submitForm = (formEl?: FormExpose) => {
  if (!formEl) return
  formEl
    .validate()
    .then(() => {
      toast('Success!')
      console.log('Success!')
    })
    .catch(() => {
      console.log('error submit!')
    })
}

const resetForm = (formEl: any) => {
  if (!formEl) return
  formEl.reset()
}

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>
