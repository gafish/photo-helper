import { FC } from 'react'

import inject from 'hoc/inject'

import BtnCleanupPhoto from './BtnCleanupPhoto'
import BtnFindRepeat from './BtnFindRepeat'
import BtnClean from './BtnClean'
import ExtFilter from './ExtFilter'
import DirOption from './DirOption'

interface IProps {
  showOptions: boolean
}

export const ToolBar: FC<IProps> = ({ showOptions = true }) => {
  return (
    <div className="py-3">
      <div className="mt-1">
        <BtnCleanupPhoto />
        <BtnFindRepeat />
        <BtnClean />
      </div>
      {showOptions && (
        <div>
          <ExtFilter />
          <DirOption />
        </div>
      )}
    </div>
  )
}

export default inject(store => ({
  showOptions: store.activeTab === 'all' && !store.finding,
}))(ToolBar)
