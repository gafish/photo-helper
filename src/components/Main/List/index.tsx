import { FC } from 'react'
import classnames from 'classnames'
import { GoFileDirectory, GoFileMedia } from 'react-icons/go'

import inject from 'hoc/inject'

interface IProps {
  fileList?: any[]
}

export const List: FC<IProps> = ({ fileList = [] }) => {
  const isEmpty = fileList.length === 0

  return (
    <div className={classnames('mt-2 border', { 'min-h-[20rem]': isEmpty })}>
      <ul>
        {fileList.map((file: any) => (
          <li
            key={file.basename}
            className={classnames(
              'border-b p-2 flex items-center last:border-0',
              {
                'font-bold': file.is_dir,
              },
            )}
          >
            <span className="mr-1">
              {file.is_dir ? <GoFileDirectory /> : <GoFileMedia />}
            </span>
            {file.basename}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default inject(store => ({
  fileList: store.fileList,
}))(List)
