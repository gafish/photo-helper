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
    <div>
      <div className="mt-1 pt-1 border-t">
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
