import { FC, useCallback } from 'react'

import inject from 'hoc/inject'
import * as tools from 'utils/tools'

interface IProps {
  onComplete?: (obj: any) => void
  imageList?: any[]
  repeatList?: any[]
  extensions?: any[]
  selectedDir?: string
}

export const BtnCleanupPhoto: FC<IProps> = ({
  onComplete = () => {},
  imageList = [],
  repeatList = [],
  extensions = [],
  selectedDir = '',
}) => {
  const cleanupPhotos = useCallback(() => {
    const images = tools.filterImages(extensions, false, true)(imageList)

    Promise.all(
      images.map((item: any) => {
        return Promise.resolve(item)
          .then(tools.createImageDir(selectedDir))
          .then(tools.moveImage(item))
      }),
    )
      .finally(() => {
        onComplete(selectedDir)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }, [imageList, selectedDir, onComplete, extensions])

  return (
    <button
      className="btn btn-outline btn-sm"
      onClick={cleanupPhotos}
      disabled={repeatList.length !== 0}
    >
      一键整理
    </button>
  )
}

export default inject(store => ({
  selectedDir: store.selectedDir,
  extensions: store.extensions,
  imageList: store.imageList,
  repeatList: store.repeatList,
  onComplete: store.readDir,
}))(BtnCleanupPhoto)
