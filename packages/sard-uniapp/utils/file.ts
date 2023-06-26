/**
 * @description: 判断url是否为图片url
 * @param {string} url
 * @return {boolean}
 */
export function isImageUrl(url: string) {
  return /\.(?:jpg|jpeg|png|gif|svg|bmp|webp)$/i.test(url)
}

/**
 * @description: 判断url是否为文件url
 * @param {string} url
 * @return {boolean}
 */
export function isFileUrl(url: string) {
  return url.includes('/')
}

export type FileReaderResultType = 'file' | 'dataUrl' | 'text'

/**
 * @description: 读取文件内容
 * @param {File} file
 * @param {ResultType} resultType
 * @return {Promise<void | string>}
 */
export function readFileContent(file: File, resultType: FileReaderResultType) {
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
