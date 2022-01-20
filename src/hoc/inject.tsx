import { inject, observer } from 'mobx-react'

import { Store } from 'store'

export default (...args: string[]) => (Component: any) => {
  return inject<{ store: Store }, {}, {}, {}>(stores =>
    args.reduce(
      (prev, current) => ({ ...prev, [current]: stores.store[current] }),
      {},
    ),
  )(observer(Component))
}
