import { FC } from 'react'

import inject from 'hoc/inject'

import BtnCleanupPhoto from './BtnCleanupPhoto'
import BtnFindRepeat from './BtnFindRepeat'
import BtnClean from './BtnClean'
import ExtFilter from './ExtFilter'

interface IProps {
  finding: boolean
  repeatList?: any[]
}

export const ToolBar: FC<IProps> = ({ finding = false, repeatList = [] }) => {
  return (
    <div className="py-3">
      <div className="mt-1">
        <BtnCleanupPhoto />
        <BtnFindRepeat />
        <BtnClean />
      </div>
      {!(finding || repeatList.length > 0) && <ExtFilter />}
    </div>
  )
}

export default inject(store => ({
  finding: store.finding,
  repeatList: store.repeatList,
}))(ToolBar)
