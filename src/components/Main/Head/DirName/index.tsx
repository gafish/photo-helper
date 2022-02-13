import { FC } from 'react'
import { shell } from '@tauri-apps/api'

import inject from 'hoc/inject'
import { record } from 'utils/umeng'

interface IProps {
  path?: string
}

export const DirName: FC<IProps> = ({ path = '' }) => {
  return (
    <span
      className="tooltip tooltip-bottom text-xs pl-5 text-gray-400 cursor-pointer hover:text-blue-500"
      data-tip="点击打开文件夹"
      onClick={() => {
        record('link_dir_name', { path })
        shell.open(path)
      }}
    >
      {path}
    </span>
  )
}

export default inject(store => ({
  path: store.selectedDir,
}))(DirName)
