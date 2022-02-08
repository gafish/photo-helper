import { useEffect, useState } from 'react'
import { app } from '@tauri-apps/api'

export const Version = () => {
  const [version, setVersion] = useState('')

  useEffect(() => {
    app.getVersion().then(setVersion)
  }, [])

  return (
    <a
      className="fixed right-1 bottom-1 text-gray-300 text-xs bg-white px-2 py-1 rounded-md"
      href="https://github.com/gafish/photo-helper/releases"
      target="_blank"
      rel="noreferrer"
    >
      v{version}
    </a>
  )
}

export default Version
