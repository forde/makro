import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBZr19U_gb7OLS6dOJPbtRgRXD6tNBnuQQ",
    authDomain: "makro-1431c.firebaseapp.com",
    projectId: "makro-1431c",
    storageBucket: "makro-1431c.appspot.com",
    messagingSenderId: "127474371519",
    appId: "1:127474371519:web:999293c511e672712faf0a",
    measurementId: "G-4TCJM34YXB"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();