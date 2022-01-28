import { makeAutoObservable } from 'mobx'
import { fs, dialog } from '@tauri-apps/api'
import MD5 from 'md5'

import * as invoke from 'utils/invoke'
import * as tools from 'utils/tools'
import Alert from 'components/Alert'

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
    { ext: 'heic', checked: true },
    { ext: 'mov', checked: true },
    { ext: 'mp4', checked: true },
  ]

  // 选中的目录
  selectedDir = ''

  // 激活的tab
  activeTab = 'all'

  // 文件列表
  imageList: any[] = []

  // 重复文件列表
  repeatList: any[] = []

  // 目录加载中
  loading = false

  // 重复文件查找中
  finding = false

  // 文件整理中
  processing = false

  // 禁用状态
  get disabled() {
    return this.loading || this.finding || this.processing
  }

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

    return invoke
      .readDir(dir)
      .then(this.selectDirAndImages())
      .then(this.sortImages)
      .then(this.saveImagesList)
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

    if (imageList.length === 0) Alert.show('没有发现有效的影像文件')
    return imageList
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
    this.merge({
      imageList: [],
      repeatList: [],
      selectedDir: '',
      activeTab: 'all',
    })
  }

  // 查找重复照片
  findRepeat = () => {
    const temp: any = {}
    const saveRepeatList = () => {
      const repeatList = Object.entries<any>(temp)
        .filter(([, value]) => value.length > 1)
        .map(([hash, list]) => ({ hash, list }))
      this.merge({ repeatList })
      return repeatList
    }
    const saveActiveTab = (repeatList: any[]) => {
      if (repeatList.length === 0) return Alert.show('没有发现重复的照片')
      this.merge({ activeTab: 'repeat' })
    }
    const saveFinding = (finding: boolean) => () => {
      this.merge({ finding })
    }
    const filterFile = () =>
      this.imageList.filter(item => item.file_type === 'Image')
    const readFile = (files: any[]) =>
      Promise.all(
        files.map((item: any) =>
          fs.readBinaryFile(item.file_path).then((data: any) => {
            const hash = MD5(data)

            if (temp[hash]) {
              temp[hash].push(item)
            } else {
              temp[hash] = [item]
            }
          }),
        ),
      )

    Promise.resolve()
      .then(saveFinding(true))
      .then(filterFile)
      .then(readFile)
      .then(saveRepeatList)
      .then(saveActiveTab)
      .finally(saveFinding(false))
  }

  // 整理照片
  cleanupPhotos = () => {
    const saveProcessing = (processing: boolean) => () => {
      this.merge({ processing })
    }
    const changeTab = (activeTab: string) => () => {
      this.changeTab(activeTab)
    }
    const getMoveTaskList = () => {
      const images = tools.filterImages(
        this.extensions,
        false,
        true,
      )(this.imageList)

      return images.map((item: any) => () =>
        tools
          .createImageDir(this.selectedDir, item)
          .then(tools.moveImage(item)),
      )
    }
    const readDir = (dir: string) => () => this.readDir(dir)

    tools.serialPromise([
      saveProcessing(true),
      ...getMoveTaskList(),
      readDir(this.selectedDir),
      changeTab('all'),
      saveProcessing(false),
    ])
  }

  // 选择照片目录
  chooseDir = () => {
    // 保存所选目录路径
    const saveSelectedDir = (selectedDir: any[] | string) => {
      selectedDir = Array.isArray(selectedDir) ? selectedDir[0] : selectedDir
      this.merge({ selectedDir })
      return selectedDir as string
    }
    const saveLoading = (loading: boolean) => (selectedDir = '') => {
      this.merge({ loading })
      return selectedDir
    }
    const cleanResult = (selectedDir: any) => {
      this.cleanResult()
      return selectedDir
    }

    dialog
      .open({ directory: true })
      .then(cleanResult)
      .then(saveSelectedDir)
      .then(saveLoading(true))
      .then(this.readDir)
      .finally(saveLoading(false))
  }

  // 切换 tab
  changeTab = (activeTab: string) => {
    this.merge({ activeTab })
  }
}

export default new Store()
