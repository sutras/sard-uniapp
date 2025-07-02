import { type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export type UploadStatus = 'pending' | 'uploading' | 'failed' | 'done'

export interface UploadFile {
  type: 'image' | 'video'
  size: number
  path: string
  duration: number
  width: number
  height: number
  name: string
}

export interface UploadFileItem {
  file?: UploadFile
  url?: string
  isImage?: boolean
  isVideo?: boolean
  status?: UploadStatus
  name?: string
  message?: string
  [key: PropertyKey]: any
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
  beforeChoose?: (
    fileList: UploadFileItem[],
    next: (allowed: boolean) => void,
  ) => void
  beforeRead?: (file: UploadFile) => boolean | Promise<UploadFile>
  afterRead?: (fileItem: UploadFileItem) => void
  removable?: boolean
  beforeRemove?: (
    index: number,
    fileItem: UploadFileItem,
  ) => boolean | Promise<void>
  validateEvent?: boolean
}

export const defaultUploadProps = defaultConfig.upload as Omit<
  typeof defaultConfig.upload,
  'sourceType' | 'sizeType'
>

export interface UploadSlots {
  select?(props: Record<string, never>): any
}

export interface UploadEmits {
  (e: 'update:model-value', value: UploadFileItem[]): void
  (e: 'change', value: UploadFileItem[]): void
  (e: 'remove', index: number, item: UploadFileItem): void
  (e: 'item-click', item: UploadFileItem, index: number): void
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
  index: number
  disabled?: boolean
  readonly?: boolean
}

export const defaultUploadPreviewProps = defaultConfig.uploadPreview

export interface UploadPreviewEmits {
  (e: 'image-click'): void
  (e: 'remove'): void
  (e: 'click'): void
}
