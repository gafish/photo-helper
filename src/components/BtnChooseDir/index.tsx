import { FC } from 'react'

import inject from 'hoc/inject'
import { record } from 'utils/umeng'

interface IProps {
  onClick?: () => void
  size: 'sm' | 'lg'
  disabled?: boolean
  clickSource?: string
}

export const BtnChooseDir: FC<IProps> = ({
  onClick = () => {},
  size = 'sm',
  disabled = false,
  clickSource = '',
}) => {
  return (
    <div>
      <button
        className={`btn btn-primary btn-${size}`}
        onClick={() => {
          record('btn_choose_dir', { clickSource })
          onClick()
        }}
        disabled={disabled}
      >
        选择照片目录
      </button>
    </div>
  )
}

export default inject(store => ({
  disabled: store.disabled,
  onClick: store.chooseDir,
}))(BtnChooseDir)
