import { logError } from './log'
import { isHarmony } from './system'

/**
 * @description: 判断url是否为图片url
 * @param {string} url
 * @return {boolean}
 */
export function isImageUrl(url: string): boolean {
  const rPicMime = /\.(?:jpg|jpeg|png|gif|svg|bmp|webp|tiff|tif|heic|heif)$/i
  return (
    typeof url === 'string' &&
    (rPicMime.test(url) || url.indexOf('data:image') === 0)
  )
}

/**
 * @description: 判断url是否为视频url
 * @param {string} url
 * @return {boolean}
 */
export function isVideoUrl(url: string): boolean {
  const rVideoMime =
    /\.(avi|mp4|mov|wmv|flv|mkv|mpeg|mpg|3gp|webm|swf|rmvb|vob|ts|mts|m2ts|divx|asf|ogv|f4v)$/i
  return (
    typeof url === 'string' &&
    (rVideoMime.test(url) || url.indexOf('data:video') === 0)
  )
}

/**
 * @description: 判断url是否为文件url
 * @param {string} url
 * @return {boolean}
 */
export function isFileUrl(url: string): boolean {
  return url.includes('/')
}

export type FileReaderResultType = 'file' | 'dataUrl' | 'text'

/**
 * @description: 读取文件内容
 * @param {File} file
 * @param {ResultType} resultType
 * @return {Promise<void | string>}
 */
export function readFileContent(
  file: File,
  resultType: FileReaderResultType,
): Promise<string | void> {
  return new Promise<void | string>((resolve) => {
    if (resultType === 'file') {
      resolve()
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as string)
    }
    if (resultType === 'dataUrl') {
      reader.readAsDataURL(file)
    } else if (resultType === 'text') {
      reader.readAsText(file)
    }
  })
}

/**
 * @description: 从路径中获取文件名
 * @param {string} path
 * @param {boolean} ext 是否包含扩展名
 * @return {string}
 */
export function getFileName(path: string, ext = true): string {
  const name = path.match(/\/([^/]+)$/)?.[1] || ''
  return ext ? name : name.replace(/\.[^.]+$/, '')
}

/**
 * 将临时文件路径转换为 base64 编码字符串
 * @param filePath
 * @returns
 */
export function readAsDataURL(filePath: string) {
  return (
    'data:image/png;base64,' +
    uni.getFileSystemManager().readFileSync(filePath, 'base64')
  )
}

export async function plusToDataURL(filePath: string) {
  if (isHarmony) {
    return readAsDataURL(filePath)
  } else {
    return new Promise<string>((resolve, reject) => {
      try {
        plus.io.resolveLocalFileSystemURL(filePath, (entry) => {
          ;(entry as any).file((file: any) => {
            const fileReader = new plus.io.FileReader()
            fileReader.readAsDataURL(file, 'utf-8')
            fileReader.onloadend = (evt) => {
              resolve((evt.target as any).result)
            }
          })
        })
      } catch (err) {
        logError(err)
        reject(err)
      }
    })
  }
}
