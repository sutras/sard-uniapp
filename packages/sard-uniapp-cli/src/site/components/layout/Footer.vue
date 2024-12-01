<template>
  <div class="doc-layout-footer">
    <div>MIT Licensed | Power By wuzhitao</div>
    <div class="doc-layout-link-list">
      <a
        href="https://github.com/sutras/sard-uniapp"
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>
      <a
        href="https://github.com/sutras/sard-uniapp/issues/new"
        target="_blank"
        rel="noreferrer"
      >
        报告 Bug
      </a>
      <a
        href="https://github.com/sutras/sard-uniapp/discussions"
        target="_blank"
        rel="noreferrer"
      >
        讨论区
      </a>
    </div>
  </div>
</template>

<style lang="scss">
.doc-layout-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 20px;
  padding: 0 24px;
  text-align: center;
  font-size: var(--doc-text-sm);
  color: var(--doc-tertiary-color);

  @media (max-width: 768px) {
    & {
      padding: 0 16px;
    }
  }

  a {
    color: var(--doc-tertiary-color);
    &:hover {
      color: var(--doc-blue);
    }
  }
}

.doc-layout-link-list {
  display: flex;
  flex-wrap: wrap;
  margin-left: 24px;
  gap: 8px;

  a:not(:last-child)::after {
    content: '|';
  }
}
</style>
