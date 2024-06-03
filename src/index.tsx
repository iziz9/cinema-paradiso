import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import GlobalStyles from './globalStyles'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router'
// import './firebase'
import './firebase-messaging-sw'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
//eslint-disable-next-line
// const firebaseApp = app

root.render(
  <>
    <GlobalStyles />
    <RouterProvider router={router} />
  </>
)

serviceWorkerRegistration.register()
reportWebVitals()
