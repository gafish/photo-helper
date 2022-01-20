import { useObserver } from 'mobx-react'

import Entry from 'components/Entry'
import Main from 'components/Main'
import useStore from 'hooks/useStore'

export default () => {
  const { selectedDir } = useStore()

  return useObserver(() => (
    <div className="h-full">{selectedDir ? <Main /> : <Entry />}</div>
  ))
}
