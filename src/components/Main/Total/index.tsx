import { FC } from 'react'

import inject from 'hoc/inject'

interface IProps {
  fileList?: any[]
}

export const Total: FC<IProps> = ({ fileList = [] }) => {
  const isEmpty = fileList.length === 0

  return isEmpty ? null : (
    <div className="text-sm">
      当前目录总共
      {fileList.filter((file: any) => file.file_type === 'Image').length}
      张照片
    </div>
  )
}

export default inject(store => ({
  fileList: store.fileList,
}))(Total)
