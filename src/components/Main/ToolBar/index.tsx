import { FC } from 'react'

import inject from 'hoc/inject'

import BtnCleanupPhoto from './BtnCleanupPhoto'
import ExtFilter from './ExtFilter'

interface IProps {
  imageList?: any[]
}

export const ToolBar: FC<IProps> = ({ imageList = [] }) => {
  const isEmpty = imageList.length === 0

  return isEmpty ? null : (
    <div>
      <div className="mt-1 pt-1 border-t">
        <BtnCleanupPhoto />
        <button className="btn btn-outline btn-sm ml-1" disabled>
          查找重复
        </button>
      </div>
      <ExtFilter />
    </div>
  )
}

export default inject(store => ({
  imageList: store.imageList,
}))(ToolBar)
