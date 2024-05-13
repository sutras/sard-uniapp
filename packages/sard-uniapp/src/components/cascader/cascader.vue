<template>
  <view :class="cascaderClass" :style="cascaderStyle">
    <sar-tabs scrollable v-model:current="tabsCurrent" :list="tabsList" />

    <slot name="top" :tab-index="tabsCurrent"></slot>

    <view :class="bem.e('container')">
      <view
        :class="bem.e('wrapper')"
        :style="
          stringifyStyle({
            transform: `translateX(${-Number(tabsCurrent) * 100}%)`,
            transitionDuration: renderedPane ? null : '0s',
          })
        "
      >
        <view
          v-for="(tab, tabIndex) in tabs"
          :key="tabIndex"
          :class="bem.e('pane')"
        >
          <view :class="bem.e('options')">
            <scroll-view scroll-y :class="bem.e('scroll')">
              <view
                v-for="(option, optionIndex) in tab.options"
                :key="optionIndex"
                :class="
                  classNames(
                    bem.e('option'),
                    bem.em(
                      'option',
                      'selected',
                      tab.selected &&
                        tab.selected[mergedFieldKeys.value] ===
                          option[mergedFieldKeys.value],
                    ),
                    bem.em(
                      'option',
                      'disabled',
                      option[mergedFieldKeys.disabled],
                    ),
                  )
                "
                @click="onOptionClick(option, tabIndex)"
              >
                <view :class="bem.e('option-label')">
                  {{
                    labelRender
                      ? labelRender(option)
                      : option[mergedFieldKeys.label]
                  }}
                </view>
                <view :class="bem.e('option-icon')">
                  <sar-icon name="success" />
                </view>
              </view>
            </scroll-view>
            <view
              :class="
                classNames(
                  bem.e('loading-wrapper'),
                  bem.em('loading-wrapper', 'show', tab.options.length === 0),
                )
              "
            >
              <view :class="bem.e('loading')">
                <sar-loading />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import { useTranslate } from '../locale'
import SarTabs from '../tabs/tabs.vue'
import SarIcon from '../icon/icon.vue'
import SarLoading from '../loading/loading.vue'
import {
  type CascaderProps,
  type CascaderSlots,
  type CascaderEmits,
  type CascaderOption,
  type CascaderFieldKeys,
  type CascaderTab,
  defaultFieldKeys,
  getSelectedOptionsByValue,
  cascaderPropsDefaults,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<CascaderProps>(), cascaderPropsDefaults)

defineSlots<CascaderSlots>()

const emit = defineEmits<CascaderEmits>()

const bem = createBem('cascader')

// main
const { t } = useTranslate('cascader')

// utils
const updateTabs = () => {
  let nextTabs: CascaderTab[] | undefined

  if (tempValue === undefined) {
    nextTabs = [
      {
        options: props.options || [],
        selected: null,
      },
    ]
  } else {
    const selectedOptions = getSelectedOptionsByValue(
      props.options || [],
      tempValue,
      mergedFieldKeys.value,
    )

    if (selectedOptions) {
      let nextOptions: CascaderOption[] | undefined = props.options

      nextTabs = selectedOptions.map((option) => {
        const tab = {
          options: nextOptions as CascaderOption[],
          selected: option,
        }

        nextOptions = option.children

        return tab
      })

      if (nextOptions) {
        nextTabs.push({
          options: nextOptions,
          selected: null,
        })
      }
    }
  }

  if (nextTabs) {
    tabs.value = nextTabs
    tabsCurrent.value = nextTabs.length - 1

    if (!renderedPane.value) {
      setTimeout(() => {
        renderedPane.value = true
        // 确保小程序端已渲染完毕
      }, 30)
    }
  }
}

const isLastOption = (option: CascaderOption) => {
  return !Array.isArray(option[mergedFieldKeys.value.children])
}

const onOptionClick = (option: CascaderOption, tabIndex: number) => {
  if (option.disabled) {
    return
  }

  let nextTabs = tabs.value.slice()

  nextTabs[tabIndex].selected = option

  const selectBack = tabIndex < nextTabs.length - 1

  if (selectBack) {
    nextTabs = nextTabs.slice(0, tabIndex + 1)
  }

  if (!isLastOption(option)) {
    const nextTab = {
      options: option[mergedFieldKeys.value.children],
      selected: null,
    }
    nextTabs.push(nextTab)
    tabsCurrent.value = nextTabs.length - 1
  } else {
    // finish
    tabsCurrent.value = tabIndex
    const nextValue = option[mergedFieldKeys.value.value]
    innerValue.value = nextValue
    emit(
      'update:model-value',
      nextValue,
      nextTabs.map((tab) => tab.selected) as CascaderOption[],
    )
  }

  tempValue = option[mergedFieldKeys.value.value]
  tabs.value = nextTabs
  emit('select', option, tabIndex)
}

// main
const innerPaceholder = computed(() => {
  return props.hintText || t('pleaseSelect')
})

const mergedFieldKeys = computed(() => {
  return Object.assign(
    {},
    defaultFieldKeys,
    props.fieldKeys,
  ) as Required<CascaderFieldKeys>
})

const innerValue = ref(props.modelValue)

let tempValue = innerValue.value

const tabsCurrent = ref(0)

const renderedPane = ref(false)

const tabs = ref<CascaderTab[]>([])

const tabsList = computed(() => {
  return tabs.value.map((tab) => {
    const { selected } = tab
    const tabLabel = selected
      ? selected[mergedFieldKeys.value.label]
      : innerPaceholder.value
    return {
      title: tabLabel,
    }
  })
})

watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue

    if (props.modelValue !== undefined) {
      if (
        tabs.value.some(
          (tab) =>
            tab.selected?.[mergedFieldKeys.value.value] === props.modelValue,
        )
      ) {
        return
      }
    }
    tempValue = props.modelValue
    updateTabs()
  },
)

watch(
  () => props.options,
  () => {
    updateTabs()
  },
  {
    immediate: true,
  },
)

// others
const cascaderClass = computed(() => {
  return classNames(bem.b(), props.rootClass)
})

const cascaderStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})
</script>

<style lang="scss">
@import './index.scss';
</style>
