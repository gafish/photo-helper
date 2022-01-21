import { inject, observer } from 'mobx-react'

import { Store } from 'store'

export default (cb: (store: Store) => any) => (Component: any) => {
  return inject<{ store: Store }, {}, {}, {}>(stores => cb(stores.store))(
    observer(Component),
  )
}
