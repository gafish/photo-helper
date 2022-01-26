import { FC } from 'react'

import inject from 'hoc/inject'
import Entry from 'components/Entry'
import Main from 'components/Main'
import Version from 'components/Version'
import Loading from 'components/Loading'

interface IProps {
  imageList?: any[]
  loading?: boolean
}

export const App: FC<IProps> = ({ imageList = [], loading = false }) => {
  if (loading) return <Loading />

  return (
    <div className="h-full">
      {imageList.length ? <Main /> : <Entry />}
      <Version />
    </div>
  )
}

export default inject(store => ({
  imageList: store.imageList,
  loading: store.loading,
}))(App)
