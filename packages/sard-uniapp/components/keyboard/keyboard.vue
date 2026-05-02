<template>
  <view :class="keyboardClass" :style="keyboardStyle">
    <view :class="bem.e('content')">
      <template v-if="type === 'number'">
        <view
          v-for="key in numberKeys"
          :key="key"
          :class="getKeyWrapperClass(key)"
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
          :class="getKeyWrapperClass(key)"
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
          :class="getKeyWrapperClass(key)"
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
          :class="getKeyWrapperClass(key)"
          @click="onKeyClick(key)"
        >
          <view :class="bem.e('key')">
            {{ key }}
          </view>
        </view>
      </template>
      <template v-else-if="type === 'plate'">
        <template v-if="innerMode === 'chinese'">
          <view
            v-for="(key, i) in chineseKeys"
            :key="key"
            :class="getKeyWrapperClass(key)"
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
        <template v-if="innerMode === 'english'">
          <view
            v-for="(key, i) in englishKeys"
            :key="key"
            :style="`order: ${i}`"
            :class="getKeyWrapperClass(key)"
            @click="onKeyClick(key)"
          >
            <view :class="bem.e('key')">
              {{ key }}
            </view>
          </view>
        </template>
        <view
          :class="getKeyWrapperClass('toggle')"
          :style="`order: ${interceptOrder}`"
          @click="toggle()"
        >
          <view :class="bem.e('key')">
            {{ toggleKey }}
          </view>
        </view>
      </template>
      <view :class="backspaceClass" style="order: 100" @click="onBackspace">
        <view :class="bem.e('key')">
          <sar-icon family="sari" name="backspace" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { classNames, stringifyStyle, createBem } from '../../utils'
import {
  type KeyboardProps,
  type KeyboardSlots,
  type KeyboardEmits,
  type KeyBoardExpose,
  type KeyboardPlateMode,
  numberKeys,
  digitKeys,
  idcardKeys,
  chineseKeys,
  englishKeys,
  getRandomKeys,
  defaultKeyboardProps,
} from './common'
import SarIcon from '../icon/icon.vue'

defineOptions({
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<KeyboardProps>(), defaultKeyboardProps())

defineSlots<KeyboardSlots>()

const emit = defineEmits<KeyboardEmits>()

const bem = createBem('keyboard')

// main
const onKeyClick = (key: string) => {
  if (props.type === 'plate') {
    if (key === 'I' || key === 'O') {
      return
    }
    if (chineseKeys.includes(key)) {
      toggle()
    }
  }
  emit('input', key)
}

const onBackspace = () => {
  emit('delete')
}

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
const innerMode = ref(props.mode)

watch(
  () => props.mode,
  () => {
    innerMode.value = props.mode
  },
)

const toggleKey = computed(() => {
  return {
    chinese: 'ABC',
    english: '省份',
  }[innerMode.value]
})

const interceptOrder = computed(() => {
  if (innerMode.value === 'english') {
    return englishKeys.length - 8
  }
  const overflow = chineseKeys.length % 10
  return chineseKeys.length - (overflow > 7 ? 0 : overflow + 1)
})

const toggle = (mode?: KeyboardPlateMode) => {
  const nextMode =
    mode || (innerMode.value === 'chinese' ? 'english' : 'chinese')
  if (nextMode === innerMode.value) {
    return
  }
  innerMode.value = nextMode
  emit('toggle', innerMode.value)
  emit('update:mode', innerMode.value)
}

defineExpose<KeyBoardExpose>({
  shuffle() {
    randomKeys.value = getRandomKeys()
  },
  toggle,
})

// others
const getKeyWrapperClass = (key: string) => {
  return classNames(
    bem.e('key-wrapper'),
    bem.em('key-wrapper', key),
    bem.em('key-wrapper', 'disabled', props.disabledKey?.(key)),
  )
}

const keyboardClass = computed(() => {
  return classNames(bem.b(), bem.m(props.type), props.rootClass)
})

const keyboardStyle = computed(() => {
  return stringifyStyle(props.rootStyle)
})

const backspaceClass = computed(() => {
  return classNames(bem.e('key-wrapper'), bem.em('key-wrapper', 'backspace'))
})
</script>

<style lang="scss">
@import './index.scss';
</style>
