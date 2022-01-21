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
  // 选择目录
  const chooseDir = useCallback(() => {
    return dialog
      .open({ directory: true })
      .then(dir => (Array.isArray(dir) ? dir[0] : dir))
  }, [])

  const readPhotoDir = useCallback(() => {
    chooseDir()
      .then(onChooseDir)
      .then(onComplete)
  }, [chooseDir, onComplete, onChooseDir])

  return (
    <button className={`btn btn-primary btn-${size}`} onClick={readPhotoDir}>
      选择照片目录
    </button>
  )
}

export default inject(store => ({
  onChooseDir: store.saveSelectedDir,
  onComplete: store.showDir,
}))(BtnChooseDir)
