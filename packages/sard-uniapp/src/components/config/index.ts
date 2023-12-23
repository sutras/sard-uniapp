import { reactive } from 'vue'
import { type App, provide, inject } from 'vue'

export const defaultConfig = {
  actionSheet: {
    overlayClosable: true,
  },
  avatar: {
    shape: 'circle',
  },
  badge: {
    value: 0,
    max: 99,
  },
  button: {
    type: 'default',
    theme: 'primary',
    size: 'medium',
  },
  calendar: {
    type: 'single',
    maxDays: Number.MAX_SAFE_INTEGER,
    weekStartsOn: 0,
  },
  calendarInput: {
    showConfirm: true,
    validateEvent: true,
  },
  cascaderInput: {
    showConfirm: true,
    validateEvent: true,
  },
  checkbox: {
    validateEvent: true,
  },
  checkboxGroup: {
    direction: 'vertical',
    validateEvent: true,
  },
  countDown: {
    time: 0,
    autoStart: true,
    format: 'HH:mm:ss',
  },
  datetimePicker: {
    type: 'yMd',
  },
  datetimePickerInput: {
    validateEvent: true,
  },
  dialog: {
    headed: true,
    buttonType: 'round',
    showCancel: true,
    showConfirm: true,
    overlayClosable: true,
    duration: 300,
  },
  dialogAgent: {
    id: 'dialog',
  },
  dropdown: {
    direction: 'down',
    disabled: false,
    awayClosable: true,
    overlayClosable: true,
    duration: 300,
  },
  empty: {
    icon: 'empty',
  },
  form: {
    validateTrigger: 'change',
    validateOnRuleChange: true,
    direction: 'horizontal',
    labelAlign: 'start',
    labelValign: 'center',
    starPosition: 'left',
    showError: true,
    scrollDuration: 150,
  },
  grid: {
    columns: 4,
    direction: 'vertical',
  },
  icon: {
    name: '',
    family: 'sari',
  },
  indexes: {
    hintDuration: 300,
  },
  input: {
    maxlength: 140,
    adjustPosition: true,
    ignoreCompositionEvent: true,
    showConfirmBar: true,
    disableDefaultPadding: true,
    modelValue: '',
    validateEvent: true,
  },
  keyboard: {
    type: 'number',
  },
  listItem: {
    arrowDirection: 'right',
  },
  loading: {
    type: 'circular',
  },
  noticeBar: {
    delay: 1000,
    speed: 50,
    scrollable: 'auto',
    visible: true,
  },
  notify: {
    type: 'primary',
    position: 'top',
    duration: 300,
    timeout: 3000,
  },
  notifyAgent: {
    id: 'notify',
  },
  overlay: {
    duration: 300,
  },
  pagination: {
    total: 0,
    pageSize: 10,
    current: 1,
    pageButtonCount: 5,
    type: 'multi',
    multiCount: 5,
  },
  passwordInput: {
    length: 6,
    type: 'border',
    validateEvent: true,
  },
  picker: {
    immediateChange: false,
  },
  pickerInput: {
    validateEvent: true,
  },
  popout: {
    type: 'loose',
    showConfirm: true,
    showClose: true,
    showFooter: true,
    overlayClosable: true,
    duration: 300,
  },
  popover: {
    position: 'bottom',
    direction: 'vertical',
    theme: 'light',
    refGap: 10,
    viewportGap: 10,
    transparent: true,
    duration: 300,
  },
  popup: {
    duration: 300,
    effect: 'fade',
    overlay: true,
  },
  progressBar: {
    percent: 0,
    showText: true,
  },
  progressCircle: {
    percent: 0,
    thickness: 4,
  },
  radioGroup: {
    direction: 'vertical',
    validateEvent: true,
  },
  rate: {
    count: 5,
    icon: 'star-fill',
    voidIcon: 'star',
    validateEvent: true,
  },
  result: {
    status: 'info',
  },
  search: {
    shape: 'square',
  },
  shareSheet: {
    overlayClosable: true,
    duration: 300,
  },
  skeleton: {
    rows: 3,
    loading: true,
  },
  slider: {
    min: 0,
    max: 100,
    step: 1,
    validateEvent: true,
  },
  stepper: {
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    step: 1,
    inputType: 'number',
    press: true,
    pressTime: 350,
    interval: 150,
    validateEvent: true,
  },
  steps: {
    current: 0,
    center: false,
    direction: 'horizontal',
    finishIcon: 'check-circle-fill',
    processIcon: 'circle',
    waitIcon: 'circle',
    errorIcon: 'x-circle',
  },
  swiperDot: {
    type: 'dot',
    current: 0,
    total: 0,
    field: 'title',
  },
  switch: {
    checkedValue: true,
    uncheckedValue: false,
    validateEvent: true,
  },
  tabbar: {
    bordered: true,
  },
  tabs: {
    type: 'line',
  },
  tag: {
    theme: 'default',
    size: 'medium',
  },
  toast: {
    type: 'text',
    position: 'center',
    overlay: false,
    timeout: 1500,
    duration: 300,
  },
  toastAgent: {
    id: 'toast',
  },
  upload: {
    accept: 'image',
    sourceType: () => ['album', 'camera'],
    sizeType: () => ['original', 'compressed'],
    maxDuration: 60,
    maxCount: Number.MAX_SAFE_INTEGER,
    maxSize: Number.MAX_SAFE_INTEGER,
    removable: true,
    validateEvent: true,
  },
  uploadPreview: {
    status: 'pending',
  },
}

export type ConfigOptions = typeof defaultConfig

function extendProps(
  source: Record<string, Record<string, any>>,
  target: Record<string, Record<string, any>>,
) {
  for (const name in target) {
    const sourceProps = source[name]
    const targetProps = target[name]
    if (sourceProps) {
      for (const prop in targetProps) {
        const targetValue = targetProps[prop]
        sourceProps[prop] = targetValue
      }
    }
  }
}

export function setConfig(...optionsArgs: DeepPartial<ConfigOptions>[]) {
  optionsArgs.forEach((options) => {
    extendProps(defaultConfig, options)
  })
}

export function getDurationConfig(duration: number) {
  return {
    dialog: {
      duration,
    },
    dropdown: {
      duration,
    },
    notify: {
      duration,
    },
    overlay: {
      duration,
    },
    popout: {
      duration,
    },
    popover: {
      duration,
    },
    popup: {
      duration,
    },
    shareSheet: {
      duration,
    },
    toast: {
      duration,
    },
  }
}

export type ConfigContext = DeepPartial<ConfigOptions>

export const configContextSymbol = Symbol('config-context')

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record<any, any> ? DeepPartial<T[P]> : T[P]
}

export function Config(
  app: App,
  options: DeepPartial<ConfigOptions> = {},
): any {
  app.provide<DeepPartial<ConfigOptions>>(
    configContextSymbol,
    reactive(options),
  )
}

export function useConfigContext() {
  return inject<ConfigContext | null>(configContextSymbol, null)
}

export function useProvideConfigContext(
  options: DeepPartial<ConfigOptions> = {},
) {
  const context = useConfigContext()
  provide<ConfigContext>(
    configContextSymbol,
    Object.assign({}, context, options),
  )
}
