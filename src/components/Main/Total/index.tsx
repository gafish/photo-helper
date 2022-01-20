import { useObserver } from 'mobx-react'

import useStore from 'hooks/useStore'

export default () => {
  const { fileList } = useStore()

  const isEmpty = fileList.length === 0

  return useObserver(() =>
    isEmpty ? null : (
      <div className="text-sm">
        当前目录总共
        {fileList.filter((file: any) => file.file_type === 'Image').length}
        张照片
      </div>
    ),
  )
}
