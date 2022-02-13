import React, { FC } from 'react'
import classnames from 'classnames'

import inject from 'hoc/inject'
import { record } from 'utils/umeng'

import ImageList from './ImageList'
import RepeatList from './RepeatList'

interface IProps {
  activeTab?: string
  repeatList?: any[]
  onClickTab?: (tab: string) => void
}

const ListMap: any = {
  all: <ImageList />,
  repeat: <RepeatList />,
}

export const List: FC<IProps> = ({
  activeTab = 'all',
  repeatList = [],
  onClickTab = () => {},
}) => {
  const tabs = [
    { text: '影像文件列表', name: 'all' },
    repeatList.length ? { text: '重复照片列表', name: 'repeat' } : null,
  ]
  return (
    <div>
      <div className="tabs">
        {tabs.map(
          item =>
            item && (
              <a
                className={classnames('tab tab-bordered', {
                  'tab-active': item.name === activeTab,
                })}
                key={item.name}
                onClick={() => {
                  record('tab_click', { tab: item.name })
                  onClickTab(item.name)
                }}
              >
                {item.text}
              </a>
            ),
        )}
      </div>
      {ListMap[activeTab]}
    </div>
  )
}

export default inject(store => ({
  activeTab: store.activeTab,
  repeatList: store.repeatList,
  onClickTab: store.changeTab,
}))(List)
