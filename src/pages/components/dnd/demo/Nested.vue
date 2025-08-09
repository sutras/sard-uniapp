<template>
  <sar-form-plain ref="formRef" :model="formModel" star-position="right">
    <sar-dnd v-model:list="formModel.activities">
      <template #default="{ list }">
        <sar-dnd-item
          v-for="({ data: activity, key, itemInfo }, i) in list"
          :item-info="itemInfo"
          :key="key"
          style="border-radius: var(--sar-card-border-radius)"
          class="mb-20"
        >
          <sar-card>
            <template #title>
              <view class="flex items-center gap-20">
                <sar-button
                  type="mild"
                  theme="danger"
                  icon="trash"
                  size="small"
                  @click="removeActivity(i)"
                />
                <sar-form-item
                  label="活动名称"
                  :name="['activities', i, 'name']"
                  inlaid
                  required
                >
                  <sar-input
                    v-model="activity.name"
                    inlaid
                    placeholder="请输入活动名称"
                    clearable
                  />
                </sar-form-item>
                <sar-dnd-handle class="stext-tertiary">
                  <sar-icon name="list" size="36rpx" />
                </sar-dnd-handle>
              </view>
            </template>
            <sar-form-item
              inlaid
              direction="vertical"
              label="活动奖品"
              :name="['activities', i, 'awards']"
              :rules="{
                type: 'array',
                required: true,
              }"
              :class="{ 'pb-0': activity.awards.length > 0 }"
            >
              <sar-dnd
                v-if="activity.awards.length > 0"
                v-model:list="activity.awards"
              >
                <template #default="{ list }">
                  <sar-dnd-item
                    v-for="({ itemInfo, key, data: award }, j) in list"
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
                        @click="removeAward(activity.awards, j)"
                      />
                      <sar-form-item
                        :name="['activities', i, 'awards', j, 'name']"
                        :rules="{
                          required: true,
                          message: '请选择奖品',
                        }"
                        inlaid
                      >
                        <sar-picker-input
                          v-model="award.name"
                          :columns="awardList"
                          clearable
                          placeholder="奖品"
                        />
                      </sar-form-item>
                      <sar-form-item
                        :name="['activities', i, 'awards', j, 'num']"
                        :rules="{
                          required: true,
                          message: '请输入数量',
                        }"
                        inlaid
                      >
                        <sar-stepper
                          v-model="award.num"
                          :min="1"
                          size="small"
                          placeholder="数量"
                        />
                      </sar-form-item>
                      <sar-dnd-handle class="stext-tertiary">
                        <sar-icon name="list" size="36rpx" />
                      </sar-dnd-handle>
                    </view>
                    <sar-divider
                      v-if="i !== activity.awards.length - 1"
                      class="absolute my-0 left-0 right-0 bottom-0"
                      style="margin: 0 var(--sar-form-item-padding-x)"
                    />
                  </sar-dnd-item>
                </template>
              </sar-dnd>
              <view v-else>无</view>
            </sar-form-item>
            <sar-button
              class="mt-20"
              type="outline"
              size="small"
              @click="addAward(activity.awards)"
            >
              新增奖品
            </sar-button>
          </sar-card>
        </sar-dnd-item>
      </template>
    </sar-dnd>

    <sar-card>
      <sar-button type="outline" class="mb-20" @click="addActivity">
        新增活动
      </sar-button>
      <sar-button class="mb-20" @click="submitForm()">提交</sar-button>
      <sar-button type="mild" @click="resetForm()">重置</sar-button>
    </sar-card>
  </sar-form-plain>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { toast, type FormExpose } from 'sard-uniapp'

interface Award {
  name: string
  num: number | null
}

interface Activity {
  name: string
  awards: Award[]
}

const awardList = ['台式机', '笔记本', '平板', '手机', '耳机']

const formRef = ref<FormExpose>()

const formModel = reactive<{
  activities: Activity[]
}>({
  activities: [],
})

const addActivity = () => {
  formModel.activities.push(
    reactive({
      name: '',
      awards: [],
    }),
  )
}

const removeActivity = (index: number) => {
  formModel.activities.splice(index, 1)
}

const addAward = (awards: Award[]) => {
  awards.push(
    reactive({
      name: '',
      num: null,
    }),
  )
}

const removeAward = (awards: Award[], index: number) => {
  awards.splice(index, 1)
}

const submitForm = () => {
  formRef.value
    ?.validate()
    .then(() => {
      console.log(formModel)
      toast('提交成功')
    })
    .catch(() => {
      toast('提交失败')
    })
}

const resetForm = () => {
  formRef.value?.reset()
}
</script>
