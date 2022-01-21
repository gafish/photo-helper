import { FC, useCallback } from 'react'

import inject from 'hoc/inject'
import * as tools from 'utils/tools'

interface IProps {
  onComplete?: (obj: any) => void
  onFilterImages?: (obj: any) => any[]
  imageList?: any[]
  selectedDir?: string
}

export const BtnCleanupPhoto: FC<IProps> = ({
  onComplete = () => {},
  onFilterImages = () => [],
  imageList = [],
  selectedDir = '',
}) => {
  const cleanupPhotos = useCallback(() => {
    Promise.all(
      onFilterImages(imageList).map((item: any) => {
        return Promise.resolve(item)
          .then(tools.createImageDir(item, selectedDir))
          .then(tools.moveImage(item))
      }),
    ).then(() => {
      onComplete(selectedDir)
    })
  }, [imageList, selectedDir, onComplete, onFilterImages])

  return (
    <button className="btn btn-outline btn-sm" onClick={cleanupPhotos}>
      一键整理
    </button>
  )
}

export default inject(store => ({
  selectedDir: store.selectedDir,
  imageList: store.imageList,
  onComplete: store.readDir,
  onFilterImages: store.filterImages(),
}))(BtnCleanupPhoto)
