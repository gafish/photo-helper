import { FC } from 'react'

import inject from 'hoc/inject'

interface IProps {
  onClick?: () => void
  size: 'sm' | 'lg'
  selectedDir?: string
  disabled?: boolean
}

export const BtnChooseDir: FC<IProps> = ({
  onClick = () => {},
  size = 'sm',
  selectedDir = '',
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
      <span className="text-xs pl-5 text-gray-400">{selectedDir}</span>
    </div>
  )
}

export default inject(store => ({
  selectedDir: store.selectedDir,
  disabled: store.disabled,
  onClick: store.chooseDir,
}))(BtnChooseDir)
