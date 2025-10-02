import { getAvailableImperative } from '../../use'
import { defaultConfig } from '../config'
import { CropImageProps, defaultCropImageProps } from '../crop-image/common'

export interface CropImageAgentProps extends CropImageProps {
  id?: string
}

export type CropImageOptions = Omit<CropImageAgentProps, 'src'> &
  Required<Pick<CropImageAgentProps, 'src'>>

export const defaultCropImageAgentProps = () => ({
  ...defaultCropImageProps,
  ...defaultConfig.cropImageAgent,
})

export const imperativeName = 'cropImage'

export interface CropImageImperative {
  show(newProps: Record<string, any>): void
  hide(): void
}

const cropImage = (options: CropImageOptions) => {
  const { id = defaultConfig.cropImageAgent.id as string } = options

  const imperative = getAvailableImperative<CropImageImperative>(
    imperativeName,
    id,
  )

  if (imperative) {
    imperative.show(options)
  }
}

export { cropImage }
