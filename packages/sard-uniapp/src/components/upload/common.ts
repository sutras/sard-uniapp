import { type PropType, type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export type UploadStatus = 'pending' | 'uploading' | 'failed' | 'done'

export interface UploadFile {
  type: 'image' | 'video'
  size: number
  path: string
  duration: number
  width: number
  height: number
}

export interface UploadFileItem {
  file?: UploadFile
  url?: string
  isImage?: boolean
  isVideo?: boolean
  status?: UploadStatus
  name?: string
  message?: string
}

export interface UploadProps {
  rootStyle?: StyleValue
  rootClass?: string

  accept?: 'image' | 'video'
  multiple?: boolean
  sourceType?: ('album' | 'camera')[]
  sizeType?: ('original' | 'compressed')[]
  maxDuration?: number
  camera?: 'back' | 'front'
  modelValue?: UploadFileItem[]
  maxCount?: number
  maxSize?: number | ((file: UploadFile) => boolean)
  overSize?: (fileItem: UploadFileItem[]) => void
  disabled?: boolean
  readonly?: boolean
  beforeRead?: (file: UploadFile) => boolean | Promise<UploadFile>
  afterRead?: (fileItem: UploadFileItem) => void
  removable?: boolean
  beforeRemove?: (...args: unknown[]) => boolean | Promise<void>
  validateEvent?: boolean
}

// const props = withDefaults(defineProps<UploadProps>(), {
//   accept: 'image',
//   sourceType: () => ['album', 'camera'],
//   sizeType: () => ['original', 'compressed'],
//   maxDuration: 60,
//   maxCount: Number.MAX_SAFE_INTEGER,
//   maxSize: Number.MAX_SAFE_INTEGER,
//   removable: true,
//   validateEvent: true,
// })

export const uploadProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,

  accept: {
    type: String as PropType<UploadProps['accept']>,
    default: defaultConfig.upload.accept,
  },
  multiple: Boolean,
  sourceType: {
    type: Array as PropType<UploadProps['sourceType']>,
    default: defaultConfig.upload.sourceType,
  },
  sizeType: {
    type: Array as PropType<UploadProps['sizeType']>,
    default: defaultConfig.upload.sizeType,
  },
  maxDuration: {
    type: Number,
    default: defaultConfig.upload.maxDuration,
  },
  camera: String as PropType<UploadProps['camera']>,
  modelValue: Array as PropType<UploadProps['modelValue']>,
  maxCount: {
    type: Number,
    default: defaultConfig.upload.maxCount,
  },
  maxSize: {
    type: [Number, Function] as PropType<UploadProps['maxSize']>,
    default: defaultConfig.upload.maxSize,
  },
  overSize: Function as PropType<UploadProps['overSize']>,
  disabled: Boolean,
  readonly: Boolean,
  beforeRead: Function as PropType<UploadProps['beforeRead']>,
  afterRead: Function as PropType<UploadProps['afterRead']>,
  removable: {
    type: Boolean,
    default: defaultConfig.upload.removable,
  },
  beforeRemove: Function as PropType<UploadProps['beforeRemove']>,
  validateEvent: {
    type: Boolean,
    default: defaultConfig.upload.validateEvent,
  },
}

export interface UploadSlots {
  select(props: Record<string, never>): any
}

export interface UploadEmits {
  (e: 'update:model-value', value: UploadFileItem[]): void
  (e: 'remove', index: number, item: UploadFileItem): void
}

export interface ChainNode {
  (data: any, next: (...args: any[]) => void): void
}

export interface UploadPreviewProps {
  rootStyle?: StyleValue
  rootClass?: string
  file?: UploadFile
  url?: string
  isImage?: boolean
  isVideo?: boolean
  status?: UploadStatus
  name?: string
  message?: string
  removable?: boolean
  beforeRemove?: (index: number) => boolean | Promise<void>
  index: number
  disabled?: boolean
  readonly?: boolean
}

// const props = withDefaults(defineProps<UploadPreviewProps>(), {
//   status: 'pending',
// })

export const uploadPreviewProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  file: Object as PropType<UploadPreviewProps['file']>,
  url: String,
  isImage: Boolean,
  isVideo: Boolean,
  status: {
    type: String as PropType<UploadPreviewProps['status']>,
    default: defaultConfig.uploadPreview.status,
  },
  name: String,
  message: String,
  removable: Boolean,
  beforeRemove: Function as PropType<UploadPreviewProps['beforeRemove']>,
  index: {
    type: Number,
    required: true as const,
  },
  disabled: Boolean,
  readonly: Boolean,
}

export interface UploadPreviewEmits {
  (e: 'image-click', index: number): void
  (e: 'remove', index: number): void
}
