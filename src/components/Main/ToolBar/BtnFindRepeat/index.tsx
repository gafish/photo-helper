import { FC, useCallback } from 'react'
import { fs } from '@tauri-apps/api'
import MD5 from 'md5'

import inject from 'hoc/inject'
import * as tools from 'utils/tools'

interface IProps {
  onComplete?: (obj: any) => void
  imageList?: any[]
}

export const BtnFindRepeat: FC<IProps> = ({
  onComplete = () => {},
  imageList = [],
}) => {
  const findRepeat = useCallback(() => {
    const temp: any = {}

    Promise.all(
      imageList.map((item: any) => {
        return fs.readBinaryFile(item.file_path).then((data: any) => {
          const hash = MD5(data)

          if (temp[hash]) {
            temp[hash].push(item)
          } else {
            temp[hash] = [item]
          }
        })
      }),
    ).finally(() => {
      const repeatList = Object.entries<any>(temp)
        .filter(([key, value]) => value.length > 1)
        .map(([key, value]) => ({ hash: key, list: value }))

      onComplete(repeatList)
    })
  }, [imageList, onComplete])

  return (
    <button className="btn btn-outline btn-sm ml-1" onClick={findRepeat}>
      查找重复
    </button>
  )
}

export default inject(store => ({
  imageList: store.imageList,
  onComplete: store.saveRepeatList,
}))(BtnFindRepeat)
