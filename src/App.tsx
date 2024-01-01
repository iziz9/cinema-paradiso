import React from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { Outlet } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <RecoilRoot>
      {/* <Modal /> */}
      <Header />
      <Outlet />
      <Footer />
    </RecoilRoot>
  )
}

export default App
