import { FC, useCallback } from 'react'
import { dialog } from '@tauri-apps/api'

import inject from 'hoc/inject'

interface IProps {
  merge?: (obj: any) => void
  showDir?: (obj: any) => void
  size: 'sm' | 'lg'
}

export const BtnChooseDir: FC<IProps> = ({
  merge = () => {},
  showDir = () => {},
  size = 'sm',
}) => {
  // 选择目录
  const chooseDir = useCallback(() => {
    return dialog
      .open({ directory: true })
      .then(dir => (Array.isArray(dir) ? dir[0] : dir))
  }, [])
  // 保存所选目录路径
  const saveSelectedDir = useCallback(
    (selectedDir: string) => {
      merge({ selectedDir })
      return selectedDir
    },
    [merge],
  )

  const readPhotoDir = useCallback(() => {
    chooseDir()
      .then(saveSelectedDir)
      .then(showDir)
  }, [chooseDir, showDir, saveSelectedDir])

  return (
    <button className={`btn btn-primary btn-${size}`} onClick={readPhotoDir}>
      选择照片目录
    </button>
  )
}

export default inject('merge', 'showDir')(BtnChooseDir)
