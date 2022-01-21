import { FC } from 'react'
import classnames from 'classnames'
import { GoFileDirectory, GoFileMedia } from 'react-icons/go'

import inject from 'hoc/inject'
import * as tools from 'utils/tools'

interface IProps {
  imageList?: any[]
  extensions?: any[]
}

export const ImageList: FC<IProps> = ({ imageList = [], extensions = [] }) => {
  const isEmpty = imageList.length === 0

  return (
    <div className={classnames('mt-2 border', { 'min-h-[20rem]': isEmpty })}>
      <ul>
        {tools
          .filterImages(
            extensions,
            true,
            true,
          )(imageList)
          .map((item: any) => (
            <li
              key={item.basename}
              className={classnames(
                'border-b p-2 flex items-center last:border-0',
                {
                  'font-bold': item.is_dir,
                },
              )}
            >
              <span className="mr-1">
                {item.is_dir ? <GoFileDirectory /> : <GoFileMedia />}
              </span>
              {item.basename}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default inject(store => ({
  extensions: store.extensions,
  imageList: store.imageList,
}))(ImageList)
