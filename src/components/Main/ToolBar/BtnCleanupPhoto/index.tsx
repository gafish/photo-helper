import { FC, useCallback } from 'react'
import { fs } from '@tauri-apps/api'

import inject from 'hoc/inject'
import * as invokes from 'utils/invoke'

interface IProps {
  onComplete?: (obj: any) => void
  fileList?: any[]
  selectedDir?: string
}

export const BtnCleanupPhoto: FC<IProps> = ({
  onComplete = () => {},
  fileList = [],
  selectedDir = '',
}) => {
  // 检查图片文件
  const checkImage = useCallback(
    (file: any) =>
      new Promise((resolve, reject) =>
        file.is_file && file.file_type === 'Image'
          ? resolve(file)
          : reject(file),
      ),
    [],
  )
  // 月份补零
  const addZero = useCallback(
    (num: number, n = 10) => (num < n ? `0${num}` : num),
    [],
  )
  // 获取图片生成日期
  const getImageCreateDate = useCallback(
    (file: any) => {
      const date = new Date(file.created.secs_since_epoch * 1000)
      return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(
        date.getDate(),
      )}`
    },
    [addZero],
  )
  // 创建图片目录
  const createImageDir = useCallback(
    (file: any, selectedDir: string) => () => {
      const date = getImageCreateDate(file)
      const dirPath = `${selectedDir}/${date}`

      return invokes.isDir(dirPath).then(result => {
        if (!result) fs.createDir(dirPath)
        return dirPath
      })
    },
    [getImageCreateDate],
  )
  // 移动图片至目录
  const moveImage = useCallback(
    (file: any) => (dirPath: string) => {
      return fs
        .copyFile(file.file_path, `${dirPath}/${file.basename}`)
        .then(() => {
          fs.removeFile(file.file_path)
        })
    },
    [],
  )

  const cleanupPhotos = useCallback(() => {
    const tasks = fileList.map(file => {
      return checkImage(file)
        .then(createImageDir(file, selectedDir))
        .then(moveImage(file))
    })

    Promise.all(tasks).then(() => {
      onComplete(selectedDir)
    })
  }, [fileList, selectedDir, onComplete, createImageDir, moveImage, checkImage])

  return (
    <button className="btn btn-outline btn-sm" onClick={cleanupPhotos}>
      一键整理照片
    </button>
  )
}

export default inject(store => ({
  selectedDir: store.selectedDir,
  fileList: store.fileList,
  onComplete: store.showDir,
}))(BtnCleanupPhoto)
