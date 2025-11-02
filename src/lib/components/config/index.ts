import { type ActionSheetProps } from '../action-sheet'
import { type AlertProps } from '../alert'
import { type AvatarGroupProps } from '../avatar-group'
import { type AvatarProps } from '../avatar'
import { type BackTopProps } from '../back-top'
import { type BadgeProps } from '../badge'
import { type ButtonProps } from '../button'
import { type CalendarInputProps } from '../calendar-input'
import { type CalendarPopoutProps } from '../calendar-popout'
import { type CalendarProps } from '../calendar'
import { type CascaderInputProps } from '../cascader-input'
import { type CascaderPopoutProps } from '../cascader-popout'
import { type CheckboxInputProps } from '../checkbox-input'
import { type CheckboxPopoutProps } from '../checkbox-popout'
import { type CheckboxProps, type CheckboxGroupProps } from '../checkbox'
import { type CoolIconProps } from '../cool-icon'
import { type CountDownProps } from '../count-down'
import { type CountToProps } from '../count-to'
import { type CropImageAgentProps } from '../crop-image-agent'
import { type CropImageProps } from '../crop-image'
import { type DatetimePickerInputProps } from '../datetime-picker-input'
import { type DatetimePickerPopoutProps } from '../datetime-picker-popout'
import { type DatetimePickerProps } from '../datetime-picker'
import { type DatetimeRangePickerInputProps } from '../datetime-range-picker-input'
import { type DatetimeRangePickerPopoutProps } from '../datetime-range-picker-popout'
import { type DatetimeRangePickerProps } from '../datetime-range-picker'
import { type DialogAgentProps } from '../dialog-agent'
import { type DialogProps } from '../dialog'
import { type DividerProps } from '../divider'
import { type DropdownProps } from '../dropdown'
import { type EmptyProps } from '../empty'
import { type FabProps } from '../fab'
import { type FloatingBubbleProps } from '../floating-bubble'
import { type FloatingPanelProps } from '../floating-panel'
import { type FormItemProps, type FormProps } from '../form'
import { type GridProps } from '../grid'
import { type IconProps } from '../icon'
import { type ImageProps } from '../image'
import { type IndexesProps } from '../indexes'
import { type InputProps } from '../input'
import { type KeyboardProps } from '../keyboard'
import { type ListItemProps } from '../list'
import { type LoadingProps } from '../loading'
import { type MarqueeProps } from '../marquee'
import { type NoticeBarProps } from '../notice-bar'
import { type NotifyAgentProps } from '../notify-agent'
import { type NotifyProps } from '../notify'
import { type OverlayProps } from '../overlay'
import { type PaginationProps } from '../pagination'
import { type PasswordInputProps } from '../password-input'
import { type PickerInputProps } from '../picker-input'
import { type PickerPopoutProps } from '../picker-popout'
import { type PickerProps } from '../picker'
import { type PopoutInputProps } from '../popout-input'
import { type PopoutProps } from '../popout'
import { type PopoverProps } from '../popover'
import { type PopupProps } from '../popup'
import { type ProgressBarProps } from '../progress-bar'
import { type ProgressCircleProps } from '../progress-circle'
import { type PullDownRefreshProps } from '../pull-down-refresh'
import { type QrcodeProps } from '../qrcode'
import { type RadioGroupProps } from '../radio'
import { type RadioInputProps } from '../radio-input'
import { type RadioPopoutProps } from '../radio-popout'
import { type RateProps } from '../rate'
import { type ReadMoreProps } from '../read-more'
import { type ResizeSensorProps } from '../resize-sensor'
import { type ResultProps } from '../result'
import { type SearchProps } from '../search'
import { type SegmentedProps } from '../segmented'
import { type ShareSheetProps } from '../share-sheet'
import { type SignatureProps } from '../signature'
import { type SkeletonProps } from '../skeleton'
import { type SliderProps } from '../slider'
import { type SpaceProps } from '../space'
import { type StatusBarProps } from '../status-bar'
import { type StepperProps } from '../stepper'
import { type StepsProps } from '../steps'
import { type SwiperDotProps } from '../swiper-dot'
import { type SwitchProps } from '../switch'
import { type TabbarProps } from '../tabbar'
import { type TableProps } from '../table'
import { type TabsProps } from '../tabs'
import { type TagProps } from '../tag'
import { type ToastAgentProps } from '../toast-agent'
import { type ToastProps } from '../toast'
import { type TreeProps } from '../tree'
import { type UploadPreviewProps, type UploadProps } from '../upload'
import { type WaterfallProps } from '../waterfall'
import { type WatermarkProps } from '../watermark'

