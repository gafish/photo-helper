import BtnChooseDir from 'components/BtnChooseDir'
import Total from './Total'
import DirName from './DirName'

export const Head = () => {
  return (
    <div className="flex justify-between pb-2 border-b">
      <div className="flex justify-between items-end">
        <BtnChooseDir size="sm" />
        <DirName />
      </div>
      <Total />
    </div>
  )
}

export default Head
