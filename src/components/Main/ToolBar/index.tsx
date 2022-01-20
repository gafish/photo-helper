import { useObserver } from 'mobx-react'

import useStore from 'hooks/useStore'

export default () => {
  const { fileList } = useStore()

  const isEmpty = fileList.length === 0

  return useObserver(() =>
    isEmpty ? null : (
      <div className="mt-1 pt-1 border-t">
        <button className="btn btn-outline btn-sm">一键整理照片</button>
        <button className="btn btn-outline btn-sm btn-disabled ml-1">查找重复照片</button>
      </div>
    ),
  )
}
