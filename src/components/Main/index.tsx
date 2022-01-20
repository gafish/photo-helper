import BtnChooseDir from 'components/BtnChooseDir'

import Total from './Total'
import ToolBar from './ToolBar'
import List from './List'

export default () => {
  return (
    <div className="container mx-auto py-2">
      <div className="flex justify-between">
        <BtnChooseDir size="sm" />
        <Total />
      </div>
      <ToolBar />
      <List />
    </div>
  )
}
