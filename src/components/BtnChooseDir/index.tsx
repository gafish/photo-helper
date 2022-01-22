import { FC, useCallback } from 'react'
import { dialog } from '@tauri-apps/api'

import inject from 'hoc/inject'

interface IProps {
  onChooseDir?: (obj: any) => void
  onComplete?: (obj: any) => void
  size: 'sm' | 'lg'
  selectedDir?: string
}

export const BtnChooseDir: FC<IProps> = ({
  onChooseDir = () => {},
  onComplete = () => {},
  size = 'sm',
  selectedDir = '',
}) => {
  const readPhotoDir = useCallback(() => {
    dialog
      .open({ directory: true })
      .then(dir => (Array.isArray(dir) ? dir[0] : dir))
      // .then(dir => { console.log(dir); return dir })
      .then(onChooseDir)
      .then(onComplete)
  }, [onComplete, onChooseDir])

  return (
    <div>
      <button className={`btn btn-primary btn-${size}`} onClick={readPhotoDir}>
        选择照片目录
      </button>
      <span className="text-xs pl-5 text-gray-400">{selectedDir}</span>
    </div>
  )
}

export default inject(store => ({
  onChooseDir: store.saveSelectedDir,
  onComplete: store.readDir,
  selectedDir: store.selectedDir,
}))(BtnChooseDir)
