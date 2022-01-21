import { FC } from 'react'

import inject from 'hoc/inject'

import ImageList from './ImageList'
import RepeatList from './RepeatList'

interface IProps {
  repeatList?: any[]
}

export const List: FC<IProps> = ({ repeatList = [] }) => {
  return repeatList.length !== 0 ? <RepeatList /> : <ImageList />
}

export default inject(store => ({
  repeatList: store.repeatList,
}))(List)
