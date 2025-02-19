<template>
  <sar-popout-input
    v-model="inputValue"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    :clearable="clearable"
    @clear="onClear"
    @click="onInputClick"
  />

  <sar-popout
    :root-class="rootClass"
    :root-style="rootStyle"
    :visible="innerVisible"
    @update:visible="onVisible"
    :title="title ?? placeholder"
    :show-confirm="false"
    @confirm="onConfirm"
  >
    <template #visible="{ already }">
      <scroll-view v-if="already" scroll-y :class="bem.e('scroll')">
        <sar-radio-group
          :size="size"
          :type="type"
          :checkedColor="checkedColor"
          :direction="direction"
          :validate-event="false"
          :model-value="popoutValue"
          @change="onChange"
        >
          <template #custom="{ toggle }">
            <sar-list inlaid>
              <sar-list-item
                v-for="option in options"
                :key="getMayPrimitiveOption(option, fieldKeys.value)"
                :title="getMayPrimitiveOption(option, fieldKeys.label)"
                hover
                @click="toggle(getMayPrimitiveOption(option, fieldKeys.value))"
              >
                <template #value>
                  <sar-radio
                    readonly
                    :value="getMayPrimitiveOption(option, fieldKeys.value)"
                  />
                </template>
              </sar-list-item>
            </sar-list>
          </template>
        </sar-radio-group>
      </scroll-view>
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarPopout from '../popout/popout.vue'
import SarRadioGroup from '../radio-group/radio-group.vue'
import SarRadio from '../radio/radio.vue'
import SarList from '../list/list.vue'
import SarListItem from '../list-item/list-item.vue'
import { type RadioGroupOptionKeys, defaultOptionKeys } from '../radio/common'
import {
  type RadioInputProps,
  type RadioInputEmits,
  type RadioInputOption,
  defaultRadioInputProps,
} from './common'
import { createBem, getMayPrimitiveOption, isNullish } from '../../utils'
import { useFormItemContext } from '../form/common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(
  defineProps<RadioInputProps>(),
  defaultRadioInputProps(),
)

const emit = defineEmits<RadioInputEmits>()

const bem = createBem('radio-input')

// main
const formItemContext = useFormItemContext()

const fieldKeys = computed(() => {
  return Object.assign({}, defaultOptionKeys, props.optionKeys)
})

// value
const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue
    if (props.validateEvent) {
      formItemContext?.onChange()
    }
  },
)

const popoutValue = ref(props.modelValue)

watch(innerValue, () => {
  popoutValue.value = innerValue.value
})

const onChange = (value: any) => {
  popoutValue.value = value

  onConfirm()
  innerVisible.value = false
}

const onConfirm = () => {
  innerValue.value = popoutValue.value
  emit('update:model-value', popoutValue.value)
  emit('change', popoutValue.value)

  inputValue.value = getInputValue()
}

// input
const inputValue = ref('')

function getOutletText(
  options: RadioInputOption[],
  optionKeys: Required<RadioGroupOptionKeys>,
  value: any,
) {
  const option = options.find(
    (option) => getMayPrimitiveOption(option, optionKeys.value) === value,
  )
  return isNullish(option)
    ? ''
    : getMayPrimitiveOption(option, optionKeys.label)
}

function getInputValue() {
  if (isNullish(innerValue.value) || innerValue.value.length === 0) {
    return ''
  }
  return getOutletText(props.options, fieldKeys.value, innerValue.value)
}

watch(
  innerValue,
  () => {
    inputValue.value = getInputValue()
  },
  {
    immediate: true,
  },
)

watch(
  () => props.options,
  () => {
    inputValue.value = getInputValue()
  },
)

const onClear = () => {
  inputValue.value = ''
  innerValue.value = undefined
  emit('update:model-value', undefined)
  emit('change', undefined)
}

// visible
const innerVisible = ref(props.visible)

watch(
  () => props.visible,
  () => {
    innerVisible.value = props.visible
  },
)

const onVisible = (visible: boolean) => {
  innerVisible.value = visible
  emit('update:visible', visible)
}

const onInputClick = () => {
  innerVisible.value = true
  emit('update:visible', true)
}
</script>

<style lang="scss">
@import './index.scss';
</style>
