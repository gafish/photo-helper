import { FC } from 'react'

import inject from 'hoc/inject'
import { record } from 'utils/umeng'

interface IProps {
  onChange?: (checked: boolean) => void
  value?: boolean
}

export const DirOption: FC<IProps> = ({
  onChange = () => {},
  value = false,
}) => {
  return (
    <div className="flex items-center text-sm">
      <span className="pr-5">复制到新目录:</span>
      <input
        type="checkbox"
        checked={value}
        className="checkbox checkbox-xs"
        onChange={e => {
          record('dir_option', { checked: e.target.checked })
          onChange(e.target.checked)
        }}
        // disabled={disabled}
      />
    </div>
  )
}

export default inject(store => ({
  value: store.copyToNewDir,
  onChange: (checked: boolean) => store.merge({ copyToNewDir: checked }),
}))(DirOption)
