import { FC } from 'react'

import inject from 'hoc/inject'

interface IProps {
  name?: string
}

export const DirName: FC<IProps> = ({ name = '' }) => {
  return <span className="text-xs pl-5 text-gray-400">{name}</span>
}

export default inject(store => ({
  name: store.selectedDir,
}))(DirName)
