import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      {/* <Modal /> */}
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
