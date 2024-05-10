<template>
  <div class="doc-layout-footer">
    MIT Licensed | Power By
    <a
      href="https://github.com/sutras"
      :style="{ marginLeft: '5px' }"
      target="_blank"
      rel="noreferrer"
    >
      https://github.com/sutras
    </a>
  </div>
</template>

<style lang="scss">
.doc-layout-footer {
  margin-top: 50px;
  margin-bottom: 20px;
  padding: 0 24px;
  text-align: center;
  font-size: var(--doc-text-sm);
  color: var(--doc-gray-500);

  @media (max-width: 768px) {
    & {
      padding: 0 16px;
    }
  }
}
</style>
