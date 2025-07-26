<template>
  <view :class="cascaderClass" :style="cascaderStyle">
    <sar-tabs scrollable v-model:current="currentTab" :list="tabList" />

    <slot name="top" :tab-index="currentTab"></slot>

    <view :class="bem.e('container')">
      <view
        :class="bem.e('wrapper')"
        :style="
          stringifyStyle({
            transform: `translateX(${-Number(currentTab) * 100}%)`,
            transitionDuration: renderedPane ? null : '0s',
          })
        "
      >
        <view
          v-for="(panel, panelIndex) in panels"
          :key="panelIndex"
          :class="bem.e('pane')"
        >
          <view :class="bem.e('options')">
            <scroll-view scroll-y trap-scroll :class="bem.e('scroll')">
              <view
                v-for="(option, optionIndex) in panel.options"
                :key="optionIndex"
                :class="
                  classNames(
                    bem.e('option'),
                    bem.em(
                      'option',
                      'selected',
                      panel.selected &&
                        panel.selected[mergedFieldKeys.value] ===
                          option[mergedFieldKeys.value],
                    ),
                    bem.em(
                      'option',
                      'disabled',
                      option[mergedFieldKeys.disabled],
                    ),
                  )
                "
                @click="onOptionClick(option, panelIndex)"
              >
                <view :class="bem.e('option-label')">
                  {{
                    labelRender
                      ? labelRender(option)
                      : option[mergedFieldKeys.label]
                  }}
                </view>
                <view :class="bem.e('option-icon')">
                  <sar-icon family="sari" name="success" />
                </view>
              </view>
            </scroll-view>
            <view
              :class="
                classNames(
                  bem.e('loading-wrapper'),
                  bem.em('loading-wrapper', 'show', panel.options.length === 0),
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
import {
  classNames,
  stringifyStyle,
  createBem,
  isEmptyBinding,
  isEmptyArray,
} from '../../utils'
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
  type CascaderPanel,
  defaultFieldKeys,
  getSelectedOptionsByValue,
  defaultCascaderProps,
} from './common'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<CascaderProps>(), defaultCascaderProps)

defineSlots<CascaderSlots>()

const emit = defineEmits<CascaderEmits>()

const bem = createBem('cascader')

// main
const { t } = useTranslate('cascader')

// utils
const updatePanels = () => {
  let nextPanels: CascaderPanel[]

  if (isEmptyBinding(tempValue) || isEmptyArray(tempValue)) {
    nextPanels = [
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

    if (selectedOptions && selectedOptions.length > 0) {
      let nextOptions: CascaderOption[] | undefined = props.options

      nextPanels = selectedOptions.map((option) => {
        const panel: CascaderPanel = {
          options: nextOptions || [],
          selected: option,
        }

        nextOptions = option[mergedFieldKeys.value.children]

        return panel
      })

      if (nextOptions) {
        nextPanels.push({
          options: nextOptions,
          selected: null,
        })
      }
    } else {
      nextPanels = [
        {
          options: props.options || [],
          selected: null,
        },
      ]
    }
  }

  panels.value = nextPanels
  currentTab.value = nextPanels.length - 1

  if (!renderedPane.value) {
    setTimeout(() => {
      renderedPane.value = true
      // 确保小程序端已渲染完毕
    }, 30)
  }
}

const isLastOption = (option: CascaderOption) => {
  return !Array.isArray(option[mergedFieldKeys.value.children])
}

const onOptionClick = (option: CascaderOption, panelIndex: number) => {
  if (option.disabled) {
    return
  }

  let nextPanels = panels.value.slice()

  nextPanels[panelIndex].selected = option

  const selectBack = panelIndex < nextPanels.length - 1

  if (selectBack) {
    nextPanels = nextPanels.slice(0, panelIndex + 1)
  }

  const isLast = isLastOption(option)

  if (!isLast) {
    const nextPanel = {
      options: option[mergedFieldKeys.value.children],
      selected: null,
    }
    nextPanels.push(nextPanel)
  }

  currentTab.value = isLast ? panelIndex : nextPanels.length - 1

  if (props.allLevels) {
    tempValue = nextPanels
      .map((panel) => panel.selected)
      .filter(Boolean)
      .map((option) => option![mergedFieldKeys.value.value])
  } else {
    tempValue = option[mergedFieldKeys.value.value]
  }

  panels.value = nextPanels
  emit('select', option, panelIndex)

  // finish
  if (isLast || props.changeOnSelect) {
    const selectedOptions = nextPanels
      .map((panel) => panel.selected)
      .filter(Boolean) as CascaderOption[]

    emit('update:model-value', tempValue!, selectedOptions)
    emit('change', tempValue!, selectedOptions)
  }
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

let tempValue = props.modelValue

const currentTab = ref(0)

const renderedPane = ref(false)

const panels = ref<CascaderPanel[]>([])

const tabList = computed(() => {
  return panels.value.map((panel) => {
    const { selected } = panel
    const label = selected
      ? selected[mergedFieldKeys.value.label]
      : innerPaceholder.value
    return {
      title: label,
    }
  })
})

watch(
  () => props.modelValue,
  () => {
    if (Array.isArray(props.modelValue)) {
      if (props.modelValue.length > 0) {
        if (
          props.modelValue.every(
            (item, index) =>
              panels.value[index].selected?.[mergedFieldKeys.value.value] ===
              item,
          )
        ) {
          return
        }
      }
    } else {
      if (!isEmptyBinding(props.modelValue)) {
        if (
          panels.value.some(
            (panel) =>
              panel.selected?.[mergedFieldKeys.value.value] ===
              props.modelValue,
          )
        ) {
          return
        }
      }
    }
    tempValue = props.modelValue
    updatePanels()
  },
)

watch(
  () => props.options,
  () => {
    updatePanels()
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
