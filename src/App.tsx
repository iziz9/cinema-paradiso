import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { Outlet } from 'react-router-dom'
import Toast from './components/layout/Toast'

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Toast />
    </>
  )
}

export default App
