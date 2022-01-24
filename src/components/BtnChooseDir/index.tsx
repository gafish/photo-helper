import { FC } from 'react'

import inject from 'hoc/inject'

interface IProps {
  onClick?: () => void
  size: 'sm' | 'lg'
  disabled?: boolean
}

export const BtnChooseDir: FC<IProps> = ({
  onClick = () => {},
  size = 'sm',
  disabled = false,
}) => {
  return (
    <div>
      <button
        className={`btn btn-primary btn-${size}`}
        onClick={onClick}
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
