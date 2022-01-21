import { fs } from '@tauri-apps/api'

import * as invoke from 'utils/invoke'

// 判断格式是否存在
export const isExtensionExist = (extensions: any[], image: any) => {
  return extensions.some(item => item.ext === getExt(image))
}

// 判断格式是否选中
export const isChecked = (extensions: any[], item: any) =>
  extensions.reduce(
    (prev, current) => ({ ...prev, [current.ext]: current.checked }),
    {},
  )[getExt(item)]

// 获取文件名后缀
export const getExt = (item: any) => {
  const ext = item.basename
    .split('.')
    .pop()
    .toLowerCase()
  return ext
}

// 判断是否是目录
export const isDir = (item: any) => item.is_dir

// 过滤影像文件
export const filterImages = (
  extensions: any[],
  includeDir = false,
  includeChecked = true,
) => (images: any[]) => {
  return images?.filter(
    (item: any) =>
      (includeDir && isDir(item)) ||
      (isExtensionExist(extensions, item) &&
        (includeChecked ? isChecked(extensions, item) : true)),
  )
}

// 文件排序
export const sortFiles = (images: any[]) =>
  images?.sort((a: any, b: any) =>
    isDir(a) && !isDir(b) ? -1 : isDir(b) && !isDir(a) ? 1 : 0,
  )

// 月份补零
export const addZero = (num: number, n = 10) => (num < n ? `0${num}` : num)

// 获取图片生成日期
export const getImageCreateDate = (item: any) => {
  const date = new Date(item.created.secs_since_epoch * 1000)
  return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(
    date.getDate(),
  )}`
}

// 创建图片目录
export const createImageDir = (selectedDir: string) => (item: any) => {
  const date = getImageCreateDate(item)
  const dirPath = `${selectedDir}/${date}`

  return invoke.isDir(dirPath).then(result => {
    if (!result) fs.createDir(dirPath)
    return dirPath
  })
}

// 移动图片至目录
export const moveImage = (item: any) => (dirPath: string) => {
  return fs.copyFile(item.file_path, `${dirPath}/${item.basename}`).then(() => {
    fs.removeFile(item.file_path)
  })
}
