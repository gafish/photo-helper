import { FC, useCallback, ChangeEvent } from 'react'

import inject from 'hoc/inject'

interface IProps {
  extensions?: any[]
  onExtChange?: (ext: string, checked: boolean) => void
  disabled?: boolean
}

export const ExtFilter: FC<IProps> = ({
  extensions = [],
  onExtChange = () => {},
  disabled = false,
}) => {
  const handleExtChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = e.target
      const ext = value.trim()
      onExtChange(ext, checked)
    },
    [onExtChange],
  )

  return (
    <div className="flex items-center text-sm">
      <span className="pr-5">照片格式过滤:</span>
      {extensions.map(item => (
        <label className="cursor-pointer label mr-2" key={item.ext}>
          <span className="label-text pr-1">.{item.ext}</span>
          <input
            type="checkbox"
            checked={item.checked}
            className="checkbox checkbox-xs"
            value={item.ext}
            onChange={handleExtChange}
            disabled={disabled}
          />
        </label>
      ))}
    </div>
  )
}

export default inject(store => ({
  disabled: store.disabled,
  extensions: store.extensions,
  onExtChange: store.updateExtensions,
}))(ExtFilter)
