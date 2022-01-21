import { FC, useCallback, ChangeEvent } from 'react'

import inject from 'hoc/inject'

interface IProps {
  extensions?: any[]
  onExtChange?: (ext: string, checked: boolean) => void
}

export const ExtFilter: FC<IProps> = ({
  extensions = [],
  onExtChange = () => {},
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
      <span className="pr-5">格式过滤:</span>
      {extensions.map(item => (
        <label className="cursor-pointer label mr-2" key={item.ext}>
          <span className="label-text pr-1">.{item.ext}</span>
          <input
            type="checkbox"
            checked={item.checked}
            className="checkbox checkbox-xs"
            value={item.ext}
            onChange={handleExtChange}
          />
        </label>
      ))}
    </div>
  )
}

export default inject(store => ({
  extensions: store.extensions,
  onExtChange: store.updateExtensions,
}))(ExtFilter)
