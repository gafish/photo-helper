import { FC, useCallback } from 'react'
import { dialog } from '@tauri-apps/api'

import inject from 'hoc/inject'

interface IProps {
  onChooseDir?: (obj: any) => void
  onComplete?: (obj: any) => void
  size: 'sm' | 'lg'
}

export const BtnChooseDir: FC<IProps> = ({
  onChooseDir = () => {},
  onComplete = () => {},
  size = 'sm',
}) => {
  const readPhotoDir = useCallback(() => {
    dialog
      .open({ directory: true })
      .then(dir => (Array.isArray(dir) ? dir[0] : dir))
      .then(onChooseDir)
      .then(onComplete)
  }, [onComplete, onChooseDir])

  return (
    <button className={`btn btn-primary btn-${size}`} onClick={readPhotoDir}>
      选择照片目录
    </button>
  )
}

export default inject(store => ({
  onChooseDir: store.saveSelectedDir,
  onComplete: store.readDir,
}))(BtnChooseDir)
