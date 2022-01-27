import ReactDOM from 'react-dom'

const Alert = ({ text = '' }) => {
  return (
    <div className="w-full p-1 fixed left-0 top-0">
      <div className="alert alert-warning">
        <div className="flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 mx-2 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
          <label>{text}</label>
        </div>
      </div>
    </div>
  )
}

Alert.show = (text = '', time = 5000) => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  ReactDOM.render(<Alert text={text} />, div)

  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(div)
    document.body.removeChild(div)
  }, time)
}

export default Alert
