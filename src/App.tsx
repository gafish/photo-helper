import React, { useState } from 'react'
import { fs, dialog } from '@tauri-apps/api'
import { GoFileDirectory, GoFileMedia } from "react-icons/go"
import classnames from 'classnames'


function App() {
  const [fileList, setFileList] = useState<any[]>([])

  const choosePhotoDir = async () => {
    dialog.open({ directory: true }).then((result: any) => {
      fs.readDir(result).then((files: any) => {
        // console.log(files);
        setFileList(files.sort((a: any, b: any) => {
          if (a.children && !b.children) {
            return -1
          }
          if (!a.children && b.children) {
            return 1
          }
          return 0
        }))
      })
    })
  }
  
  return (
    <div className="border-t">
      <div className="container mx-auto py-2">
        <div>
          <div><button className="btn btn-primary btn-sm" onClick={choosePhotoDir}>选择照片目录</button></div>
          <div className="mt-1 pt-1 border-t">
            <button className="btn btn-sm">一键整理照片</button>
            <button className="btn btn-sm btn-disabled ml-1">查找重复照片</button>
          </div>
        </div>
        <div className="px-2 mt-2 border">
          <ul>
            {fileList.map((file: any) => (
              <li className={classnames('border-b p-2 flex items-center last:border-0', {
                'font-bold': file.children,
              })}>
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
