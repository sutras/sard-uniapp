import '@vue/runtime-core'

import SarAccordion from './components/accordion/accordion.vue'
import SarAccordionItem from './components/accordion-item/accordion-item.vue'
import SarActionSheet from './components/action-sheet/action-sheet.vue'
import SarAvatar from './components/avatar/avatar.vue'
import SarBadge from './components/badge/badge.vue'
import SarButton from './components/button/button.vue'
import SarCalendar from './components/calendar/calendar.vue'
import SarCalendarInput from './components/calendar-input/calendar-input.vue'
import SarCard from './components/card/card.vue'
import SarCascader from './components/cascader/cascader.vue'
import SarCascaderInput from './components/cascader-input/cascader-input.vue'
import SarCheckbox from './components/checkbox/checkbox.vue'
import SarCheckboxGroup from './components/checkbox-group/checkbox-group.vue'
import SarCol from './components/col/col.vue'
import SarCollapse from './components/collapse/collapse.vue'
import SarCountDown from './components/count-down/count-down.vue'
import SarDatetimePicker from './components/datetime-picker/datetime-picker.vue'
import SarDatetimePickerInput from './components/datetime-picker-input/datetime-picker-input.vue'
import SarDialog from './components/dialog/dialog.vue'
import SarDialogAgent from './components/dialog-agent/dialog-agent.vue'
import SarDropdown from './components/dropdown/dropdown.vue'
import SarDropdownItem from './components/dropdown-item/dropdown-item.vue'
import SarEmpty from './components/empty/empty.vue'
import SarForm from './components/form/form.vue'
import SarFormItem from './components/form-item/form-item.vue'
import SarGrid from './components/grid/grid.vue'
import SarGridItem from './components/grid-item/grid-item.vue'
import SarIcon from './components/icon/icon.vue'
import SarIndexes from './components/indexes/indexes.vue'
import SarIndexesAnchor from './components/indexes-anchor/indexes-anchor.vue'
import SarInput from './components/input/input.vue'
import SarKeyboard from './components/keyboard/keyboard.vue'
import SarList from './components/list/list.vue'
import SarListItem from './components/list-item/list-item.vue'
import SarLoading from './components/loading/loading.vue'
import SarLoadMore from './components/load-more/load-more.vue'
import SarMenu from './components/menu/menu.vue'
import SarNavbar from './components/navbar/navbar.vue'
import SarNavbarItem from './components/navbar-item/navbar-item.vue'
import SarNoticeBar from './components/notice-bar/notice-bar.vue'
import SarNotify from './components/notify/notify.vue'
import SarNotifyAgent from './components/notify-agent/notify-agent.vue'
import SarOverlay from './components/overlay/overlay.vue'
import SarPagination from './components/pagination/pagination.vue'
import SarPasswordInput from './components/password-input/password-input.vue'
import SarPicker from './components/picker/picker.vue'
import SarPickerInput from './components/picker-input/picker-input.vue'
import SarPopout from './components/popout/popout.vue'
import SarPopoutInput from './components/popout-input/popout-input.vue'
import SarPopover from './components/popover/popover.vue'
import SarPopoverReference from './components/popover-reference/popover-reference.vue'
import SarPopup from './components/popup/popup.vue'
import SarProgressBar from './components/progress-bar/progress-bar.vue'
import SarProgressCircle from './components/progress-circle/progress-circle.vue'
import SarPullDownRefresh from './components/pull-down-refresh/pull-down-refresh.vue'
import SarRadio from './components/radio/radio.vue'
import SarRadioGroup from './components/radio-group/radio-group.vue'
import SarRate from './components/rate/rate.vue'
import SarResult from './components/result/result.vue'
import SarRow from './components/row/row.vue'
import SarSearch from './components/search/search.vue'
import SarShareSheet from './components/share-sheet/share-sheet.vue'
import SarSkeleton from './components/skeleton/skeleton.vue'
import SarSkeletonAvatar from './components/skeleton-avatar/skeleton-avatar.vue'
import SarSkeletonBlock from './components/skeleton-block/skeleton-block.vue'
import SarSkeletonParagraph from './components/skeleton-paragraph/skeleton-paragraph.vue'
import SarSkeletonTitle from './components/skeleton-title/skeleton-title.vue'
import SarSlider from './components/slider/slider.vue'
import SarStepper from './components/stepper/stepper.vue'
import SarSteps from './components/steps/steps.vue'
import SarSwiperDot from './components/swiper-dot/swiper-dot.vue'
import SarSwitch from './components/switch/switch.vue'
import SarTab from './components/tab/tab.vue'
import SarTabbar from './components/tabbar/tabbar.vue'
import SarTabbarItem from './components/tabbar-item/tabbar-item.vue'
import SarTabs from './components/tabs/tabs.vue'
import SarTag from './components/tag/tag.vue'
import SarToast from './components/toast/toast.vue'
import SarToastAgent from './components/toast-agent/toast-agent.vue'
import SarUpload from './components/upload/upload.vue'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    SarAccordion: typeof SarAccordion
    SarActionSheet: typeof SarActionSheet
    SarAccordionItem: typeof SarAccordionItem
    SarAvatar: typeof SarAvatar
    SarBadge: typeof SarBadge
    SarButton: typeof SarButton
    SarCalendar: typeof SarCalendar
    SarCalendarInput: typeof SarCalendarInput
    SarCard: typeof SarCard
    SarCascader: typeof SarCascader
    SarCascaderInput: typeof SarCascaderInput
    SarCheckbox: typeof SarCheckbox
    SarCheckboxGroup: typeof SarCheckboxGroup
    SarCol: typeof SarCol
    SarCollapse: typeof SarCollapse
    SarCountDown: typeof SarCountDown
    SarDatetimePicker: typeof SarDatetimePicker
    SarDatetimePickerInput: typeof SarDatetimePickerInput
    SarDialog: typeof SarDialog
    SarDialogAgent: typeof SarDialogAgent
    SarDropdown: typeof SarDropdown
    SarDropdownItem: typeof SarDropdownItem
    SarEmpty: typeof SarEmpty
    SarForm: typeof SarForm
    SarFormItem: typeof SarFormItem
    SarGrid: typeof SarGrid
    SarGridItem: typeof SarGridItem
    SarIcon: typeof SarIcon
    SarIndexes: typeof SarIndexes
    SarIndexesAnchor: typeof SarIndexesAnchor
    SarInput: typeof SarInput
    SarKeyboard: typeof SarKeyboard
    SarList: typeof SarList
    SarListItem: typeof SarListItem
    SarLoading: typeof SarLoading
    SarLoadMore: typeof SarLoadMore
    SarMenu: typeof SarMenu
    SarNavbar: typeof SarNavbar
    SarNavbarItem: typeof SarNavbarItem
    SarNoticeBar: typeof SarNoticeBar
    SarNotify: typeof SarNotify
    SarNotifyAgent: typeof SarNotifyAgent
    SarOverlay: typeof SarOverlay
    SarPagination: typeof SarPagination
    SarPasswordInput: typeof SarPasswordInput
    SarPicker: typeof SarPicker
    SarPickerInput: typeof SarPickerInput
    SarPopout: typeof SarPopout
    SarPopoutInput: typeof SarPopoutInput
    SarPopover: typeof SarPopover
    SarPopoverReference: typeof SarPopoverReference
    SarPopup: typeof SarPopup
    SarProgressBar: typeof SarProgressBar
    SarProgressCircle: typeof SarProgressCircle
    SarPullDownRefresh: typeof SarPullDownRefresh
    SarRadio: typeof SarRadio
    SarRadioGroup: typeof SarRadioGroup
    SarRate: typeof SarRate
    SarResult: typeof SarResult
    SarRow: typeof SarRow
    SarSearch: typeof SarSearch
    SarShareSheet: typeof SarShareSheet
    SarSkeleton: typeof SarSkeleton
    SarSkeletonAvatar: typeof SarSkeletonAvatar
    SarSkeletonBlock: typeof SarSkeletonBlock
    SarSkeletonParagraph: typeof SarSkeletonParagraph
    SarSkeletonTitle: typeof SarSkeletonTitle
    SarSlider: typeof SarSlider
    SarStepper: typeof SarStepper
    SarSteps: typeof SarSteps
    SarSwiperDot: typeof SarSwiperDot
    SarSwitch: typeof SarSwitch
    SarTab: typeof SarTab
    SarTabbar: typeof SarTabbar
    SarTabbarItem: typeof SarTabbarItem
    SarTabs: typeof SarTabs
    SarTag: typeof SarTag
    SarToast: typeof SarToast
    SarToastAgent: typeof SarToastAgent
    SarUpload: typeof SarUpload
  }
}
