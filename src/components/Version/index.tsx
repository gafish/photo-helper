import { useEffect, useState } from 'react'
import { app } from '@tauri-apps/api'

export const Version = () => {
  const [version, setVersion] = useState('')

  useEffect(() => {
    app.getVersion().then(setVersion)
  }, [])

  return (
    <a
      className="fixed left-1 bottom-1 text-gray-300 text-xs"
      href="https://github.com/gafish/photo-cleanup-app/releases"
      target="_blank"
      rel="noreferrer"
    >
      v{version}
    </a>
  )
}

export default Version
