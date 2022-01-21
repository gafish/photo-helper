import { FC } from 'react'
import classnames from 'classnames'

import inject from 'hoc/inject'

interface IProps {
  repeatList?: any[]
}

export const RepeatList: FC<IProps> = ({ repeatList = [] }) => {
  const isEmpty = repeatList.length === 0

  return (
    <div className={classnames('mt-2 border', { 'min-h-[20rem]': isEmpty })}>
      <ul>
        {repeatList.map((item: any, index: number) => (
          <li key={index} className="border-b p-2 last:border-0">
            <h5 className="text-xs text-gray-400">{item.hash}</h5>
            {item.list.map((d: any) => (
              <div key={d.basename}>{d.basename}</div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default inject(store => ({
  repeatList: store.repeatList,
}))(RepeatList)
