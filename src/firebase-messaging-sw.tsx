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

const requestPermission = async () => {
  const permission = await Notification.requestPermission()
  const { setPermissionStatus } = useNotificationStore.getState()
  const { setUserMessagingToken } = useUserStore.getState()

  setUserMessagingToken('')

  if (permission === 'denied') {
    setPermissionStatus('denided')
    console.log('알림 권한이 허용되지 않음')
    return
  }

  console.log('알림 권한이 허용됨')
  setPermissionStatus('granted')

  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY
    })
    // Send the token to your server and update the UI if necessary
    if (token) {
      console.log('토큰: ', token)
      setUserMessagingToken(token)
    }

    // Show permission request UI
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err)
  }

  onMessage(messaging, (payload) => {
    console.log('수신된 메시지 : ', payload)
    // ...
  })
}

requestPermission()
