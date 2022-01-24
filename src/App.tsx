import { FC } from 'react'

import inject from 'hoc/inject'
import Entry from 'components/Entry'
import Main from 'components/Main'
import Verion from 'components/Version'

interface IProps {
  imageList?: any[]
  loading?: boolean
}

export const App: FC<IProps> = ({ imageList = [], loading = false }) => {
  if (loading)
    return (
      <div className="h-full flex items-center justify-center">
        <button className="btn btn-sm btn-ghost loading">loading</button>
      </div>
    )

  return (
    <div className="h-full">
      {imageList.length ? <Main /> : <Entry />}
      <Verion />
    </div>
  )
}

export default inject(store => ({
  imageList: store.imageList,
  loading: store.loading,
}))(App)
