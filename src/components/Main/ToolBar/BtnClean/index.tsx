import { FC } from 'react'

import inject from 'hoc/inject'

interface IProps {
  onClick?: () => void
  disabled?: boolean
}

export const BtnClean: FC<IProps> = ({
  onClick = () => {},
  disabled = false,
}) => {
  return (
    <button
      className="btn btn-ghost btn-xs ml-1"
      onClick={onClick}
      disabled={disabled}
    >
      清空结果
    </button>
  )
}

export default inject(store => ({
  disabled: store.disabled,
  onClick: store.cleanResult,
}))(BtnClean)
