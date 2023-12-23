<template>
  <view :class="keyboardClass" :style="keyboardStyle">
    <view :class="bem.e('content')">
      <template v-if="type === 'number'">
        <view
          v-for="key in numberKeys"
          :key="key"
          :class="classNames(bem.e('key-wrapper'), bem.em('key-wrapper', key))"
          @click="onKeyClick(key)"
        >
          <view :class="bem.e('key')">
            {{ key }}
          </view>
        </view>
      </template>
      <template v-else-if="type === 'digit'">
        <view
          v-for="key in digitKeys"
          :key="key"
          :class="classNames(bem.e('key-wrapper'), bem.em('key-wrapper', key))"
          @click="onKeyClick(key)"
        >
          <view :class="bem.e('key')">
            {{ key }}
          </view>
        </view>
      </template>
      <template v-else-if="type === 'idcard'">
        <view
          v-for="key in idcardKeys"
          :key="key"
          :class="classNames(bem.e('key-wrapper'), bem.em('key-wrapper', key))"
          @click="onKeyClick(key)"
        >
          <view :class="bem.e('key')">
            {{ key }}
          </view>
        </view>
      </template>
      <template v-else-if="type === 'random'">
        <view
          v-for="key in randomKeys"
          :key="key"
          :class="classNames(bem.e('key-wrapper'), bem.em('key-wrapper', key))"
          @click="onKeyClick(key)"
        >
          <view :class="bem.e('key')">
            {{ key }}
          </view>
        </view>
      </template>
      <template v-else-if="type === 'plate'">
        <template v-if="mode === 'chinese'">
          <view
            v-for="(key, i) in chineseKeys"
            :key="key"
            :class="
              classNames(bem.e('key-wrapper'), bem.em('key-wrapper', key))
            "
            :style="`order: ${i}`"
            @click="onKeyClick(key)"
          >
            <view :class="bem.e('key')">
              {{ key }}
            </view>
          </view>
          <view
            :class="bem.e('intercept')"
            :style="`order: ${interceptOrder}`"
          ></view>
        </template>
        <template v-if="mode === 'english'">
          <view
            v-for="(key, i) in englishKeys"
            :key="key"
            :style="`order: ${i}`"
            :class="
              classNames(bem.e('key-wrapper'), bem.em('key-wrapper', key))
            "
            @click="onKeyClick(key)"
          >
            <view :class="bem.e('key')">
              {{ key }}
            </view>
          </view>
        </template>
        <view
          :class="toggleClass"
          :style="`order: ${interceptOrder}`"
          @click="onToggle"
        >
          <view :class="bem.e('key')">
            {{ toggleKey }}
          </view>
        </view>
      </template>
      <view :class="backspaceClass" style="order: 100" @click="onBackspace">
        <view :class="bem.e('key')">
          <sar-icon name="backspace" />
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
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  numberKeys,
  digitKeys,
  idcardKeys,
  chineseKeys,
  englishKeys,
  getRandomKeys,
  keyboardProps,
  KeyBoardExpose,
} from './common'
import SarIcon from '../icon/icon.vue'

const props = defineProps(keyboardProps)

const emit = defineEmits(['input', 'delete'])

const bem = createBem('keyboard')

// main
const onKeyClick = (key: string) => {
  emit('input', key)
}

const onBackspace = () => {
  emit('delete')
}

defineExpose<KeyBoardExpose>({
  shuffle() {
    randomKeys.value = getRandomKeys()
  },
  toggle() {
    onToggle()
  },
})

// random
const randomKeys = ref<string[]>([])
watch(
  () => props.type,
  () => {
    if (props.type === 'random') {
      randomKeys.value = getRandomKeys()
    }
  },
  {
    immediate: true,
  },
)

// 车牌号
const mode = ref<'chinese' | 'english'>('chinese')

const toggleKey = computed(() => {
  return {
    chinese: 'ABC',
    english: '省份',
  }[mode.value]
})

const interceptOrder = computed(() => {
  if (mode.value === 'english') {
    return englishKeys.length - 8
  }
  const overflow = chineseKeys.length % 10
  return chineseKeys.length - (overflow > 7 ? 0 : overflow + 1)
})

const onToggle = () => {
  mode.value = mode.value === 'chinese' ? 'english' : 'chinese'
}

// others
const keyboardClass = computed(() => {
  return classNames(bem.b(), bem.m(props.type), props.rootClass)
})

const keyboardStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const toggleClass = computed(() => {
  return classNames(bem.e('key-wrapper'), bem.em('key-wrapper', 'toggle'))
})

const backspaceClass = computed(() => {
  return classNames(bem.e('key-wrapper'), bem.em('key-wrapper', 'backspace'))
})
</script>

<style lang="scss">
@import './index.scss';
</style>
