<template>
  <doc-page>
    <doc-demo title="基础按钮">
      <sar-button>默认按钮</sar-button>
    </doc-demo>

    <doc-demo title="按钮类型">
      <sar-button type="default">默认</sar-button>
      <sar-button type="pale">淡颜色</sar-button>
      <sar-button type="mild">温和</sar-button>
      <sar-button type="outline">轮廓线</sar-button>
      <sar-button type="text">文本</sar-button>
      <sar-button type="pale-text">淡文本</sar-button>
    </doc-demo>

    <doc-demo title="按钮颜色">
      <sar-button theme="primary">primary</sar-button>
      <sar-button theme="success">success</sar-button>
      <sar-button theme="info">info</sar-button>
      <sar-button theme="warning">warning</sar-button>
      <sar-button theme="danger">danger</sar-button>
    </doc-demo>

    <doc-demo title="自定义颜色">
      <sar-button styles="background: fuchsia">default</sar-button>
      <sar-button
        styles="background: rgba(255, 0, 255, 0.2); color: fuchsia"
        type="pale"
      >
        pale
      </sar-button>
      <sar-button styles="color: fuchsia" type="mild">mild</sar-button>
      <sar-button styles="color: fuchsia" type="outline">outline</sar-button>
      <sar-button styles="color: fuchsia" type="text">text</sar-button>
      <sar-button styles="color: fuchsia" type="pale-text">
        pale-text
      </sar-button>
      <sar-button
        styles="background: linear-gradient(to right, orange, fuchsia)"
      >
        渐变色
      </sar-button>
    </doc-demo>

    <doc-demo title="圆形按钮">
      <sar-button round>default</sar-button>
      <sar-button round type="pale">pale</sar-button>
      <sar-button round type="mild">mild</sar-button>
      <sar-button round type="outline">outline</sar-button>
      <sar-button round type="text">text</sar-button>
      <sar-button round type="pale-text">pale-text</sar-button>
    </doc-demo>

    <doc-demo title="禁用按钮">
      <sar-button disabled>default</sar-button>
      <sar-button disabled type="pale">pale</sar-button>
      <sar-button disabled type="mild">mild</sar-button>
      <sar-button disabled type="outline">outline</sar-button>
      <sar-button disabled type="text">text</sar-button>
      <sar-button disabled type="pale-text">pale-text</sar-button>
    </doc-demo>

    <doc-demo title="块级按钮">
      <sar-button block>按钮</sar-button>
    </doc-demo>

    <doc-demo title="按钮尺寸">
      <sar-button size="small">小尺寸</sar-button>
      <sar-button>默认尺寸</sar-button>
      <sar-button size="large">大尺寸</sar-button>
    </doc-demo>

    <doc-demo title="加载中">
      <sar-button loading>primary</sar-button>
      <sar-button loading loadingText="加载中">primary</sar-button>
      <sar-button loading loadingText="加载中" loadingType="clock">
        primary
      </sar-button>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.sar-button {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
