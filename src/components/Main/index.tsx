import ToolBar from './ToolBar'
import Head from './Head'
import List from './List'

export default () => {
  return (
    <div className="container mx-auto py-2">
      <Head />
      <ToolBar />
      <List />
    </div>
  )
}
