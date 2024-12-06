import { config } from '@vue/test-utils'
import { h } from 'vue'

config.global.stubs = {
  ScrollView: h('div'),
  PickerView: h('div'),
  PickerViewColumn: h('div'),
}

const systemInfo = {
  SDKVersion: '',
  appId: '',
  appLanguage: 'zh-Hans',
  appName: '',
  appVersion: '1.0.0',
  appVersionCode: '100',
  browserName: 'edge',
  browserVersion: '119.0.0.0',
  deviceId: '17016399726514856108',
  deviceModel: 'PC',
  deviceOrientation: 'portrait',
  devicePixelRatio: 2,
  deviceType: 'pc',
  hostLanguage: 'zh-CN',
  hostName: 'edge',
  hostTheme: 'light',
  hostVersion: '119.0.0.0',
  language: 'zh-CN',
  model: 'PC',
  osName: 'macos',
  osVersion: '10.15.7',
  pixelRatio: 2,
  platform: 'macos',
  safeArea: {
    left: 0,
    right: 375,
    top: 0,
    bottom: 667,
    width: 375,
    height: 667,
  },
  safeAreaInsets: { top: 0, right: 0, bottom: 0, left: 0 },
  screenHeight: 982,
  screenWidth: 1512,
  statusBarHeight: 0,
  system: 'macOS 10.15.7',
  theme: 'light',
  ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
  uniCompileVersion: '3.98',
  uniPlatform: 'web',
  uniRuntimeVersion: '3.98',
  version: '',
  windowBottom: 0,
  windowHeight: 623,
  windowTop: 44,
  windowWidth: 375,
}

const execCallbackParam = [
  {
    id: '__sar_bg7k0n',
    dataset: { 'v-61de04f9': '', v61de04f9: '' },
    left: 28,
    right: 347,
    top: 98.5,
    bottom: 102.5,
    width: 319,
    height: 4,
  },
]

const fieldsResponse = {
  id: '__sar_9dq4rp',
  dataset: { 'v-61de04f9': '', v61de04f9: '' },
  left: 28,
  right: 347,
  top: 98.5,
  bottom: 102.5,
  width: 319,
  height: 4,
  scrollLeft: 0,
  scrollTop: 0,
  scrollHeight: 0,
  scrollWidth: 0,
}

const boundingClientRectCallbackParam = {
  id: '__sar_8bb72c',
  dataset: { 'v-61de04f9': '', v61de04f9: '' },
  left: 28,
  right: 347,
  top: 54.5,
  bottom: 58.5,
  width: 319,
  height: 4,
}

const scrollOffsetCallbackParam = {
  id: '',
  dataset: {},
  scrollLeft: 0,
  scrollTop: 1411,
  scrollHeight: 2154,
  scrollWidth: 375,
}

Object.defineProperty(globalThis, 'tempFiles', {
  value: [],
  writable: true,
  enumerable: true,
  configurable: true,
})

const uniObject = {
  pageScrollTo() {
    void 0
  },
  getSystemInfoSync() {
    return systemInfo
  },
  getSystemInfo() {
    return Promise.resolve(systemInfo)
  },
  previewImage() {
    void 0
  },
  chooseImage({ success }: any) {
    success({
      tempFiles: Reflect.get(globalThis, 'tempFiles'),
    })
  },
  chooseVideo() {
    void 0
  },
  createVideoContext() {
    return {
      play() {
        void 0
      },
      pause() {
        void 0
      },
      requestFullScreen() {
        void 0
      },
    }
  },
  navigateTo() {
    void 0
  },
  redirectTo() {
    void 0
  },
  setClipboardData() {
    void 0
  },
  createSelectorQuery() {
    return new SelectorQuery()
  },
}

class NodesRef {
  fields(object: any, callback: any) {
    void object
    callback?.(fieldsResponse)
  }

  boundingClientRect(callback: any) {
    callback?.(boundingClientRectCallbackParam)
  }

  scrollOffset(callback: any) {
    callback?.(scrollOffsetCallbackParam)
  }

  node(callback: any) {
    callback?.({
      node: null,
    })
    return new SelectorQuery()
  }
}

class SelectorQuery {
  in() {
    return this
  }

  select() {
    return new NodesRef()
  }

  selectAll() {
    return new NodesRef()
  }

  selectViewport() {
    return new NodesRef()
  }

  exec(callback: any) {
    callback?.(execCallbackParam)
  }
}

Object.defineProperty(globalThis, 'uni', {
  get() {
    return uniObject
  },
})
