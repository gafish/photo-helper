import { FC } from 'react'

import inject from 'hoc/inject'

import BtnCleanupPhoto from './BtnCleanupPhoto'
import BtnFindRepeat from './BtnFindRepeat'
import BtnClean from './BtnClean'
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
        <BtnFindRepeat />
        <BtnClean />
      </div>
      <ExtFilter />
    </div>
  )
}

export default inject(store => ({
  imageList: store.imageList,
}))(ToolBar)
