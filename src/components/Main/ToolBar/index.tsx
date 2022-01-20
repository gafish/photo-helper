import { FC } from 'react'

import inject from 'hoc/inject'

import BtnCleanupPhoto from './BtnCleanupPhoto'

interface IProps {
  fileList?: any[]
}

export const ToolBar: FC<IProps> = ({ fileList = [] }) => {
  const isEmpty = fileList.length === 0

  return isEmpty ? null : (
    <div className="mt-1 pt-1 border-t">
      <BtnCleanupPhoto />
      <button className="btn btn-outline btn-sm ml-1" disabled>
        查找重复照片
      </button>
    </div>
  )
}

export default inject('fileList')(ToolBar)
