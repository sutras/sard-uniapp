import { type PropType, type StyleValue } from 'vue'
import { defaultConfig } from '../config'

export interface ResultProps {
  rootStyle?: StyleValue
  rootClass?: string
  status?: 'success' | 'info' | 'warning' | 'error' | 'question'
  icon?: string
  iconFamily?: string
  iconColor?: string
  title?: string
  description?: string
}

// const props = withDefaults(defineProps<ResultProps>(), {
//   status: 'info',
// })

export const resultProps = {
  rootStyle: [String, Object, Array] as PropType<StyleValue>,
  rootClass: String,
  status: {
    type: String as PropType<NonNullable<ResultProps['status']>>,
    default: defaultConfig.result.status,
  },
  icon: String,
  iconFamily: String,
  iconColor: String,
  title: String,
  description: String,
}

export interface ResultSlots {
  default(props: Record<string, never>): any
  title(props: Record<string, never>): any
  description(props: Record<string, never>): any
  icon(props: Record<string, never>): any
}

export const mapStatusIcon = {
  success: 'check-circle-fill',
  info: 'info-circle-fill',
  warning: 'warning-fill',
  error: 'x-octagon-fill',
  question: 'question-circle-fill',
}
