import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import GlobalStyles from './globalStyles'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router'
import './firebase-messaging-sw'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <>
    <GlobalStyles />
    <RouterProvider router={router} />
  </>
)

serviceWorkerRegistration.register()
reportWebVitals()
