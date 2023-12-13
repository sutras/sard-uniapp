<template>
  <view :class="cascaderClass" :style="cascaderStyle">
    <Tabs scrollable v-model:current="tabsCurrent" :list="tabsList" />

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
                        tab.selected[fieldkeys.value] ===
                          option[fieldkeys.value],
                    ),
                    bem.em('option', 'disabled', option[fieldkeys.disabled]),
                  )
                "
                @click="onOptionClick(option, tabIndex)"
              >
                <view :class="bem.e('option-label')">
                  {{
                    labelRender ? labelRender(option) : option[fieldkeys.label]
                  }}
                </view>
                <view :class="bem.e('option-icon')">
                  <Icon name="success" />
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
                <Loading />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { classNames, stringifyStyle, createBem } from '../utils'
import { useTranslate } from '../locale'
import Tabs from '../tabs/tabs.vue'
import Icon from '../icon/icon.vue'
import Loading from '../loading/loading.vue'
import {
  type CascaderOption,
  type CascaderFieldNames,
  type CascaderTab,
  defaultFieldNames,
  getSelectedOptionsByValue,
  cascaderProps,
} from './common'

const props = defineProps(cascaderProps)

const emit = defineEmits(['update:model-value', 'select'])

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
      fieldkeys.value,
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
  return !Array.isArray(option[fieldkeys.value.children])
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
      options: option[fieldkeys.value.children],
      selected: null,
    }
    nextTabs.push(nextTab)
    tabsCurrent.value = nextTabs.length - 1
  } else {
    // finish
    tabsCurrent.value = tabIndex
    const nextValue = option[fieldkeys.value.value]
    innerValue.value = nextValue
    emit(
      'update:model-value',
      nextValue,
      nextTabs.map((tab) => tab.selected) as CascaderOption[],
    )
  }

  tempValue = option[fieldkeys.value.value]
  tabs.value = nextTabs
  emit('select', option, tabIndex)
}

// main
const innerPaceholder = computed(() => {
  return props.hintText || t('pleaseSelect')
})

const fieldkeys = computed(() => {
  return Object.assign(
    {},
    defaultFieldNames,
    props.fieldNames,
  ) as Required<CascaderFieldNames>
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
      ? selected[fieldkeys.value.label]
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
          (tab) => tab.selected?.[fieldkeys.value.value] === props.modelValue,
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
@use './index.scss';
</style>
