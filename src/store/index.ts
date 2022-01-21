import { makeAutoObservable } from 'mobx'

import * as invokes from 'utils/invoke'
import * as tools from 'utils/tools'

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
  showDir = (dir: string) => {
    invokes
      .readDir(dir)
      .then(tools.filterDirAndImage)
      .then(tools.sortFiles)
      .then(this.saveFileList)
  }

  // 保存文件列表
  saveFileList = (fileList: any[]) => {
    this.merge({ fileList })
    return fileList
  }

  // 保存所选目录路径
  saveSelectedDir = (selectedDir: string) => {
    this.merge({ selectedDir })
    return selectedDir
  }
}

export default new Store()
