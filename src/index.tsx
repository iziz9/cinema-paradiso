import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import GlobalStyles from './globalStyles'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router'
import app from './firebase'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('./service-worker.ts', {
        scope: '/'
      })
      if (registration.installing) {
        console.log('서비스워커 설치중')
      } else if (registration.waiting) {
        console.log('서비스워커 설치 완료')
      } else if (registration.active) {
        console.log('서비스워커 활성화')
      }
    } catch (err) {
      console.error(`${err} 로 인한 등록 실패`)
    }
  }
}
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
//eslint-disable-next-line
const firebaseApp = app

root.render(
  <>
    <GlobalStyles />
    <RouterProvider router={router} />
  </>
)

// serviceWorkerRegistration.unregister()
registerServiceWorker()
serviceWorkerRegistration.register()
reportWebVitals()
