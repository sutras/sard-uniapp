import { type PropType, type StyleValue } from 'vue'

export type LoadMoreStatus = 'incomplete' | 'loading' | 'complete' | 'error'

export interface LoadMoreProps {
  rootStyle?: StyleValue
  rootClass?: string
  status?: LoadMoreStatus
  incompleteText?: string
  loadingText?: string
  completeText?: string
  errorText?: string
}

export const loadMoreProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  status: {
    type: String as PropType<LoadMoreStatus>,
    default: 'incomplete',
  },
  incompleteText: String,
  loadingText: String,
  completeText: String,
  errorText: String,
}

export interface LoadMoreSlots {
  incomplete(props: Record<string, never>): any
  loading(props: Record<string, never>): any
  complete(props: Record<string, never>): any
  error(props: Record<string, never>): any
}

export interface LoadMoreEmits {
  (e: 'load-more'): void
  (e: 'reload'): void
}
