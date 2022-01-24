import { FC } from 'react'

import inject from 'hoc/inject'

interface IProps {
  imageList?: any[]
}

export const Total: FC<IProps> = ({ imageList = [] }) => {
  const isEmpty = imageList.length === 0

  return isEmpty ? null : (
    <div className="text-sm">
      当前目录总共
      <span className="text-green-600">
        {imageList.filter((item: any) => item.file_type === 'Image').length}
      </span>
      个影像文件
    </div>
  )
}

export default inject(store => ({
  imageList: store.imageList,
}))(Total)
