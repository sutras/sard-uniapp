<template>
  <view :class="formItemClass" :style="formItemStyle" :id="fieldId">
    <view
      v-if="$slots.label || !isNullish(label)"
      :class="bem.e('label')"
      :style="labelStyle"
    >
      <view v-if="shouldShowStar" :class="bem.e('star')">*</view>
      <slot name="label">{{ label }}</slot>
    </view>
    <view :class="bem.e('content')">
      <slot></slot>
      <slot name="validate" :state="validateState"></slot>
      <view v-if="shouldShowError" :class="bem.e('error')">
        {{ validateMessage }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  provide,
  onMounted,
  onBeforeUnmount,
  reactive,
  watch,
  toRef,
  nextTick,
  getCurrentInstance,
} from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  isNullish,
  chainGet,
  toArray,
  chainSet,
  deepClone,
  noop,
  uniqid,
  getViewportScrollInfo,
  getBoundingClientRect,
  getScrollIntoViewValue,
  getWindowInfo,
} from '../../utils'
import { type VdaliteFailResult, type Rule } from '../form/Validator'
import {
  type FormItemProps,
  type FormItemSlots,
  type FieldValidateError,
  type FormItemContext,
  type ValidateState,
  type FormItemExpose,
  formItemContextSymbol,
  useFormContext,
  formItemPropsDefaults,
} from '../form/common'
import { defaultConfig } from '../config'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<FormItemProps>(), formItemPropsDefaults)

defineSlots<FormItemSlots>()

const bem = createBem('form-item')

// main
const formContext = useFormContext()

if (!formContext) {
  throw new Error('FormItem must be included in Form.')
}

// 用于阻止验证
let isResetting = false

const fieldValue = computed({
  get() {
    const model = formContext.model
    if (!model || !props.name) {
      return
    }
    return chainGet(model, toArray(props.name))
  },
  set(value) {
    const model = formContext.model
    if (!model || !props.name) {
      return
    }
    chainSet(model, toArray(props.name), value)
  },
})

let initialValue: any

const validateMessage = ref('')

watch(
  () => props.error,
  () => {
    validateMessage.value = props.error || ''
    validateState.value = props.error ? 'error' : ''
  },
)

const shouldShowError = computed(() => {
  return props.showError && formContext.showError && validateMessage.value
})

const validateState = ref<ValidateState>('')

const mergedValidateTrigger = computed(() => {
  const trigger = props.validateTrigger ?? formContext.validateTrigger
  return trigger ? toArray(trigger) : undefined
})

const mergedRules = computed(() => {
  const rules: Rule[] = []

  if (props.rules) {
    rules.push(...toArray(props.rules))
  }

  const formRules = formContext.rules
  if (formRules && props.name) {
    const fRules: Rule | Rule[] = chainGet(formRules, toArray(props.name))
    if (fRules) {
      rules.push(...toArray(fRules))
    }
  }

  const required = props.required

  if (required !== undefined) {
    const requiredRules = rules
      .map((rule, i) => [rule, i] as const)
      .filter(([rule]) => {
        return Object.keys(rule).includes('required')
      })

    if (requiredRules.length > 0) {
      for (const [rule, i] of requiredRules) {
        if (rule.required !== required) {
          rules[i] = { ...rule, required }
        }
      }
    } else {
      rules.push({ required })
    }
  }

  const trigger = mergedValidateTrigger.value
  if (trigger && trigger.length > 0) {
    for (let i = 0, l = rules.length; i < l; i++) {
      const rule = rules[i]
      if (!rule.trigger) {
        rules[i] = { ...rule, trigger: [...trigger] }
      }
    }
  }

  return rules
})

const isRequired = computed(() => {
  return mergedRules.value.some((rule) => rule.required)
})

const shouldShowStar = computed(() => {
  return !formContext.hideStar && !props.hideStar && isRequired.value
})

const validate = async (trigger?: string | string[]) => {
  if (isResetting || !props.name) {
    return
  }

  const validRules = formContext.validator.getValidTriggerRules(
    mergedRules.value,
    trigger,
  )

  if (validRules.length === 0) {
    return
  }

  validateState.value = 'validating'
  try {
    await formContext.validator.validate(mergedRules.value, {
      validateFirst: true,
      value: fieldValue.value,
      name: props.name,
      label: props.label,
      trigger,
    })

    validateState.value = 'success'
    validateMessage.value = ''
  } catch (messages) {
    validateState.value = 'error'
    validateMessage.value = (messages as VdaliteFailResult)[0]

    const error: FieldValidateError = {
      name: props.name,
      value: fieldValue.value,
      message: validateMessage.value,
    }
    throw error
  }
}

const clearValidate = () => {
  validateState.value = ''
  validateMessage.value = ''
  isResetting = false
}

const reset = async () => {
  isResetting = true

  fieldValue.value = deepClone(initialValue)
  await nextTick()
  clearValidate()
}

const fieldId = uniqid()
const instance = getCurrentInstance()

const scrollToField = async () => {
  const [scrollInfo, fieldRect, windowInfo] = await Promise.all([
    getViewportScrollInfo(),
    getBoundingClientRect(`#${fieldId}`, instance),
    getWindowInfo(),
  ])

  const scrollTop = getScrollIntoViewValue(
    windowInfo.windowHeight,
    scrollInfo.scrollTop,
    fieldRect.height,
    fieldRect.top + scrollInfo.scrollTop,
    formContext.scrollIntoViewOptions,
  )

  uni.pageScrollTo({
    scrollTop,
    duration:
      formContext.scrollIntoViewOptions?.duration ??
      defaultConfig.form.scrollDuration,
  })
}

const onBlur = () => {
  validate('blur').catch(noop)
}

const onChange = () => {
  validate('change').catch(noop)
}

const context: FormItemContext = reactive({
  name: toRef(props, 'name'),
  validateMessage,
  validateState,
  validate,
  clearValidate,
  reset,
  scrollToField,
  onBlur,
  onChange,
})

onMounted(() => {
  if (props.name) {
    initialValue = deepClone(fieldValue.value)
    formContext.addField(context)
  }
})

onBeforeUnmount(() => {
  formContext.removeField(context)
})

provide<FormItemContext>(formItemContextSymbol, context)

defineExpose<FormItemExpose>({
  validate,
  reset,
  clearValidate,
  scrollToField,
  validateMessage,
  validateState,
})

// others
const mergedDirection = computed(() => props.direction || formContext.direction)

const formItemClass = computed(() => {
  return classNames(
    bem.b(),
    bem.m(mergedDirection.value),
    bem.m('inlaid', props.inlaid),
    bem.m(`align-${props.labelAlign || formContext.labelAlign}`),
    bem.m(`valign-${props.labelValign || formContext.labelValign}`),
    bem.m(`star-${props.starPosition || formContext.starPosition}`),
    props.rootClass,
  )
})

const formItemStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const labelStyle = computed(() => {
  return stringifyStyle({
    width:
      mergedDirection.value === 'horizontal' &&
      (props.labelWidth || formContext.labelWidth),
  })
})
</script>

<style lang="scss">
@import './index.scss';
</style>
