import { FC } from 'react'
import classnames from 'classnames'

import inject from 'hoc/inject'

interface IProps {
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
}

export const BtnCleanupPhoto: FC<IProps> = ({
  onClick = () => {},
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      className={classnames('btn btn-outline btn-sm', { loading })}
      onClick={onClick}
      disabled={disabled}
    >
      一键整理
    </button>
  )
}

export default inject(store => ({
  loading: store.loading,
  disabled: store.repeatList.length > 0 || store.finding,
  onClick: store.cleanupPhotos,
}))(BtnCleanupPhoto)
