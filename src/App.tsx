import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { Outlet } from 'react-router-dom'
import Toast from './components/layout/Toast'
import Notification from './components/notification/Notification'
import { useNotificationStore } from './store/NotificationStore'

function App() {
  const { permissionStatus } = useNotificationStore()

  return (
    <>
      {permissionStatus === '' && <Notification />}
      <Header />
      <Outlet />
      <Footer />
      <Toast />
    </>
  )
}

export default App
