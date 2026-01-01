<template>
  <page-meta :page-style="isLocked ? 'overflow: hidden' : ''"></page-meta>
  <doc-page title="服务人员满意度评分表" emphasis padding-bottom="0">
    <sar-form-plain
      ref="formRef"
      :model="formModel"
      :rules="formRules"
      scroll-to-first-error
      :scroll-into-view-options="{
        startOffset,
        position: 'start',
      }"
    >
      <view class="form-description">
        尊敬的客户：感谢您对我们服务的支持！请根据您的真实体验为服务人员评分。
      </view>

      <view class="section">
        <view class="section-title">
          <text class="section-index">1</text>
          <text>基本信息</text>
        </view>
        <view class="section-content">
          <sar-form-item-plain name="staff_name" class="form-item">
            <template #custom="{ shouldShowStar }">
              <view class="form-label">
                <text v-if="shouldShowStar" class="form-star">*</text>
                服务人员姓名/工号：
              </view>
              <view class="form-input">
                <sar-input
                  v-model="formModel.staff_name"
                  placeholder="请输入服务人员姓名/工号"
                  clearable
                  inlaid
                />
              </view>
            </template>
          </sar-form-item-plain>

          <sar-form-item-plain name="service_date">
            <template #custom="{ shouldShowStar }">
              <view class="form-label">
                <text v-if="shouldShowStar" class="form-star">*</text>
                服务日期：
              </view>
              <view class="form-input">
                <sar-datetime-picker-input
                  v-model="formModel.service_date"
                  placeholder="请选择服务日期"
                  clearable
                />
              </view>
            </template>
          </sar-form-item-plain>

          <sar-form-item-plain name="contact">
            <template #custom="{ shouldShowStar }">
              <view class="form-label">
                <text v-if="shouldShowStar" class="form-star">*</text>
                您的联系方式（可选）
              </view>
              <view class="form-input">
                <sar-input
                  type="textarea"
                  v-model="formModel.contact"
                  placeholder="请输入联系方式"
                  clearable
                  inlaid
                  auto-height
                  min-height="48rpx"
                />
              </view>
            </template>
          </sar-form-item-plain>
        </view>
      </view>

      <view class="section">
        <view class="section-title">
          <text class="section-index">2</text>
          <text>服务人员评分</text>
        </view>
        <view class="section-content">
          <sar-form-item-plain name="professionalism">
            <template #custom="{ shouldShowStar }">
              <view class="form-label">
                <text v-if="shouldShowStar" class="form-star">*</text>
                专业能力：是否具备足够的知识和技能？
              </view>
              <RadioList
                v-model="formModel.professionalism"
                :options="ratingOptions"
              />
            </template>
          </sar-form-item-plain>

          <sar-form-item-plain name="attitude">
            <template #custom="{ shouldShowStar }">
              <view class="form-label">
                <text v-if="shouldShowStar" class="form-star">*</text>
                服务态度：是否礼貌、耐心、热情？
              </view>
              <RadioList
                v-model="formModel.attitude"
                :options="ratingOptions"
              />
            </template>
          </sar-form-item-plain>

          <sar-form-item-plain name="response_speed">
            <template #custom="{ shouldShowStar }">
              <view class="form-label">
                <text v-if="shouldShowStar" class="form-star">*</text>
                响应速度：问题处理是否及时？
              </view>
              <RadioList
                v-model="formModel.response_speed"
                :options="ratingOptions"
              />
            </template>
          </sar-form-item-plain>

          <sar-form-item-plain name="communication">
            <template #custom="{ shouldShowStar }">
              <view class="form-label">
                <text v-if="shouldShowStar" class="form-star">*</text>
                沟通能力：表达是否清晰、易于理解？
              </view>
              <RadioList
                v-model="formModel.communication"
                :options="ratingOptions"
              />
            </template>
          </sar-form-item-plain>

          <sar-form-item-plain name="problem_solving">
            <template #custom="{ shouldShowStar }">
              <view class="form-label">
                <text v-if="shouldShowStar" class="form-star">*</text>
                问题解决：是否有效解决您的需求？
              </view>
              <RadioList
                v-model="formModel.problem_solving"
                :options="ratingOptions"
              />
            </template>
          </sar-form-item-plain>
        </view>
      </view>

      <view class="section">
        <view class="section-title">
          <text class="section-index">3</text>
          <text>整体评价</text>
        </view>
        <view class="section-content">
          <sar-form-item-plain name="overall_satisfaction">
            <template #custom="{ shouldShowStar }">
              <view class="form-label">
                <text v-if="shouldShowStar" class="form-star">*</text>
                本次服务的整体满意度
              </view>
              <RadioList
                v-model="formModel.overall_satisfaction"
                :options="ratingOptions"
              />
            </template>
          </sar-form-item-plain>

          <sar-form-item-plain name="would_return">
            <template #custom="{ shouldShowStar }">
              <view class="form-label">
                <text v-if="shouldShowStar" class="form-star">*</text>
                您是否会再次选择该服务人员？
              </view>
              <RadioList
                v-model="formModel.would_return"
                :options="returnOptions"
              />
            </template>
          </sar-form-item-plain>
        </view>
      </view>

      <view class="section">
        <view class="section-title">
          <text class="section-index">4</text>
          <text>开放式反馈</text>
        </view>
        <view class="section-content">
          <sar-form-item-plain name="strengths">
            <view class="form-label">服务人员的优点（可选）</view>
            <view class="form-input">
              <sar-input
                v-model="formModel.strengths"
                type="textarea"
                placeholder="请输入服务人员的优点"
                clearable
                inlaid
                auto-height
                min-height="48rpx"
              />
            </view>
          </sar-form-item-plain>

          <sar-form-item-plain name="improvements">
            <view class="form-label">需要改进的方面（可选）</view>
            <view class="form-input">
              <sar-input
                v-model="formModel.improvements"
                type="textarea"
                placeholder="请输入需要改进的方面"
                clearable
                inlaid
                auto-height
                min-height="48rpx"
              />
            </view>
          </sar-form-item-plain>

          <sar-form-item-plain name="suggestions">
            <view class="form-label">其他建议（可选）</view>
            <view class="form-input">
              <sar-input
                v-model="formModel.suggestions"
                type="textarea"
                placeholder="请输入其他建议"
                clearable
                inlaid
                auto-height
                min-height="48rpx"
              />
            </view>
          </sar-form-item-plain>
        </view>
      </view>

      <view class="footer">
        <sar-button @click="onSubmit">提交评价</sar-button>
      </view>
    </sar-form-plain>
  </doc-page>
