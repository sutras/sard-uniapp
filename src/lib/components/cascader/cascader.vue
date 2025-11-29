<template>
  <view :class="cascaderClass" :style="cascaderStyle">
    <sar-tabs scrollable v-model:current="currentTab" :list="tabList" />

    <slot name="top" :tab-index="currentTab"></slot>

    <view :class="bem.e('container')">
      <view :class="bem.e('wrapper')" :style="wrapperStyle">
        <view
          v-for="(panel, panelIndex) in panels"
          :key="panelIndex"
          :class="bem.e('pane')"
        >
          <view :class="bem.e('options')">
            <scroll-view scroll-y trap-scroll :class="bem.e('scroll')">
              <view
                v-for="(node, optionIndex) in panel.nodes"
                :key="optionIndex"
                :class="
                  classNames(
                    bem.e('option'),
                    bem.em('option', 'selected', node.selected),
                    bem.em('option', 'checked', node.checked),
                    bem.em('option', 'disabled', node.disabled),
                  )
                "
                @click="onNodeClick(node, panelIndex)"
              >
                <view
                  v-if="multiple"
                  :class="bem.e('selection')"
                  @click.stop="onCheckClick(node)"
                >
                  <sar-checkbox
                    readonly
                    :checked="node.checked"
                    :indeterminate="node.indeterminate"
                    :disabled="node.disabled"
                  />
                </view>
                <view
                  :class="
                    classNames(
                      bem.e('option-loading'),
                      bem.em(
                        'option-loading',
                        'show',
                        node.loadStatus === 'loading',
                      ),
                    )
                  "
                >
                  <sar-loading />
                </view>
                <view :class="bem.e('option-label')">
                  {{ node.label }}
                </view>
                <view v-if="!multiple" :class="bem.e('option-icon')">
                  <sar-icon family="sari" name="success" />
                </view>
              </view>
            </scroll-view>
          </view>
        </view>
      </view>

      <view v-if="lazy && !!load" :class="loadStatusWrapperClass">
        <view :class="bem.e('load-status')">
          <sar-loading
            v-if="loadStatus === 'loading'"
            :class="bem.e('loading')"
          />
          <text
            v-else-if="loadStatus === 'error'"
            :class="bem.e('error')"
            @click="initialize"
          >
            {{ t('error') }}
          </text>
          <text
            v-else-if="loadStatus === 'loaded' && treeData.length === 0"
            :class="bem.e('empty')"
            @click="initialize"
          >
            {{ t('noData') }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import SarTabs from '../tabs/tabs.vue'
import SarIcon from '../icon/icon.vue'
import SarLoading from '../loading/loading.vue'
import SarCheckbox from '../checkbox/checkbox.vue'
import {
  type CascaderProps,
  type CascaderSlots,
  type CascaderEmits,
  type CascaderFieldKeys,
  type CascaderStateNode,
  defaultFieldKeys,
  defaultCascaderProps,
} from './common'
import { useCascaderTree } from './useCascaderTree'
import { useCascaderTabs } from './useCascaderTabs'
import { useTranslate } from '../locale'

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

const { t } = useTranslate('cascader')

// main

const mergedFieldKeys = computed(() => {
  return Object.assign(
    {},
    defaultFieldKeys,
    props.fieldKeys,
  ) as Required<CascaderFieldKeys>
})

const innerValue = ref<typeof props.modelValue>()

const {
  treeData,
  originalTreeData,
  loadStatus,
  legacyLoadChildren,
  toStateNodes,
  setSelectedByNode,
  updateChecked,
  setCheckedByNode,
  isLeaf,
  getCheckedLeaves,
  getCheckedNodes,
  getAncestors,
  initialize,
} = useCascaderTree(props, {
  fieldKeys: mergedFieldKeys,
  innerValue,
})

initialize()

const { renderedPane, panels, currentTab, tabList } = useCascaderTabs(props, {
  treeData,
})

const triggerMultipleChange = () => {
  const nodes = props.checkStrictly ? getCheckedNodes() : getCheckedLeaves()

  const nextValue = props.allLevels
    ? nodes.map((node) => getAncestors(node).map((node) => node.value))
    : nodes.map((node) => node.value)

  innerValue.value = nextValue

  const options = nodes.map((node) =>
    getAncestors(node).map((node) => node.option),
  )

  emit('update:model-value', nextValue, options)
  emit('change', nextValue, options)
}

const triggerSingleChange = (node: CascaderStateNode) => {
  const nextValue = props.allLevels
    ? panels.value
        .map((panel) => panel.selected)
        .filter(Boolean)
        .map((node) => node!.value)
    : node.value

  innerValue.value = nextValue

  const options = panels.value
    .map((panel) => panel.selected)
    .filter(Boolean)
    .map((node) => node!.option)

  emit('update:model-value', nextValue, options)
  emit('change', nextValue, options)
}

const onCheckClick = (node: CascaderStateNode) => {
  if (node.disabled) return

  setCheckedByNode(node, !node.checked)
  triggerMultipleChange()
}

const onNodeClick = async (node: CascaderStateNode, panelIndex: number) => {
  if (node.disabled) return

  if (node.loadStatus === 'loading') {
    return
  }

  if (props.lazy && props.load && !node.isLeaf && node.loadStatus === 'idle') {
    try {
      node.loadStatus = 'loading'
      const treeNodes = (await props.load(node)) || []
      node.loadStatus = 'loaded'
      node.children = toStateNodes(treeNodes, node)
      updateChecked(innerValue.value)
      node.option.children = treeNodes
      originalTreeData.value = [...originalTreeData.value]
      if (node.children.length === 0) {
        node.isLeaf = true
      } else {
        if (node.checked) {
          setCheckedByNode(node, true)
        }
      }
    } catch {
      node.loadStatus = 'idle'
      return
    }
  }

  setSelectedByNode(node)

  const isLast = isLeaf(node)

  if (!isLast) {
    currentTab.value = panels.value.length - 1
  }

  if (!isLast && node.children && node.children.length === 0) {
    node.loadStatus = 'loading'
  }

  // legacy load
  const proxyOption = new Proxy(node.option, {
    set(target, p, newValue) {
      if (p === mergedFieldKeys.value.children) {
        legacyLoadChildren.value = true

        node.loadStatus = 'loaded'
        node.children = toStateNodes(newValue, node)
        if (node.children.length === 0) {
          node.isLeaf = true
        }

        const isLast = isLeaf(node)

        if (!isLast) {
          currentTab.value = panels.value.length - 1
        }
      }
      return Reflect.set(target, p, newValue)
    },
  })

  emit('select', proxyOption, panelIndex)

  // 多选
  if (props.multiple) {
    if (isLast) {
      setCheckedByNode(node, !node.checked)
      triggerMultipleChange()
    }
  }

  // 单选
  else {
    if (isLast || props.changeOnSelect) {
      triggerSingleChange(node)
    }
  }
}

watch(
  () => props.modelValue,
  (value) => {
    if (value === innerValue.value) return

    innerValue.value = value

    updateChecked(value)

    currentTab.value = panels.value.length - 1
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

const wrapperStyle = computed(() => {
  return stringifyStyle({
    transform: `translateX(${-Number(currentTab.value) * 100}%)`,
    transitionDuration: renderedPane.value ? null : '0s',
  })
})

const loadStatusWrapperClass = computed(() => {
  return classNames(
    bem.e('load-status-wrapper'),
    bem.em(
      'load-status-wrapper',
      'show',
      loadStatus.value !== 'loaded' || treeData.value.length === 0,
    ),
  )
})
</script>

<style lang="scss">
@import './index.scss';
</style>
