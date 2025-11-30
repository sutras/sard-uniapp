<template>
  <sar-form
    ref="formRef"
    :model="formModel"
    star-position="right"
    direction="vertical"
  >
    <sar-form-item label="活动名称" name="activity" required>
      <sar-input
        v-model="formModel.activity"
        inlaid
        placeholder="请输入活动名称"
        clearable
      />
    </sar-form-item>
    <sar-form-item
      label="活动奖品"
      name="awards"
      :rules="{
        type: 'array',
        required: true,
      }"
      :class="{ 'pb-0': formModel.awards.length > 0 }"
    >
      <sar-dnd
        v-if="formModel.awards.length > 0"
        v-model:list="formModel.awards"
      >
        <template #default="{ list }">
          <sar-dnd-item
            v-for="({ key, itemInfo, data }, i) in list"
            :key="key"
            :item-info="itemInfo"
            style="
              margin: 0 calc(var(--sar-form-item-padding-x) * -1);
              padding: 0 var(--sar-form-item-padding-x);
            "
          >
            <view class="flex items-center gap-20 py-20">
              <sar-button
                type="text"
                theme="danger"
                icon="trash"
                size="small"
                @click="removeAward(i)"
              />
              <sar-form-item
                :name="['awards', i, 'name']"
                :rules="{
                  required: true,
                  message: '请选择奖品',
                }"
                inlaid
              >
                <sar-picker-input
                  v-model="data.name"
                  :columns="awardList"
                  clearable
                  placeholder="奖品"
                />
              </sar-form-item>
              <sar-form-item
                :name="['awards', i, 'num']"
                :rules="{
                  required: true,
                  message: '请输入数量',
                }"
                inlaid
              >
                <sar-stepper v-model="data.num" :min="1" placeholder="数量" />
              </sar-form-item>
              <sar-dnd-handle class="ml-20 stext-tertiary">
                <sar-icon name="list" size="36rpx" />
              </sar-dnd-handle>
            </view>
            <sar-divider
              v-if="i !== formModel.awards.length - 1"
              class="absolute my-0 left-0 right-0 bottom-0"
              style="margin: 0 var(--sar-form-item-padding-x)"
            />
          </sar-dnd-item>
        </template>
      </sar-dnd>
      <view v-else>无</view>
    </sar-form-item>
    <sar-form-item>
      <sar-button type="outline" class="mb-20" @click="addAward">
        新增奖品
      </sar-button>
      <sar-button class="mb-20" @click="submitForm(formRef)">提交</sar-button>
      <sar-button type="mild" @click="resetForm(formRef)">重置</sar-button>
    </sar-form-item>
  </sar-form>
</template>

<script setup lang="ts">
import { type FormExpose, toast, uniqid } from 'sard-uniapp'
import { reactive, ref } from 'vue'

const awardList = ['台式机', '笔记本', '平板', '手机', '耳机']

const formRef = ref<FormExpose>()

interface Award {
  name: string
  num: number | null
  key: string
}

const formModel = reactive<{
  activity: string
  awards: Award[]
}>({
  activity: '',
  awards: [],
})

const addAward = () => {
  formModel.awards.push(
    reactive({
      name: '',
      num: null,
      key: uniqid(),
    }),
  )
}

const removeAward = (index: number) => {
  formModel.awards.splice(index, 1)
}

const submitForm = (formEl?: FormExpose) => {
  formEl
    ?.validate()
    .then(() => {
      console.log(formModel)
      toast('提交成功')
    })
    .catch(() => {
      toast('提交失败')
    })
}

const resetForm = (formEl?: FormExpose) => {
  formEl?.reset()
}
</script>