type NativeType =
  | null
  | number
  | string
  | boolean
  | symbol
  | ((...args: any[]) => any)

type InferDefault<P, T> =
  | ((props: P) => T & {})
  | (T extends NativeType ? T : never)

type InferDefaults<T> = {
  [K in keyof T]?: InferDefault<T, T[K]>
}

type LooseRequired<T> = {
  [P in keyof (T & Required<T>)]: T[P]
}

export interface ConfigOptions {
  initialZIndex?: number
  valueOnClear?: () => any
  actionSheet?: InferDefaults<LooseRequired<ActionSheetProps>>
  alert?: InferDefaults<LooseRequired<AlertProps>>
  avatar?: InferDefaults<LooseRequired<AvatarProps>>
  avatarGroup?: InferDefaults<LooseRequired<AvatarGroupProps>>
  backTop?: InferDefaults<LooseRequired<BackTopProps>>
  badge?: InferDefaults<LooseRequired<BadgeProps>>
  button?: InferDefaults<LooseRequired<ButtonProps>>
  calendar?: InferDefaults<LooseRequired<CalendarProps>>
  calendarInput?: InferDefaults<LooseRequired<CalendarInputProps>>
  calendarPopout?: InferDefaults<LooseRequired<CalendarPopoutProps>>
  cascaderPopout?: InferDefaults<LooseRequired<CascaderPopoutProps>>
  cascaderInput?: InferDefaults<LooseRequired<CascaderInputProps>>
  checkbox?: InferDefaults<LooseRequired<CheckboxProps>>
  checkboxGroup?: InferDefaults<LooseRequired<CheckboxGroupProps>>
  checkboxInput?: InferDefaults<LooseRequired<CheckboxInputProps>>
  checkboxPopout?: InferDefaults<LooseRequired<CheckboxPopoutProps>>
  coolIcon?: InferDefaults<LooseRequired<CoolIconProps>>
  countDown?: InferDefaults<LooseRequired<CountDownProps>>
  countTo?: InferDefaults<LooseRequired<CountToProps>>
  cropImage?: InferDefaults<LooseRequired<CropImageProps>>
  cropImageAgent?: InferDefaults<LooseRequired<CropImageAgentProps>>
  datetimePicker?: InferDefaults<LooseRequired<DatetimePickerProps>>
  datetimePickerInput?: InferDefaults<LooseRequired<DatetimePickerInputProps>>
  datetimePickerPopout?: InferDefaults<LooseRequired<DatetimePickerPopoutProps>>
  datetimeRangePicker?: InferDefaults<LooseRequired<DatetimeRangePickerProps>>
  datetimeRangePickerInput?: InferDefaults<
    LooseRequired<DatetimeRangePickerInputProps>
  >
  datetimeRangePickerPopout?: InferDefaults<
    LooseRequired<DatetimeRangePickerPopoutProps>
  >
  dialog?: InferDefaults<LooseRequired<DialogProps>>
  dialogAgent?: InferDefaults<LooseRequired<DialogAgentProps>>
  divider?: InferDefaults<LooseRequired<DividerProps>>
  dropdown?: InferDefaults<LooseRequired<DropdownProps>>
  empty?: InferDefaults<LooseRequired<EmptyProps>>
  fab?: InferDefaults<LooseRequired<FabProps>>
  floatingBubble?: InferDefaults<LooseRequired<FloatingBubbleProps>>
  floatingPanel?: InferDefaults<LooseRequired<FloatingPanelProps>>
  form?: InferDefaults<LooseRequired<FormProps>>
  formItem?: InferDefaults<LooseRequired<FormItemProps>>
  grid?: InferDefaults<LooseRequired<GridProps>>
  icon?: InferDefaults<LooseRequired<IconProps>>
  image?: InferDefaults<LooseRequired<ImageProps>>
  indexes?: InferDefaults<LooseRequired<IndexesProps>>
  input?: InferDefaults<LooseRequired<InputProps>>
  keyboard?: InferDefaults<LooseRequired<KeyboardProps>>
  listItem?: InferDefaults<LooseRequired<ListItemProps>>
  loading?: InferDefaults<LooseRequired<LoadingProps>>
  marquee?: InferDefaults<LooseRequired<MarqueeProps>>
  noticeBar?: InferDefaults<LooseRequired<NoticeBarProps>>
  notify?: InferDefaults<LooseRequired<NotifyProps>>
  notifyAgent?: InferDefaults<LooseRequired<NotifyAgentProps>>
  overlay?: InferDefaults<LooseRequired<OverlayProps>>
  pagination?: InferDefaults<LooseRequired<PaginationProps>>
  passwordInput?: InferDefaults<LooseRequired<PasswordInputProps>>
  picker?: InferDefaults<LooseRequired<PickerProps>>
  pickerInput?: InferDefaults<LooseRequired<PickerInputProps>>
  pickerPopout?: InferDefaults<LooseRequired<PickerPopoutProps>>
  popout?: InferDefaults<LooseRequired<PopoutProps>>
  popoutInput?: InferDefaults<LooseRequired<PopoutInputProps>>
  popover?: InferDefaults<LooseRequired<PopoverProps>>
  popup?: InferDefaults<LooseRequired<PopupProps>>
  progressBar?: InferDefaults<LooseRequired<ProgressBarProps>>
  progressCircle?: InferDefaults<LooseRequired<ProgressCircleProps>>
  pullDownRefresh?: InferDefaults<LooseRequired<PullDownRefreshProps>>
  qrcode?: InferDefaults<LooseRequired<QrcodeProps>>
  radioGroup?: InferDefaults<LooseRequired<RadioGroupProps>>
  radioInput?: InferDefaults<LooseRequired<RadioInputProps>>
  radioPopout?: InferDefaults<LooseRequired<RadioPopoutProps>>
  rate?: InferDefaults<LooseRequired<RateProps>>
  readMore?: InferDefaults<LooseRequired<ReadMoreProps>>
  resizeSensor?: InferDefaults<LooseRequired<ResizeSensorProps>>
  result?: InferDefaults<LooseRequired<ResultProps>>
  search?: InferDefaults<LooseRequired<SearchProps>>
  segmented?: InferDefaults<LooseRequired<SegmentedProps>>
  shareSheet?: InferDefaults<LooseRequired<ShareSheetProps>>
  signature?: InferDefaults<LooseRequired<SignatureProps>>
  skeleton?: InferDefaults<LooseRequired<SkeletonProps>>
  slider?: InferDefaults<LooseRequired<SliderProps>>
  space?: InferDefaults<LooseRequired<SpaceProps>>
  statusBar?: InferDefaults<LooseRequired<StatusBarProps>>
  stepper?: InferDefaults<LooseRequired<StepperProps>>
  steps?: InferDefaults<LooseRequired<StepsProps>>
  swiperDot?: InferDefaults<LooseRequired<SwiperDotProps>>
  switch?: InferDefaults<LooseRequired<SwitchProps>>
  tabbar?: InferDefaults<LooseRequired<TabbarProps>>
  table?: InferDefaults<LooseRequired<TableProps>>
  tabs?: InferDefaults<LooseRequired<TabsProps>>
  tag?: InferDefaults<LooseRequired<TagProps>>
  toast?: InferDefaults<LooseRequired<ToastProps>>
  toastAgent?: InferDefaults<LooseRequired<ToastAgentProps>>
  tree?: InferDefaults<LooseRequired<TreeProps>>
  upload?: InferDefaults<LooseRequired<UploadProps>>
  uploadPreview?: InferDefaults<LooseRequired<UploadPreviewProps>>
  waterfall?: InferDefaults<LooseRequired<WaterfallProps>>
  watermark?: InferDefaults<LooseRequired<WatermarkProps>>
}

