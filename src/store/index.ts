import { makeAutoObservable } from 'mobx'

import * as utils from 'utils'

export class Store {
  // eslint-disable-next-line no-undef
  [key: string]: any

  constructor() {
    makeAutoObservable(this)
  }

  // 选中的目录
  selectedDir: string = ''
  // selectedDir: string = '1111'

  // 文件列表
  fileList: any[] = []
  // fileList: any[] = [{ file_type: 'Image', basename: '1.jpg' }]

  // 合并值
  merge = (obj: any) => {
    Object.keys(obj).forEach(key => {
      this[key] = obj[key]
    })
  }

  // 显示目录
  showDir(dir: string) {
    // 读取目录
    const readDir = (dir: string) => utils.readDir(dir)
    // 过滤目录和图片
    const filterDirAndImage = (files: any) =>
      files.filter((file: any) => file.is_dir || file.file_type === 'Image')
    // 文件排序
    const sortFiles = (files: any) =>
      files.sort((a: any, b: any) =>
        a.is_dir && !b.is_dir ? -1 : b.is_dir && !a.is_dir ? 1 : 0,
      )
    // 保存文件列表
    const saveFileList = (fileList: any[]) => {
      this.merge({ fileList })
      return fileList
    }

    readDir(dir)
      .then(filterDirAndImage)
      .then(sortFiles)
      .then(saveFileList)
  }
}

export default new Store()
