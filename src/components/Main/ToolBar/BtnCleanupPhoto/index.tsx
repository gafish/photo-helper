import { FC } from 'react'
import classnames from 'classnames'

import inject from 'hoc/inject'
import { record } from 'utils/umeng'

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
      onClick={() => {
        record('btn_cleanup_photo')
        onClick()
      }}
      disabled={disabled}
    >
      一键整理
    </button>
  )
}

export default inject(store => ({
  loading: store.processing,
  disabled: store.disabled,
  onClick: store.cleanupPhotos,
}))(BtnCleanupPhoto)
