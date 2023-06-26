<!-- import { createElement } from 'react'
import Code from './code'
import genHash from '../../../src/utils/genHash'

export default function Demo({ children }) {
  const { doc } = children

  return (
    <div className="doc-card">
      <div
        dangerouslySetInnerHTML={{
          __html: genHash(doc.doc),
        }}
      ></div>

      <div className="doc-demo">{createElement(children)}</div>

      <Code code={doc.code}></Code>
    </div>
  )
} -->

<template>
  <div className="doc-card">
    <div v-html="genHash(doc.doc)"></div>

    <div className="doc-demo">
      <slot></slot>
    </div>

    <Code :code="doc.code"></Code>
  </div>
</template>

<script setup lang="ts">
// import Code from './code/index.vue'
import genHash from '../../../utils/genHash'

defineProps({
  doc: {
    type: Object,
    default() {
      return {
        code: '',
        doc: '',
      }
    },
  },
})
</script>
