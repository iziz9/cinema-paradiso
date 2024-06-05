import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { Outlet } from 'react-router-dom'
import Toast from './components/layout/Toast'
// import Notification from './components/notification/Notification'

function App() {
  return (
    <>
      {/* <Notification /> */}
      <Header />
      <Outlet />
      <Footer />
      <Toast />
    </>
  )
}

export default App
