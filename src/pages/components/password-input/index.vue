<template>
  <doc-page emphasis title="PasswordInput 密码输入框">
    <doc-demo title="基础使用">
      <DemoBasic />
    </doc-demo>

    <doc-demo title="下划线类型">
      <DemoUnderline />
    </doc-demo>

    <doc-demo title="间距">
      <DemoGap />
    </doc-demo>

    <doc-demo title="明文显示">
      <DemoPlainText />
    </doc-demo>

    <doc-demo title="只读和禁用">
      <DemoDisabledReadOnly />
    </doc-demo>

    <doc-demo title="使用自定义键盘">
      <DemoCustomKeyboard />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoBasic from './demo/Basic.vue'
import DemoUnderline from './demo/Underline.vue'
import DemoGap from './demo/Gap.vue'
import DemoPlainText from './demo/PlainText.vue'
import DemoDisabledReadOnly from './demo/DisabledReadOnly.vue'
import DemoCustomKeyboard from './demo/CustomKeyboard.vue'
</script>
