import { FC } from 'react'
import classnames from 'classnames'

import inject from 'hoc/inject'
import { record } from 'utils/umeng'

interface IProps {
  loading: boolean
  disabled: boolean
  onClick?: () => void
}

export const BtnFindRepeat: FC<IProps> = ({
  loading = false,
  disabled = false,
  onClick = () => {},
}) => {
  return (
    <button
      className={classnames('btn btn-outline btn-sm ml-1', {
        loading,
      })}
      onClick={() => {
        record('btn_find_repeat')
        onClick()
      }}
      disabled={disabled}
    >
      查找重复照片
    </button>
  )
}

export default inject(store => ({
  loading: store.finding,
  disabled: store.disabled,
  onClick: store.findRepeat,
}))(BtnFindRepeat)
