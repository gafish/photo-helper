import { FC } from 'react'

import inject from 'hoc/inject'

interface IProps {
  onClick?: () => void
}

export const BtnClean: FC<IProps> = ({ onClick = () => {} }) => {
  return (
    <button className="btn btn-outline btn-sm ml-1" onClick={onClick}>
      清空结果
    </button>
  )
}

export default inject(store => ({
  onClick: store.cleanResult,
}))(BtnClean)
