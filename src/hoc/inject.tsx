import useStore from 'hooks/useStore'

export default (...args: string[]) => (Component: any) => {
  return (props: any) => {
    const store = useStore()
    const stores = args.map(key => store[key])
    return <Component {...props} {...stores} />
  }
}
