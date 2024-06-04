// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'cinema-paradiso-green.firebaseapp.com',
  projectId: 'cinema-paradiso-green',
  storageBucket: 'cinema-paradiso-green.appspot.com',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
}
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp
