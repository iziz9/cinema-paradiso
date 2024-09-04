import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Toast from './components/layout/Toast'
import NotificationModal from './components/notification/NotificationModal'
import { useNotificationStore } from './store/NotificationStore'
import { requestPermission } from './firebase-messaging-sw'

function App() {
  const { permissionStatus } = useNotificationStore.getState()

  useEffect(() => {
    const requestNotifyPermission = async () => {
      await requestPermission()
    }

    if (permissionStatus === '') {
      requestNotifyPermission()
    }
  }, [permissionStatus])

  return (
    <>
      <NotificationModal />
      <Header />
      <Outlet />
      <Footer />
      <Toast />
    </>
  )
}

export default App
