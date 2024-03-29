import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import GlobalStyles from './globalStyles'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router'
import app from './firebase'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
//eslint-disable-next-line
const firebaseApp = app

root.render(
  <>
    <GlobalStyles />
    <RouterProvider router={router} />
  </>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
