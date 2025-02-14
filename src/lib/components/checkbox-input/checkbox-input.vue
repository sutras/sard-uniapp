<template>
  <sar-popout-input
    v-model="inputValue"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    :clearable="clearable"
    multiline
    @clear="onClear"
    @click="onInputClick"
  />

  <sar-popout
    :root-class="rootClass"
    :root-style="rootStyle"
    :visible="innerVisible"
    @update:visible="onVisible"
    :title="title ?? placeholder"
    @confirm="onConfirm"
  >
    <template #visible="{ already }">
      <scroll-view v-if="already" scroll-y :class="bem.e('scroll')">
        <sar-checkbox-group
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
                  <sar-checkbox
                    readonly
                    :value="getMayPrimitiveOption(option, fieldKeys.value)"
                    :validate-event="false"
                  />
                </template>
              </sar-list-item>
            </sar-list>
          </template>
        </sar-checkbox-group>
      </scroll-view>
    </template>
  </sar-popout>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import SarPopoutInput from '../popout-input/popout-input.vue'
import SarPopout from '../popout/popout.vue'
import SarCheckboxGroup from '../checkbox-group/checkbox-group.vue'
import SarCheckbox from '../checkbox/checkbox.vue'
import SarList from '../list/list.vue'
import SarListItem from '../list-item/list-item.vue'
import {
  type CheckboxGroupOptionKeys,
  defaultOptionKeys,
} from '../checkbox/common'
import {
  type CheckboxInputProps,
  type CheckboxInputEmits,
  type CheckboxInputOption,
  defaultCheckboxInputProps,
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
  defineProps<CheckboxInputProps>(),
  defaultCheckboxInputProps(),
)

const emit = defineEmits<CheckboxInputEmits>()

const bem = createBem('checkbox-input')

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
  options: CheckboxInputOption[],
  optionKeys: Required<CheckboxGroupOptionKeys>,
  value: any[],
) {
  return options
    .filter((option) =>
      value.includes(getMayPrimitiveOption(option, optionKeys.value)),
    )
    .map((option) => getMayPrimitiveOption(option, optionKeys.label))
    .join(', ')
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
