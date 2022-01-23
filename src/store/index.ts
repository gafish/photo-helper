import { makeAutoObservable } from 'mobx'
import { fs, dialog } from '@tauri-apps/api'
import MD5 from 'md5'

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

  // 重复文件列表
  repeatList: any[] = []

  loading = false
  finding = false

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
    if (!dir) return

    this.setLoading(true)
    return invoke
      .readDir(dir)
      .then(this.selectDirAndImages())
      .then(this.sortImages)
      .then(this.saveImagesList)
      .finally(() => this.setLoading(false))
  }

  // finding
  setFinding = (finding: boolean) => {
    this.merge({ finding })
  }

  // loading
  setLoading = (loading: boolean) => {
    this.merge({ loading })
  }

  // 排序目录和影像文件
  sortImages = (images: any[]) => {
    return tools.sortFiles(images)
  }

  // 保存重复文件列表
  saveRepeatList = (repeatList: any[]) => {
    this.merge({ repeatList })
    return repeatList
  }

  // 保存影像文件列表
  saveImagesList = (imageList: any[]) => {
    this.merge({ imageList })
    return imageList
  }

  // 保存所选目录路径
  saveSelectedDir = (selectedDir: string) => {
    if (!selectedDir) return ''

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

  // 清空
  cleanResult = () => {
    this.merge({ imageList: [], repeatList: [], selectedDir: '' })
  }

  // 查找重复文件
  findRepeat = () => {
    const temp: any = {}

    this.setFinding(true)
    Promise.all(
      this.imageList
        .filter(item => item.file_type === 'Image')
        .map((item: any) =>
          fs.readBinaryFile(item.file_path).then((data: any) => {
            const hash = MD5(data)

            if (temp[hash]) {
              temp[hash].push(item)
            } else {
              temp[hash] = [item]
            }
          }),
        ),
    ).finally(() => {
      const repeatList = Object.entries<any>(temp)
        .filter(([, value]) => value.length > 1)
        .map(([hash, list]) => ({ hash, list }))

      this.merge({ repeatList })
      this.setFinding(false)
    })
  }

  // 整理照片
  cleanupPhotos = () => {
    const images = tools.filterImages(
      this.extensions,
      false,
      true,
    )(this.imageList)
    const tasks: any = images.map((item: any) => {
      return () =>
        tools.createImageDir(this.selectedDir, item).then(tools.moveImage(item))
    })

    tasks.push(() => Promise.resolve(this.selectedDir).then(this.readDir))

    tools.serialPromise(tasks)
  }

  // 选择照片目录
  chooseDir = () => {
    dialog
      .open({ directory: true })
      .then(dir => (Array.isArray(dir) ? dir[0] : dir))
      .then(this.saveSelectedDir)
      .then(this.readDir)
  }
}

export default new Store()
