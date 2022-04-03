// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyABGxGGKB0cN_FUw29dmHUsDDfBQyrkM-M',
  authDomain: 'college-class-scheduling.firebaseapp.com',
  databaseURL: 'https://college-class-scheduling-default-rtdb.firebaseio.com',
  projectId: 'college-class-scheduling',
  storageBucket: 'college-class-scheduling.appspot.com',
  messagingSenderId: '762570299425',
  appId: '1:762570299425:web:b3b3221d1b7669643f2b60',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
