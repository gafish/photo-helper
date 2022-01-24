import { FC } from 'react'

import inject from 'hoc/inject'
import BtnChooseDir from 'components/BtnChooseDir'
import Total from './Total'

interface IProps {
  selectedDir?: any[]
}

export const Head: FC<IProps> = ({ selectedDir = [] }) => {
  return (
    <div className="flex justify-between pb-2 border-b">
      <div className="flex justify-between items-end">
        <BtnChooseDir size="sm" />
        <span className="text-xs pl-5 text-gray-400">{selectedDir}</span>
      </div>
      <Total />
    </div>
  )
}

export default inject(store => ({
  selectedDir: store.selectedDir,
}))(Head)
