<template>
  <doc-page>
    <doc-demo title="数字键盘" full>
      <DemoNumber />
    </doc-demo>

    <doc-demo title="带小数点的数字键盘" full>
      <DemoDigit />
    </doc-demo>

    <doc-demo title="身份证键盘" full>
      <DemoIdcard />
    </doc-demo>

    <doc-demo title="随机数字键盘" full>
      <DemoRandom />
    </doc-demo>

    <doc-demo title="车牌号键盘" full>
      <DemoPlate />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoNumber from './demo/Number.vue'
import DemoDigit from './demo/Digit.vue'
import DemoIdcard from './demo/Idcard.vue'
import DemoRandom from './demo/Random.vue'
import DemoPlate from './demo/Plate.vue'
</script>

<style lang="scss" scoped>
// :deep() {

// }
</style>
