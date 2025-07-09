import { type AvatarProps } from '../avatar'
import { type AlertProps } from '../alert'
import { type ButtonProps } from '../button'
import { type CalendarInputProps } from '../calendar-input'
import { type CalendarProps } from '../calendar'
import { type CascaderInputProps } from '../cascader-input'
import { type CheckboxGroupProps } from '../checkbox'
import { type CheckboxInputProps } from '../checkbox-input'
import { type DatetimePickerInputProps } from '../datetime-picker-input'
import { type DatetimeRangePickerInputProps } from '../datetime-range-picker-input'
import { type DialogProps } from '../dialog'
import { type DropdownProps } from '../dropdown'
import { type FloatingBubbleProps } from '../floating-bubble'
import { type FormProps } from '../form'
import { type GridProps } from '../grid'
import { type IconProps } from '../icon'
import { type InputProps } from '../input'
import { type KeyboardProps } from '../keyboard'
import { type ListItemProps } from '../list'
import { type LoadingProps } from '../loading'
import { type MarqueeProps } from '../marquee'
import { type NoticeBarProps } from '../notice-bar'
import { type NotifyProps } from '../notify'
import { type PaginationProps } from '../pagination'
import { type PasswordInputProps } from '../password-input'
import { type PickerInputProps } from '../picker-input'
import { type PopoutProps } from '../popout'
import { type PopoverProps } from '../popover'
import { type PopupProps } from '../popup'
import { type QrcodeProps } from '../qrcode'
import { type RadioGroupProps } from '../radio'
import { type RadioInputProps } from '../radio-input'
import { type RadioPopoutProps } from '../radio-popout'
import { type ResultProps } from '../result'
import { type SearchProps } from '../search'
import { type SpaceProps } from '../space'
import { type StepperProps } from '../stepper'
import { type StepsProps } from '../steps'
import { type SwiperDotProps } from '../swiper-dot'
import { type TabsProps } from '../tabs'
import { type TagProps } from '../tag'
import { type ToastProps } from '../toast'
import { type TreeProps } from '../tree'
import { type UploadPreviewProps, type UploadProps } from '../upload'
import { type DividerProps } from '../divider'

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record<any, any> ? DeepPartial<T[P]> : T[P]
}

