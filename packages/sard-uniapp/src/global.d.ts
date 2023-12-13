import '@vue/runtime-core'

import SarAccordion from './accordion/accordion.vue'
import SarActionSheet from './action-sheet/action-sheet.vue'
import SarAccordionItem from './accordion-item/accordion-item.vue'
import SarAvatar from './avatar/avatar.vue'
import SarBadge from './badge/badge.vue'
import SarButton from './button/button.vue'
import SarCalendar from './calendar/calendar.vue'
import SarCalendarInput from './calendar-input/calendar-input.vue'
import SarCard from './card/card.vue'
import SarCascader from './cascader/cascader.vue'
import SarCascaderInput from './cascader-input/cascader-input.vue'
import SarCheckbox from './checkbox/checkbox.vue'
import SarCheckboxGroup from './checkbox-group/checkbox-group.vue'
import SarCol from './col/col.vue'
import SarCollapse from './collapse/collapse.vue'
import SarCountDown from './count-down/count-down.vue'
import SarDatetimePicker from './datetime-picker/datetime-picker.vue'
import SarDatetimePickerInput from './datetime-picker-input/datetime-picker-input.vue'
import SarDialog from './dialog/dialog.vue'
import SarDialogAgent from './dialog-agent/dialog-agent.vue'
import SarDropdown from './dropdown/dropdown.vue'
import SarDropdownItem from './dropdown-item/dropdown-item.vue'
import SarEmpty from './empty/empty.vue'
import SarForm from './form/form.vue'
import SarFormItem from './form-item/form-item.vue'
import SarGrid from './grid/grid.vue'
import SarGridItem from './grid-item/grid-item.vue'
import SarIcon from './icon/icon.vue'
import SarIndexes from './indexes/indexes.vue'
import SarIndexesAnchor from './indexes-anchor/indexes-anchor.vue'
import SarInput from './input/input.vue'
import SarKeyboard from './keyboard/keyboard.vue'
import SarList from './list/list.vue'
import SarListItem from './list-item/list-item.vue'
import SarLoading from './loading/loading.vue'
import SarMenu from './menu/menu.vue'
import SarNavbar from './navbar/navbar.vue'
import SarNoticeBar from './notice-bar/notice-bar.vue'
import SarNotify from './notify/notify.vue'
import SarNotifyAgent from './notify-agent/notify-agent.vue'
import SarOverlay from './overlay/overlay.vue'
import SarPagination from './pagination/pagination.vue'
import SarPasswordInput from './password-input/password-input.vue'
import SarPicker from './picker/picker.vue'
import SarPickerInput from './picker-input/picker-input.vue'
import SarPopout from './popout/popout.vue'
import SarPopoutInput from './popout-input/popout-input.vue'
import SarPopover from './popover/popover.vue'
import SarPopoverReference from './popover-reference/popover-reference.vue'
import SarPopup from './popup/popup.vue'
import SarProgressBar from './progress-bar/progress-bar.vue'
import SarProgressCircle from './progress-circle/progress-circle.vue'
import SarRadio from './radio/radio.vue'
import SarRadioGroup from './radio-group/radio-group.vue'
import SarRate from './rate/rate.vue'
import SarResult from './result/result.vue'
import SarRow from './row/row.vue'
import SarSearch from './search/search.vue'
import SarShareSheet from './share-sheet/share-sheet.vue'
import SarSkeleton from './skeleton/skeleton.vue'
import SarSkeletonAvatar from './skeleton-avatar/skeleton-avatar.vue'
import SarSkeletonBlock from './skeleton-block/skeleton-block.vue'
import SarSkeletonParagraph from './skeleton-paragraph/skeleton-paragraph.vue'
import SarSkeletonTitle from './skeleton-title/skeleton-title.vue'
import SarSlider from './slider/slider.vue'
import SarStepper from './stepper/stepper.vue'
import SarSteps from './steps/steps.vue'
import SarSwiperDot from './swiper-dot/swiper-dot.vue'
import SarSwitch from './switch/switch.vue'
import SarTab from './tab/tab.vue'
import SarTabs from './tabs/tabs.vue'
import SarTabbar from './tabbar/tabbar.vue'
import SarTabbarItem from './tabbar-item/tabbar-item.vue'
import SarToast from './toast/toast.vue'
import SarToastAgent from './toast-agent/toast-agent.vue'
import SarUpload from './upload/upload.vue'

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
    SarMenu: typeof SarMenu
    SarNavbar: typeof SarNavbar
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
    SarTabs: typeof SarTabs
    SarTabbar: typeof SarTabbar
    SarTabbarItem: typeof SarTabbarItem
    SarToast: typeof SarToast
    SarToastAgent: typeof SarToastAgent
    SarUpload: typeof SarUpload
  }
}
