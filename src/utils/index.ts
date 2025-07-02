import { createBemStruct, getWindowInfo } from 'sard-uniapp'

export const createBem = createBemStruct({
  namespace: 'doc',
  blockSeparator: '-',
  elementSeparator: '__',
  modifierSeparator: '_',
})

export const navbarHeight = uni.upx2px(88)
export const statusBarHeight = getWindowInfo().statusBarHeight
export const safeAreaTop = navbarHeight + statusBarHeight
