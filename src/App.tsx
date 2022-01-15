import React, { useState } from 'react'
import { fs, dialog } from '@tauri-apps/api'


function App() {
  const [photoList, setPhotoList] = useState<string[]>([])

  const handleFileChange = async () => {
    dialog.open({ directory: true }).then((result: any) => {
      console.log(result);

      fs.readDir(result).then((files: any) => {
        setPhotoList(files)
      })
    })
  }
  
  return (
    <div>
      <div onClick={handleFileChange}>
      file
      </div>

      <div>
        <ul>
          {photoList.map((photo: any) => (
            <li>{photo.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
