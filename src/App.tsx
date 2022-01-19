import React, { useState } from 'react'
import { fs, dialog } from '@tauri-apps/api'
import { GoFileDirectory, GoFileMedia } from "react-icons/go"
import classnames from 'classnames'

import * as utils from './utils'


function App() {
  const [selectedDir, setSelectedDir] = useState<string>('')
  const [fileList, setFileList] = useState<any[]>([])

  // 保存所选目录路径
  const saveSelectedDir = (dir: string) => {
    setSelectedDir(dir)
    return dir
  }
  // 保存文件列表
  const saveFileList = (fileList: any[]) => {
    setFileList(fileList)
    return fileList
  }
  // 选择目录
  const chooseDir = () => dialog.open({ directory: true })
    .then(dir => Array.isArray(dir) ? dir[0] : dir)
  // 文件排序
  const sortFiles = (files: any) => files.sort((a: any, b: any) => 
    (a.is_dir && !b.is_dir) ? -1 : (b.is_dir && !a.is_dir) ? 1 : 0
  )
  // 读取目录
  const readDir = (dir: string) => utils.readDir(dir)
  // 过滤目录和图片
  const filterDirAndImage = (files: any) => files.filter((file: any) => 
    file.is_dir || file.file_type === 'Image'
  )
  // 检查图片文件
  const checkImage = (file: any) => new Promise((resolve, reject) => 
    file.is_file && file.file_type === 'Image' ? resolve(file) : reject(file)
  )
  // 月份补零
  const addZero = (num: number, n = 10) => num < n ? `0${num}` : num
  // 获取图片生成日期
  const getImageCreateDate = (file: any) => {
    const date = new Date(file.created.secs_since_epoch * 1000)
    return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`
  }
  // 创建图片目录
  const createImageDir = (file: any, selectedDir: string) => () => {
    const date = getImageCreateDate(file)
    const dirPath = `${selectedDir}/${date}`

    return utils.isDir(dirPath)
      .then(result => {
        if (!result) fs.createDir(dirPath)
        return dirPath
      })
  }
  // 移动图片至目录
  const moveImage = (file: any) => (dirPath: string) => {
    return fs.copyFile(file.file_path, `${dirPath}/${file.basename}`)
      .then(() => {
        fs.removeFile(file.file_path)
      })
  }
  // 刷新目录
  const refreshDir = (selectedDir: string) => () => {
    showDir(selectedDir)
  }

  // 显示目录
  const showDir = (dir: string) => {
    readDir(dir)
      .then(filterDirAndImage)
      .then(sortFiles)
      .then(saveFileList)
  }

  const readPhotoDir = () => {
    chooseDir()
      .then(saveSelectedDir)
      .then(showDir)
  }

  const cleanupPhotos = () => {
    fileList.forEach(file => {
      checkImage(file)
        .then(createImageDir(file, selectedDir))
        .then(moveImage(file))
        .then(refreshDir(selectedDir))
    })
  }
  
  return (
    <div className="border-t">
      <div className="container mx-auto py-2">
        <div>
          <div><button className="btn btn-primary btn-sm" onClick={readPhotoDir}>选择照片目录</button></div>
          <div className="mt-1 pt-1 border-t">
            <button className="btn btn-sm" onClick={cleanupPhotos}>一键整理照片</button>
            <button className="btn btn-sm btn-disabled ml-1">查找重复照片</button>
          </div>
        </div>
        <div className="px-2 mt-2 border">
          <ul>
            {fileList.map((file: any) => (
              <li
                key={file.basename}
                className={classnames('border-b p-2 flex items-center last:border-0', {
                  'font-bold': file.children,
                })}
              >
                <span className="mr-1">
                  {file.is_dir ? <GoFileDirectory /> : <GoFileMedia />}
                </span>
                {file.basename}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
