import 'firebase/auth'
import firebaseApp from './firebase'
import { getMessaging } from 'firebase/messaging/sw'
import { getToken } from 'firebase/messaging'
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

export const messaging = getMessaging(firebaseApp)

const requestPermission = async () => {
  console.log('권한 요청 중')

  const permission = await Notification.requestPermission()
  if (permission === 'denied') {
    console.log('알림 권한이 허용되지 않음')
    return
  }

  console.log('알림 권한이 허용됨')

  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY
    })
    // Send the token to your server and update the UI if necessary
    if (token) console.log('토큰: ', token)
    // Show permission request UI
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err)
  }
}

requestPermission()

// const messaging = getMessaging()
// onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload)
//   // ...
// })