export type RequiredConfigOptions = Omit<
  Required<ConfigOptions>,
  'valueOnClear'
> & {
  valueOnClear: ConfigOptions['valueOnClear']
}

// #defaultConfig
export const defaultConfig: RequiredConfigOptions = {
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
  valueOnClear: undefined,

  actionSheet: {
    overlayClosable: true,
    duration: 250,
  },
  alert: {
    type: 'primary',
  },
  avatar: {
    shape: 'circle',
  },
  avatarGroup: {
    coverage: 0.5,
    showRemain: true,
  },
  backTop: {
    visibleHeight: 200,
  },
  badge: {
    value: 0,
    max: 99,
  },
  button: {
    type: 'default',
    theme: 'primary',
    size: 'medium',
    hoverStopPropagation: false,
    lang: 'en',
    showMessageCard: false,
    block: true,
  },
  calendar: {
    type: 'single',
    maxDays: Number.MAX_SAFE_INTEGER,
    weekStartsOn: 0,
  },
  calendarInput: {
    outletFormat: 'YYYY-MM-DD',
  },
  calendarPopout: {
    showConfirm: true,
    validateEvent: true,
  },
  cascaderPopout: {
    showConfirm: true,
    validateEvent: true,
  },
  cascaderInput: {},
  checkbox: {
    validateEvent: true,
  },
  checkboxGroup: {
    direction: 'vertical',
    validateEvent: true,
  },
  checkboxInput: {},
  checkboxPopout: {
    validateEvent: true,
    iconPosition: 'left',
  },
  coolIcon: {
    shape: 'oval',
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
    type: 'png',
    quality: 0.92,
  },
  cropImageAgent: {
    id: 'cropImage',
  },
  datetimePicker: {
    type: 'yMd',
    calendar: 'solar',
  },
  datetimePickerInput: {},
  datetimePickerPopout: {
    validateEvent: true,
  },
  datetimeRangePicker: {
    type: 'yMd',
  },
  datetimeRangePickerInput: {},
  datetimeRangePickerPopout: {
    validateEvent: true,
  },
  dialog: {
    headed: true,
    buttonType: 'round',
    showCancel: true,
    showConfirm: true,
    overlayClosable: true,
    duration: 200,
  },
  dialogAgent: {
    id: 'dialog',
  },
  divider: {
    type: 'solid',
    hairline: true,
    position: 'center',
  },
  dropdown: {
    direction: 'down',
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
    draggable: false,
    axis: 'y',
    gapX: 24,
    gapY: 24,
  },
  floatingBubble: {
    draggable: true,
    axis: 'y',
    gapX: 24,
    gapY: 24,
  },
  floatingPanel: {
    duration: 300,
    contentDraggable: true,
    safeAreaInsetBottom: true,
  },
  form: {
    validateTrigger: 'change',
    validateOnRuleChange: true,
    direction: 'horizontal',
    labelAlign: 'start',
    labelValign: 'center',
    starPosition: 'left',
    contentPosition: 'left',
    showError: true,
    scrollDuration: 150,
  },
  formItem: {
    showError: true,
  },
  grid: {
    columns: 4,
    direction: 'vertical',
  },
  icon: {
    name: '',
    family: 'sari',
    separate: false,
  },
  image: {
    mode: 'aspectFill',
    shape: 'square',
    fade: true,
    loadingIcon: 'image',
    errorIcon: 'image-error',
    showMenuByLongpress: true,
    showLoading: true,
    showError: true,
  },
  indexes: {
    hintDuration: 300,
  },
  input: {
    enableNative: false,
    maxlength: 140,
    adjustPosition: true,
    ignoreCompositionEvent: true,
    showConfirmBar: true,
    disableDefaultPadding: true,
    modelValue: '',
    validateEvent: true,
    cursorSpacing: 30,
    cursor: -1,
    selectionStart: -1,
    selectionEnd: -1,
    inputmode: 'text',
  },
  keyboard: {
    type: 'number',
    mode: 'chinese',
  },
  listItem: {
    arrowDirection: 'right',
  },
  loading: {
    type: 'circular',
  },
  marquee: {
    direction: 'vertical',
    delay: 1000,
    speed: 50,
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
  pickerInput: {},
  pickerPopout: {
    validateEvent: true,
  },
  popout: {
    type: 'loose',
    showConfirm: true,
    showClose: true,
    showFooter: true,
    overlayClosable: true,
    duration: 250,
  },
  popoutInput: {
    arrow: 'caret-right',
    arrowFamily: 'sari',
  },
  popover: {
    position: 'bottom',
    direction: 'vertical',
    theme: 'light',
    refGap: 10,
    viewportGap: 10,
    transparent: true,
    duration: 150,
  },
  popup: {
    duration: 250,
    effect: 'fade',
    overlay: true,
    overlayClosable: true,
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
    ecl: 'M',
    size: '320rpx',
    canvasSize: 400,
    type: 'canvas',
    text: '',
    color: '#000',
    bgColor: '#fff',
    quietZoneModules: 2,
  },
  radioGroup: {
    direction: 'vertical',
    validateEvent: true,
  },
  radioInput: {},
  radioPopout: {
    validateEvent: true,
    type: 'circle',
    iconPosition: 'left',
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
    status: 'info',
  },
  search: {
    shape: 'square',
    focus: false,
  },
  segmented: {
    size: 'middle',
    shape: 'square',
    direction: 'horizontal',
    validateEvent: true,
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
    type: 'png',
    target: 'dataURL',
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
    direction: 'horizontal',
    size: 'middle',
  },
  statusBar: {},
  stepper: {
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    step: 1,
    inputType: 'number',
    press: true,
    pressTime: 350,
    interval: 150,
    validateEvent: true,
    size: 'medium',
  },
  steps: {
    current: 0,
    center: false,
    itemList: () => [],
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
  table: {
    bordered: false,
    underline: false,
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
    transparent: false,
    timeout: 1500,
    duration: 200,
  },
  toastAgent: {
    id: 'toast',
  },
  tree: {
    defaultExpandAll: false,
    filterMode: 'lenient',
    accordion: false,
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
  waterfall: {
    columns: 2,
    columnGap: 16,
    rowGap: 16,
  },
  watermark: {
    width: 120,
    height: 64,
    rotate: -22,
    zIndex: 9,
    gap: () => [30, 30],
  },
}
// #enddefaultConfig

function extendProps(source: object, target: object) {
  Object.keys(target).forEach((key) => {
    const sourceValue = source[key as keyof typeof source]
    const targetValue = target[key as keyof typeof target]
    if (targetValue !== undefined && targetValue !== null) {
      if (typeof sourceValue !== 'object') {
        source[key as keyof typeof source] = targetValue
      } else if (typeof targetValue === 'object') {
        extendProps(sourceValue, targetValue)
      }
    }
  })
}

export function setConfig(...optionsArgs: ConfigOptions[]) {
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
