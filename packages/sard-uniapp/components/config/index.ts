import { type AccordionProps } from '../accordion'
import { type ActionSheetProps } from '../action-sheet'
import { type ActionSheetAgentProps } from '../action-sheet-agent'
import { type AlertProps } from '../alert'
import { type AvatarGroupProps } from '../avatar-group'
import { type AvatarProps } from '../avatar'
import { type BackTopProps } from '../back-top'
import { type BadgeProps } from '../badge'
import { type ButtonProps } from '../button'
import { type CalendarInputProps } from '../calendar-input'
import { type CalendarPopoutProps } from '../calendar-popout'
import { type CalendarProps } from '../calendar'
import { type CardProps } from '../card'
import { type CascaderProps } from '../cascader'
import { type CascaderInputProps } from '../cascader-input'
import { type CascaderPopoutProps } from '../cascader-popout'
import { type CheckboxInputProps } from '../checkbox-input'
import { type CheckboxPopoutProps } from '../checkbox-popout'
import { type CheckboxProps, type CheckboxGroupProps } from '../checkbox'
import { type CompactProps } from '../compact'
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
import { type PuzzleVerifyProps } from '../puzzle-verify'
import { type QrcodeProps } from '../qrcode'
import { type RadioGroupProps } from '../radio'
import { type RadioInputProps } from '../radio-input'
import { type RadioPopoutProps } from '../radio-popout'
import { type RateProps } from '../rate'
import { type ReadMoreProps } from '../read-more'
import { type ResizeSensorProps } from '../resize-sensor'
import { type ResultProps } from '../result'
import { type RotateVerifyProps } from '../rotate-verify'
import { type SearchProps } from '../search'
import { type SegmentedProps } from '../segmented'
import { type SelectProps } from '../select'
import { type SelectInputProps } from '../select-input'
import { type SelectPopoutProps } from '../select-popout'
import { type ShareSheetProps } from '../share-sheet'
import { type SignatureProps } from '../signature'
import { type SkeletonProps } from '../skeleton'
import { type SliderProps } from '../slider'
import { type SlideVerifyProps } from '../slide-verify'
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
import { extend } from '../../utils'

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

export type DefaultProps<T> = InferDefaults<LooseRequired<T>>

export interface ConfigOptions {
  initialZIndex?: number
  valueOnClear?: () => any
  accordion?: InferDefaults<LooseRequired<AccordionProps>>
  actionSheet?: InferDefaults<LooseRequired<ActionSheetProps>>
  actionSheetAgent?: InferDefaults<LooseRequired<ActionSheetAgentProps>>
  alert?: InferDefaults<LooseRequired<AlertProps>>
  avatar?: InferDefaults<LooseRequired<AvatarProps>>
  avatarGroup?: InferDefaults<LooseRequired<AvatarGroupProps>>
  backTop?: InferDefaults<LooseRequired<BackTopProps>>
  badge?: InferDefaults<LooseRequired<BadgeProps>>
  button?: InferDefaults<LooseRequired<ButtonProps>>
  calendar?: InferDefaults<LooseRequired<CalendarProps>>
  calendarInput?: InferDefaults<LooseRequired<CalendarInputProps>>
  calendarPopout?: InferDefaults<LooseRequired<CalendarPopoutProps>>
  card?: InferDefaults<LooseRequired<CardProps>>
  cascaderPopout?: InferDefaults<LooseRequired<CascaderPopoutProps>>
  cascader?: InferDefaults<LooseRequired<CascaderProps>>
  cascaderInput?: InferDefaults<LooseRequired<CascaderInputProps>>
  checkbox?: InferDefaults<LooseRequired<CheckboxProps>>
  checkboxGroup?: InferDefaults<LooseRequired<CheckboxGroupProps>>
  checkboxInput?: InferDefaults<LooseRequired<CheckboxInputProps>>
  checkboxPopout?: InferDefaults<LooseRequired<CheckboxPopoutProps>>
  compact?: InferDefaults<LooseRequired<CompactProps>>
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
  popover?: InferDefaults<LooseRequired<PopoverProps<any>>>
  popup?: InferDefaults<LooseRequired<PopupProps>>
  progressBar?: InferDefaults<LooseRequired<ProgressBarProps>>
  progressCircle?: InferDefaults<LooseRequired<ProgressCircleProps>>
  pullDownRefresh?: InferDefaults<LooseRequired<PullDownRefreshProps>>
  puzzleVerify?: InferDefaults<LooseRequired<PuzzleVerifyProps>>
  qrcode?: InferDefaults<LooseRequired<QrcodeProps>>
  radioGroup?: InferDefaults<LooseRequired<RadioGroupProps>>
  radioInput?: InferDefaults<LooseRequired<RadioInputProps>>
  radioPopout?: InferDefaults<LooseRequired<RadioPopoutProps>>
  rate?: InferDefaults<LooseRequired<RateProps>>
  readMore?: InferDefaults<LooseRequired<ReadMoreProps>>
  resizeSensor?: InferDefaults<LooseRequired<ResizeSensorProps>>
  result?: InferDefaults<LooseRequired<ResultProps>>
  rotateVerify?: InferDefaults<LooseRequired<RotateVerifyProps>>
  search?: InferDefaults<LooseRequired<SearchProps>>
  segmented?: InferDefaults<LooseRequired<SegmentedProps>>
  select?: InferDefaults<LooseRequired<SelectProps>>
  selectInput?: InferDefaults<LooseRequired<SelectInputProps>>
  selectPopout?: InferDefaults<LooseRequired<SelectPopoutProps>>
  shareSheet?: InferDefaults<LooseRequired<ShareSheetProps>>
  signature?: InferDefaults<LooseRequired<SignatureProps>>
  skeleton?: InferDefaults<LooseRequired<SkeletonProps>>
  slider?: InferDefaults<LooseRequired<SliderProps>>
  slideVerify?: InferDefaults<LooseRequired<SlideVerifyProps>>
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

// #region defaultConfig
export const defaultConfig: ConfigOptions = {
  // 全局初始 zIndex
  // initialZIndex: 1000,
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
  // valueOnClear: undefined,
}
// #endregion defaultConfig
export function setConfig(...optionsArgs: ConfigOptions[]) {
  extend(defaultConfig, ...optionsArgs)
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
