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

/**
 * 过滤影像文件
 * @param extensions 过滤格式列表
 * @param includeDir 是否包含目录
 * @param includeChecked 是否包含选中格式
 * @returns 文件列表
 */
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

// 获取图片日期
export const getImageDate = (item: any) => {
  const date = new Date(item.last_modified.secs_since_epoch * 1000)
  return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(
    date.getDate(),
  )}`
}

// 创建目录
export const createDir = (rootDir: string, dirName: string) => {
  const dirPath = `${rootDir}/${dirName}`

  return invoke.isDir(dirPath).then(result => {
    if (!result) return fs.createDir(dirPath).then(() => dirPath)
    return dirPath
  })
}

// 串行promise≈
export const serialPromise = (promises: any[]) => {
  return promises.reduce(
    (prev, current) => prev.then(current),
    Promise.resolve(),
  )
}
