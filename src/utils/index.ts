import { createBemStruct } from 'sard-uniapp'

export const createBem = createBemStruct({
  namespace: 'doc',
  blockSeparator: '-',
  elementSeparator: '__',
  modifierSeparator: '_',
})
