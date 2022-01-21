import { FC } from 'react'

import inject from 'hoc/inject'
import Entry from 'components/Entry'
import Main from 'components/Main'

interface IProps {
  selectedDir?: string
}

export const App: FC<IProps> = ({ selectedDir = '' }) => {
  return <div className="h-full">{selectedDir ? <Main /> : <Entry />}</div>
}

export default inject(store => ({
  selectedDir: store.selectedDir,
}))(App)
