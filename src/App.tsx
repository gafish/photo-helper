import React, { useState } from 'react'
import { fs, dialog } from '@tauri-apps/api'
import { GoFileDirectory, GoFileMedia } from 'react-icons/go'
import classnames from 'classnames'

function App() {
  const [fileList, setFileList] = useState<any[]>([])

  const choosePhotoDir = async () => {
    dialog.open({ directory: true }).then((result: any) => {
      fs.readDir(result).then((files: any) => {
        // console.log(files);
        setFileList(
          files.sort((a: any, b: any) => {
            if (a.children && !b.children) {
              return -1
            }
            if (!a.children && b.children) {
              return 1
            }
            return 0
          }),
        )
      })
    })
  }

  const isEmpty = fileList.length === 0

  return (
    <div className="border-t">
      <div className="container mx-auto py-2">
        <div>
          <div className="flex justify-between">
            <button className="btn btn-primary btn-sm" onClick={choosePhotoDir}>
              选择照片目录
            </button>
            {!isEmpty && (
              <div className="text-sm">
                当前目录总共 {fileList.length} 张照片
              </div>
            )}
          </div>
          {!isEmpty && (
            <div className="mt-1 pt-1 border-t">
              <button className="btn btn-sm">一键整理照片</button>
              <button className="btn btn-sm btn-disabled ml-1">
                查找重复照片
              </button>
            </div>
          )}
        </div>
        <div
          className={classnames('mt-2 border', { 'min-h-[20rem]': isEmpty })}
        >
          <ul>
            {fileList.map((file: any) => (
              <li
                key={file.name}
                className={classnames(
                  'border-b p-2 text-xs flex items-center last:border-0 hover:bg-gray-100',
                  {
                    'font-bold': file.children,
                  },
                )}
              >
                <span className="mr-1">
                  {file.children ? <GoFileDirectory /> : <GoFileMedia />}
                </span>
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
