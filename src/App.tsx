import React, { useState } from 'react'
import { fs, dialog } from '@tauri-apps/api'


function App() {
  const [photoList, setPhotoList] = useState<any[]>([
    { name: '111.jpg' },
    { name: '222.jpg' },
    { name: '333.jpg' },
    { name: '444.jpg' },
    { name: '555.jpg' },
  ])

  const handleFileChange = async () => {
    dialog.open({ directory: true }).then((result: any) => {
      console.log(result);

      fs.readDir(result).then((files: any) => {
        setPhotoList(files)
      })
    })
  }
  
  return (
    <div className="container mx-auto py-2">
      <div>
        <div><button className="btn btn-primary btn-sm">选择照片目录</button></div>
        <div className="mt-1 pt-1 border-t">
          <button className="btn btn-sm">一键整理照片</button>
          <button className="btn btn-sm ml-1">查找重复照片</button>
        </div>
      </div>
      <div className="px-2 mt-2 border">
        <ul>
          {photoList.map((photo: any) => (
            <li className="border-b p-2 last:border-0">{photo.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
