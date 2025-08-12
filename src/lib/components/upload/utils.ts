import { toArray } from '../../utils'

interface chooseMediaOptions {
  count?: number
  mediaType?: 'image' | 'video' | ('image' | 'video')[]
  sourceType?: ('album' | 'camera')[]
  maxDuration?: number
  sizeType?: ('original' | 'compressed')[]
  camera?: 'back' | 'front'
  success?: (result: chooseMediaResult) => void
  fail?: (err: any) => void
  complete?: () => void
}

interface chooseMediaResult {
  tempFiles: {
    tempFilePath: string
    size: number
    duration: number
    height: number
    width: number
    fileType: 'image' | 'video'
    name: string
  }[]
  type: 'image' | 'video' | 'mix'
}

export function chooseMedia(options: chooseMediaOptions) {
  const {
    count = 9,
    mediaType = 'image',
    sourceType = ['album', 'camera'],
    maxDuration = 10,
    sizeType = ['original', 'compressed'],
    camera = 'back',
    success,
    fail,
    complete,
  } = options

  const arrayMediaType = toArray(mediaType)

  const hasImage = arrayMediaType.includes('image')
  const hasVideo = arrayMediaType.includes('video')

  if (hasImage && hasVideo && uni.chooseMedia) {
    return uni.chooseMedia({
      count,
      mediaType: ['image', 'video'],
      sourceType,
      maxDuration,
      sizeType,
      camera,
      success(res) {
        success?.({
          type: res.type as chooseMediaResult['type'],
          tempFiles: toArray(res.tempFiles).map((file) => {
            return {
              tempFilePath: file.tempFilePath,
              size: file.size,
              duration: file.duration,
              height: file.height,
              width: file.width,
              name: '',
              fileType: file.fileType,
            }
          }),
        })
      },
      fail,
      complete,
    })
  } else if (hasImage) {
    return uni.chooseImage({
      count,
      sizeType,
      sourceType,
      success(res) {
        success?.({
          type: 'image',
          tempFiles: toArray(res.tempFiles).map((file) => {
            return {
              tempFilePath: (
                file as UniApp.ChooseImageSuccessCallbackResultFile
              ).path,
              size: file.size,
              duration: 0,
              height: 0,
              width: 0,
              name: (file as File).name || '',
              fileType: 'image',
            }
          }),
        })
      },
      fail,
      complete,
    })
  } else if (hasVideo) {
    return uni.chooseVideo({
      sourceType,
      compressed: sizeType.includes('compressed'),
      maxDuration,
      camera,
      success(res) {
        success?.({
          type: 'video',
          tempFiles: [
            {
              tempFilePath: res.tempFilePath,
              size: res.size,
              duration: res.duration,
              height: res.height,
              width: res.width,
              name: res.name || '',
              fileType: 'video',
            },
          ],
        })
      },
      fail,
      complete,
    })
  }
}
