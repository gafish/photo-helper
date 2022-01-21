import { makeAutoObservable } from 'mobx'

import * as invoke from 'utils/invoke'
import * as tools from 'utils/tools'

export class Store {
  // eslint-disable-next-line no-undef
  [key: string]: any

  constructor() {
    makeAutoObservable(this)
  }

  // 文件格式
  extensions = [
    { ext: 'jpg', checked: true },
    { ext: 'jpeg', checked: true },
    { ext: 'png', checked: true },
    { ext: 'gif', checked: true },
    { ext: 'bmp', checked: true },
    { ext: 'webp', checked: true },
    { ext: 'mov', checked: true },
    { ext: 'mp4', checked: true },
  ]

  // 选中的目录
  selectedDir = ''

  // 文件列表
  imageList: any[] = []

  // 合并值
  merge = (obj: any) => {
    Object.keys(obj).forEach(key => {
      this[key] = obj[key]
    })
  }

  // 选择目录和影像文件
  selectDirAndImages = (includeDir = true, includeChecked = false) =>
    tools.filterImages(this.extensions, includeDir, includeChecked)

  // 读取目录
  readDir = (dir: string) => {
    invoke
      .readDir(dir)
      .then(this.selectDirAndImages())
      .then(this.sortImages)
      .then(this.saveImagesList)
  }

  // 排序目录和影像文件
  sortImages = (images: any[]) => {
    return tools.sortFiles(images)
  }

  // 保存影像文件列表
  saveImagesList = (imageList: any[]) => {
    this.merge({ imageList })
    return imageList
  }

  // 保存所选目录路径
  saveSelectedDir = (selectedDir: string) => {
    this.merge({ selectedDir })
    return selectedDir
  }

  // 更新文件格式选中状态
  updateExtensions = (ext: string, checked = true) => {
    const extensions: any[] = [...this.extensions]
    const index = extensions.map(item => item.ext).indexOf(ext)

    extensions[index].checked = checked
    this.merge({ extensions })

    return extensions
  }
}

export default new Store()
