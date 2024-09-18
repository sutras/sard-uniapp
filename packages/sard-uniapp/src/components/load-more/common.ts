import { type StyleValue } from 'vue'

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

export const defaultLoadMoreProps = {
  status: 'incomplete' as const,
}

export interface LoadMoreSlots {
  incomplete?(props: Record<string, never>): any
  loading?(props: Record<string, never>): any
  complete?(props: Record<string, never>): any
  error?(props: Record<string, never>): any
}

export interface LoadMoreEmits {
  (e: 'load-more'): void
  (e: 'reload'): void
}
