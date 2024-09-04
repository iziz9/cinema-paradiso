import 'firebase/auth'
import firebaseApp from './firebase'
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw'
import { getToken, onMessage } from 'firebase/messaging'
import { useUserStore } from './store/userStore'
import { useNotificationStore } from './store/NotificationStore'

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

export const messaging = getMessaging(firebaseApp)

export const requestPermission = async () => {
  const { permissionStatus, setPermissionStatus } = useNotificationStore.getState()
  const { setUserMessagingToken } = useUserStore.getState()
  setUserMessagingToken('')

  if (permissionStatus !== 'granted') {
    setPermissionStatus('')
    console.log('알림 권한이 허용되지 않음')
    return
  }

  const permission = await Notification.requestPermission()
  if (permission === 'granted') setPermissionStatus('granted')

  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY
    })
    // Send the token to your server and update the UI if necessary
    if (token) {
      console.log('토큰: ', token)
      setUserMessagingToken(token)
    }

    return permission

    // Show permission request UI
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err)
  }

  onMessage(messaging, (payload) => {
    console.log('수신된 메시지 : ', payload)
    // ...
  })
}