</template>

<script setup lang="ts">
import { useCurrentPageLock, usePageTopPopup } from 'sard-uniapp'
import { onBackPress } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import {
  toast,
  type FormExpose,
  type FieldValidateError,
  type FormRules,
  getWindowInfo,
} from 'sard-uniapp'
import RadioList from './RadioList.vue'

const startOffset = ref(getWindowInfo().statusBarHeight + 60)

const formModel = reactive({
  staff_name: '',
  service_date: '',
  contact: '',
  professionalism: '',
  attitude: '',
  response_speed: '',
  communication: '',
  problem_solving: '',
  overall_satisfaction: '',
  would_return: '',
  strengths: '',
  improvements: '',
  suggestions: '',
})

const formRules: FormRules = {
  staff_name: {
    required: true,
    message: '请输入服务人员姓名/工号',
  },
  service_date: {
    required: true,
    message: '请选择服务日期',
  },
  professionalism: {
    required: true,
    message: '请打分',
  },
  attitude: {
    required: true,
    message: '请打分',
  },
  response_speed: {
    required: true,
    message: '请打分',
  },
  communication: {
    required: true,
    message: '请打分',
  },
  problem_solving: {
    required: true,
    message: '请打分',
  },
  overall_satisfaction: {
    required: true,
    message: '请选择整体满意度',
  },
  would_return: {
    required: true,
    message: '请选择',
  },
}

const formRef = ref<FormExpose>()

const onSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => {
      toast('提交成功!')
    })
    .catch((error: FieldValidateError[]) => {
      toast(error[0].message)
      console.log('error submit!', error)
    })
}

const ratingOptions = [
  { value: '1', label: '不满意' },
  { value: '2', label: '一般' },
  { value: '3', label: '基本满意' },
  { value: '4', label: '非常满意' },
]

const returnOptions = [
  { value: 'yes', label: '是' },
  { value: 'no', label: '否' },
  { value: 'unsure', label: '不确定' },
]

const { isLocked } = useCurrentPageLock()

const { shouldStopBack, hidePopup } = usePageTopPopup()

onBackPress(() => {
  if (shouldStopBack.value) {
    hidePopup()
    return true
  }
})
</script>

<style lang="scss" scoped>
.form-description {
  padding: 20rpx 32px;
  font-size: var(--sar-text-sm);
  color: var(--sar-secondary-color);
  text-align: center;
}
.section {
  margin-top: 32rpx;
}
.section-title {
  display: flex;
  align-items: center;
  font-size: var(--sar-text-lg);
}
.section-index {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 32rpx;
  height: 32rpx;
  margin-right: 8rpx;
  font-size: var(--sar-text-xs);
  color: #fff;
  background-color: var(--sar-primary);
}
.section-content {
  margin: 0 32rpx;
}
.form-label {
  margin: 40rpx 0 10rpx;
}
.form-star {
  color: var(--sar-danger);
}
.form-input {
  margin-top: 20rpx;
  &::after {
    display: block;
    content: '';
    margin-top: 20rpx;
    border-top: 1px solid var(--sar-border-color);
    transform: scaleY(0.5);
  }
}
.footer {
  position: sticky;
  bottom: 0;
  margin-top: 40rpx;
  padding: 20rpx 32rpx calc(20rpx + env(safe-area-inset-bottom));
  border-top: 1px solid var(--sar-border-color);
  background-color: var(--sar-emphasis-bg);
}
</style>
