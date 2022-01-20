import { useLocalStore } from 'mobx-react'

import store from '../store'

export default () => {
  return useLocalStore(() => store)
}
