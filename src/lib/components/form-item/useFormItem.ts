import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  toRef,
  watch,
} from 'vue'
import {
  type FieldValidateError,
  type FormItemContext,
  type FormItemProps,
  type ValidateState,
  formItemContextSymbol,
  useFormContext,
} from '../form/common'
import {
  chainGet,
  chainSet,
  deepClone,
  getBoundingClientRect,
  getScrollIntoViewValue,
  getViewportScrollInfo,
  getWindowInfo,
  noop,
  toArray,
  uniqid,
} from '../../utils'
import { type Rule, type VdaliteFailResult } from '../form/Validator'

export function useFormItem(props: FormItemProps) {
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

  const validateState = ref<ValidateState>('')

  watch(
    () => props.error,
    () => {
      validateMessage.value = props.error || ''
      validateState.value = props.error ? 'error' : ''
    },
  )

  watch(
    () => props.rules,
    () => {
      if (validateMessage.value) {
        validate().catch(noop)
      }
    },
    {
      deep: true,
      flush: 'post',
    },
  )

  const shouldShowError = computed(() => {
    return (
      !!props.showError && !!formContext.showError && !!validateMessage.value
    )
  })

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

  const scrollToField = async () => {
    const [scrollInfo, fieldRect, windowInfo] = await Promise.all([
      getViewportScrollInfo(),
      getBoundingClientRect(`.${fieldId}`),
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
        formContext.scrollDuration,
    })
  }

  const onBlur = () => {
    validate('blur').catch(noop)
  }

  const onChange = () => {
    validate('change').catch(noop)
  }

  const context: FormItemContext = reactive({
    name: toRef(() => props.name),
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

  const direction = computed(() => props.direction || formContext.direction)

  const labelAlign = computed(() => props.labelAlign || formContext.labelAlign)

  const labelValign = computed(
    () => props.labelValign || formContext.labelValign,
  )

  const starPosition = computed(
    () => props.starPosition || formContext.starPosition,
  )

  const labelWidth = computed(() => props.labelWidth || formContext.labelWidth)

  provide<FormItemContext>(formItemContextSymbol, context)

  const expose = {
    validate,
    reset,
    clearValidate,
    scrollToField,
    validateMessage,
    validateState,
  }

  return {
    expose,
    fieldId,
    validateState,
    shouldShowStar,
    validateMessage,
    shouldShowError,
    direction,
    labelAlign,
    labelValign,
    starPosition,
    labelWidth,
  }
}
