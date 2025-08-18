<template>
  <doc-page title="CoolIcon 酷炫图标">
    <doc-demo title="椭圆">
      <DemoOval />
    </doc-demo>

    <doc-demo title="圆形">
      <DemoCircle />
    </doc-demo>

    <doc-demo title="方形">
      <DemoSquare />
    </doc-demo>

    <doc-demo title="三角形">
      <DemoTriangle />
    </doc-demo>

    <doc-demo title="花朵">
      <DemoFlower />
    </doc-demo>

    <doc-demo title="尺寸">
      <DemoSize />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import DemoOval from './demo/Oval.vue'
import DemoCircle from './demo/Circle.vue'
import DemoSquare from './demo/Square.vue'
import DemoTriangle from './demo/Triangle.vue'
import DemoFlower from './demo/Flower.vue'
import DemoSize from './demo/Size.vue'
</script>
