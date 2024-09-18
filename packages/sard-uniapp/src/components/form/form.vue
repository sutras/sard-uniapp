<template>
  <view :class="formClass" :style="formStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, provide, toRef, watch, markRaw } from 'vue'
import {
  classNames,
  stringifyStyle,
  createBem,
  toArray,
  arrayEqual,
  noop,
} from '../../utils'
import {
  type FormProps,
  type FormSlots,
  type FormContext,
  type FormItemContext,
  type FieldName,
  type FormExpose,
  formContextSymbol,
  FieldValidateError,
  defaultFormProps,
} from './common'
import { Validator } from './Validator'
import { useTranslate } from '../locale'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<FormProps>(), defaultFormProps)

defineSlots<FormSlots>()

const bem = createBem('form')

// main
const getMatchedField = (name: FieldName) => {
  return fields.find((field) => {
    return arrayEqual(toArray(field.name), toArray(name))
  })
}

const getMatchedFields = (nameList?: FieldName[]) => {
  let matchedFields = fields

  if (nameList && nameList.length > 0) {
    matchedFields = fields.filter((field) => {
      return (
        nameList.findIndex((name) =>
          arrayEqual(toArray(field.name), toArray(name)),
        ) > -1
      )
    })
  }

  return matchedFields
}

const validate = async (nameList?: FieldName[]) => {
  const settledResult = await Promise.allSettled(
    getMatchedFields(nameList).map((field) => {
      return field.validate()
    }),
  )
  const rejectedResult = settledResult.filter((result) => {
    return result.status === 'rejected'
  })

  if (rejectedResult.length > 0) {
    const errors: FieldValidateError[] = rejectedResult.map((result) => {
      return (result as any).reason
    })

    if (props.scrollToFirstError) {
      scrollToField(errors[0].name)
    }

    throw errors
  }
}

const reset = async (nameList?: FieldName[]) => {
  await Promise.allSettled(
    getMatchedFields(nameList).map((field) => {
      field.reset()
    }),
  )
}

const clearValidate = async (nameList?: FieldName[]) => {
  await Promise.allSettled(
    getMatchedFields(nameList).map((field) => {
      field.clearValidate()
    }),
  )
}

const scrollToField = (name: FieldName) => {
  getMatchedField(name)?.scrollToField()
}

defineExpose<FormExpose>({
  validate,
  reset,
  clearValidate,
  scrollToField,
})

const fields: FormItemContext[] = []

const addField: FormContext['addField'] = (formItemContext) => {
  fields.push(formItemContext)
}

const removeField: FormContext['removeField'] = (formItemContext) => {
  fields.splice(fields.indexOf(formItemContext), 1)
}

const validator = markRaw(new Validator())

const { select } = useTranslate('form.defaultValidateMessages')

validator.setValidateMessages(select())

watch(
  () => props.rules,
  () => {
    if (props.validateOnRuleChange) {
      validate().catch(noop)
    }
  },
  {
    deep: true,
  },
)

provide<FormContext>(
  formContextSymbol,
  reactive({
    model: toRef(() => props.model),
    rules: toRef(() => props.rules),
    validateTrigger: toRef(() => props.validateTrigger),
    direction: toRef(() => props.direction),
    labelWidth: toRef(() => props.labelWidth),
    labelAlign: toRef(() => props.labelAlign),
    labelValign: toRef(() => props.labelValign),
    starPosition: toRef(() => props.starPosition),
    hideStar: toRef(() => props.hideStar),
    showError: toRef(() => props.showError),
    scrollIntoViewOptions: toRef(() => props.scrollIntoViewOptions),
    disabled: toRef(() => props.disabled),
    readonly: toRef(() => props.readonly),
    scrollDuration: toRef(() => props.scrollDuration),
    addField,
    removeField,
    validator,
  }),
)

// others
const formClass = computed(() => {
  return classNames(bem.b(), bem.m('card', props.card), props.rootClass)
})

const formStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