// #defaultConfig
export const defaultConfig = {
  // 全局初始 zIndex
  initialZIndex: 1000,

  /**
   * 设置点击清除按钮后的值
   *
   * - 类型：() => any
   * - 默认值：() = undefined
   *
   * 支持以下组件：
   *
   * - CalendarInput
   * - DatetimePickerInput
   * - DatetimeRangePickerInput
   * - CascaderInput
   * - CheckboxInput
   * - PickerInput
   * - RadioInput
   */
  valueOnClear: undefined as (() => any) | undefined,

  actionSheet: {
    overlayClosable: true,
    duration: 250,
  },
  alert: {
    type: 'primary' as AlertProps['type'],
  },
  avatar: {
    shape: 'circle' as AvatarProps['shape'],
  },
  backTop: {
    visibleHeight: 200,
  },
  badge: {
    value: 0,
    max: 99,
  },
  button: {
    type: 'default' as ButtonProps['type'],
    theme: 'primary' as ButtonProps['theme'],
    size: 'medium' as ButtonProps['size'],
    hoverStopPropagation: false,
    lang: 'en',
    showMessageCard: false,
    block: true,
    loadingType: undefined as LoadingProps['type'],
  },
  calendar: {
    type: 'single' as CalendarProps['type'],
    maxDays: Number.MAX_SAFE_INTEGER,
    weekStartsOn: 0,
  },
  calendarInput: {
    outletFormat: 'YYYY-MM-DD',
    valueOnClear: undefined as CalendarInputProps['valueOnClear'],
  },
  calendarPopout: {
    showConfirm: true,
    validateEvent: true,
  },
  cascaderPopout: {
    showConfirm: true,
    validateEvent: true,
  },
  cascaderInput: {
    valueOnClear: undefined as CascaderInputProps['valueOnClear'],
  },
  checkbox: {
    validateEvent: true,
  },
  checkboxGroup: {
    direction: 'vertical' as CheckboxGroupProps['direction'],
    validateEvent: true,
  },
  checkboxInput: {
    valueOnClear: undefined as CheckboxInputProps['valueOnClear'],
  },
  checkboxPopout: {
    validateEvent: true,
  },
  countDown: {
    time: 0,
    autoStart: true,
    format: 'HH:mm:ss',
  },
  countTo: {
    value: 0,
    precision: 0,
    separatorDigit: 3,
    duration: 2000,
  },
  cropImage: {
    duration: 150,
    cropScale: '1:1',
    type: 'png' as const,
    quality: 0.92,
  },
  cropImageAgent: {
    id: 'cropImage',
  },
  datetimePicker: {
    type: 'yMd',
    calendar: 'solar' as const,
  },
  datetimePickerInput: {
    valueOnClear: undefined as DatetimePickerInputProps['valueOnClear'],
  },
  datetimePickerPopout: {
    validateEvent: true,
  },
  datetimeRangePicker: {
    type: 'yMd',
  },
  datetimeRangePickerInput: {
    valueOnClear: undefined as DatetimeRangePickerInputProps['valueOnClear'],
  },
  datetimeRangePickerPopout: {
    validateEvent: true,
  },
  dialog: {
    headed: true,
    buttonType: 'round' as DialogProps['buttonType'],
    showCancel: true,
    showConfirm: true,
    overlayClosable: true,
    duration: 200,
  },
  dialogAgent: {
    id: 'dialog',
  },
  divider: {
    type: 'solid' as DividerProps['type'],
    hairline: true,
    position: 'center' as DividerProps['position'],
  },
  dropdown: {
    direction: 'down' as DropdownProps['direction'],
    disabled: false,
    awayClosable: true,
    overlayClosable: true,
    duration: 200,
  },
  empty: {
    icon: 'empty',
  },
  fab: {
    overlayClosable: false,
    hideName: false,
    duration: 150,
  },
  floatingBubble: {
    axis: 'y' as FloatingBubbleProps['axis'],
    gapX: 24,
    gapY: 24,
  },
  floatingPanel: {
    duration: 300,
    contentDraggable: true,
    safeAreaInsetBottom: true,
  },
  form: {
    validateTrigger: 'change' as FormProps['validateTrigger'],
    validateOnRuleChange: true,
    direction: 'horizontal' as FormProps['direction'],
    labelAlign: 'start' as FormProps['labelAlign'],
    labelValign: 'center' as FormProps['labelValign'],
    starPosition: 'left' as FormProps['starPosition'],
    showError: true,
    scrollDuration: 150,
  },
  formItem: {
    showError: true,
  },
  grid: {
    columns: 4,
    direction: 'vertical' as GridProps['direction'],
  },
  icon: {
    name: '',
    family: 'sari',
    separate: false as IconProps['separate'],
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
    cursorSpacing: 30,
    confirmType: 'done' as InputProps['confirmType'],
    cursor: -1,
    selectionStart: -1,
    selectionEnd: -1,
    inputmode: 'text' as InputProps['inputmode'],
  },
  keyboard: {
    type: 'number' as KeyboardProps['type'],
  },
  listItem: {
    arrowDirection: 'right' as ListItemProps['arrowDirection'],
  },
  loading: {
    type: 'circular' as LoadingProps['type'],
  },
  marquee: {
    direction: 'vertical' as MarqueeProps['direction'],
    delay: 1000,
    speed: 50,
  },
  noticeBar: {
    delay: 1000,
    speed: 50,
    scrollable: 'auto' as NoticeBarProps['scrollable'],
    visible: true,
  },
  notify: {
    type: 'primary' as NotifyProps['type'],
    position: 'top' as NotifyProps['position'],
    duration: 250,
    timeout: 3000,
  },
  notifyAgent: {
    id: 'notify',
  },
  overlay: {
    duration: 250,
  },
  pagination: {
    total: 0,
    pageSize: 10,
    current: 1,
    pageButtonCount: 5,
    type: 'multi' as PaginationProps['type'],
    multiCount: 5,
  },
  passwordInput: {
    length: 6,
    type: 'border' as PasswordInputProps['type'],
    validateEvent: true,
  },
  picker: {
    immediateChange: false,
  },
  pickerInput: {
    valueOnClear: undefined as PickerInputProps['valueOnClear'],
  },
  pickerPopout: {
    validateEvent: true,
  },
  popout: {
    type: 'loose' as PopoutProps['type'],
    showConfirm: true,
    showClose: true,
    showFooter: true,
    overlayClosable: true,
    duration: 250,
  },
  popover: {
    position: 'bottom' as PopoverProps['position'],
    direction: 'vertical' as PopoverProps['direction'],
    theme: 'light' as PopoverProps['theme'],
    refGap: 10,
    viewportGap: 10,
    transparent: true,
    duration: 150,
  },
  popup: {
    duration: 250,
    effect: 'fade' as PopupProps['effect'],
    overlay: true,
    closeOnClickOverlay: true,
  },
  progressBar: {
    percent: 0,
    showText: true,
  },
  progressCircle: {
    percent: 0,
    thickness: 4,
  },
  pullDownRefresh: {
    threshold: 50,
    headerHeight: 50,
    transitionDuration: 300,
    doneDuration: 0,
  },
  qrcode: {
    ecl: 'M' as QrcodeProps['ecl'],
    size: '320rpx',
    canvasSize: 400,
    type: 'canvas' as QrcodeProps['type'],
    text: '',
    color: '#000',
    bgColor: '#fff',
    quietZoneModules: 2,
  },
  radioGroup: {
    direction: 'vertical' as RadioGroupProps['direction'],
    validateEvent: true,
  },
  radioInput: {
    valueOnClear: undefined as RadioInputProps['valueOnClear'],
  },
  radioPopout: {
    validateEvent: true,
    type: 'circle' as RadioPopoutProps['type'],
  },
  rate: {
    count: 5,
    icon: 'star-fill',
    voidIcon: 'star',
    validateEvent: true,
  },
  readMore: {
    maxHeight: 200,
  },
  resizeSensor: {
    threshold: 150,
  },
  result: {
    status: 'info' as ResultProps['status'],
  },
  search: {
    shape: 'square' as SearchProps['shape'],
    focus: false,
  },
  shareSheet: {
    overlayClosable: true,
    duration: 250,
  },
  signature: {
    lineWidth: 3,
    fullScreen: false,
    color: '#000',
    duration: 150,
    type: 'png' as const,
    target: 'dataURL' as const,
    quality: 0.92,
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
  space: {
    direction: 'horizontal' as SpaceProps['direction'],
    size: 'middle' as SpaceProps['size'],
  },
  statusBar: {
    height: '',
  },
  stepper: {
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    step: 1,
    inputType: 'number' as StepperProps['inputType'],
    press: true,
    pressTime: 350,
    interval: 150,
    validateEvent: true,
    size: 'medium' as StepperProps['size'],
  },
  steps: {
    current: 0,
    center: false,
    itemList: () => [],
    direction: 'horizontal' as StepsProps['direction'],
    finishIcon: 'check-circle-fill',
    processIcon: 'circle',
    waitIcon: 'circle',
    errorIcon: 'x-circle',
  },
  swiperDot: {
    type: 'dot' as SwiperDotProps['type'],
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
  table: {
    bordered: false,
    underline: false,
  },
  tabs: {
    type: 'line' as TabsProps['type'],
  },
  tag: {
    theme: 'default' as TagProps['theme'],
    size: 'medium' as TagProps['size'],
  },
  toast: {
    type: 'text' as ToastProps['type'],
    position: 'center' as ToastProps['position'],
    overlay: false,
    timeout: 1500,
    duration: 200,
  },
  toastAgent: {
    id: 'toast',
  },
  tree: {
    defaultExpandAll: false,
    filterMode: 'lenient' as TreeProps['filterMode'],
    accordion: false,
  },
  upload: {
    accept: 'image' as UploadProps['accept'],
    sourceType: () => ['album', 'camera'] as UploadProps['sourceType'],
    sizeType: () => ['original', 'compressed'] as UploadProps['sizeType'],
    maxDuration: 60,
    maxCount: Number.MAX_SAFE_INTEGER,
    maxSize: Number.MAX_SAFE_INTEGER,
    removable: true,
    validateEvent: true,
  },
  uploadPreview: {
    status: 'pending' as UploadPreviewProps['status'],
  },
  waterfall: {
    columns: 2,
    columnGap: 16,
    rowGap: 16,
  },
}
// #enddefaultConfig

export type ConfigOptions = typeof defaultConfig

function extendProps(source: object, target: object) {
  Object.keys(target).forEach((key) => {
    if (key in source) {
      const sourceValue = source[key as keyof typeof source]
      const targetValue = target[key as keyof typeof target]
      if (targetValue !== undefined && targetValue !== null) {
        if (typeof sourceValue !== 'object') {
          source[key as keyof typeof source] = targetValue
        } else if (typeof targetValue === 'object') {
          extendProps(sourceValue, targetValue)
        }
      }
    }
  })
}

export function setConfig(...optionsArgs: DeepPartial<ConfigOptions>[]) {
  optionsArgs.forEach((options) => {
    extendProps(defaultConfig, options)
  })
}

export function getDurationConfig(duration: number) {
  return {
    actionSheet: {
      duration,
    },
    dialog: {
      duration,
    },
    dropdown: {
      duration,
    },
    fab: {
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
