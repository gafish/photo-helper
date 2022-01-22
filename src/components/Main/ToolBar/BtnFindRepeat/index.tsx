import { FC } from 'react'
import classnames from 'classnames'

import inject from 'hoc/inject'

interface IProps {
  loading: boolean
  onClick?: () => void
}

export const BtnFindRepeat: FC<IProps> = ({
  loading = false,
  onClick = () => {},
}) => {
  return (
    <button
      className={classnames('btn btn-outline btn-sm ml-1', {
        loading,
      })}
      onClick={onClick}
    >
      查找重复照片
    </button>
  )
}

export default inject(store => ({
  loading: store.finding,
  onClick: store.findRepeat,
}))(BtnFindRepeat)
