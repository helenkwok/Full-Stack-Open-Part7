import { useSelector } from 'react-redux'

const Notification = ({ message, messageStyle }) => {
  const notification = useSelector(state => state.notification)

  if (notification.message === null) {
    return null
  }

  return <div className={notification.messageStyle}>{notification.message}</div>
}

export default Notification
