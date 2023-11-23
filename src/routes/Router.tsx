import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage'
import App from '../App'
import PATH from './routePath'
import MainPage from '../pages/MainPage'
import MyPage from '../pages/MyPage'
import SearchPage from '../pages/SearchPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: PATH.MAIN, element: <MainPage /> },
      { path: PATH.MYPAGE, element: <MyPage /> },
      { path: PATH.SEARCH, element: <SearchPage /> }
    ]
  }
])

export default router
