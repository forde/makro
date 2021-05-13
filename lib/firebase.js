const firebaseConfig = {
    apiKey: "AIzaSyBZr19U_gb7OLS6dOJPbtRgRXD6tNBnuQQ",
    authDomain: "makro-1431c.firebaseapp.com",
    projectId: "makro-1431c",
    storageBucket: "makro-1431c.appspot.com",
    messagingSenderId: "127474371519",
    appId: "1:127474371519:web:999293c511e672712faf0a",
    measurementId: "G-4TCJM34YXB"
}

const init = async () => {
    const firebase = await import('firebase/app')

    await Promise.all([
        import('firebase/auth'),
        import('firebase/firestore'),
    ])

    if(Object.values(firebaseConfig).filter(v=>v).length !== Object.keys(firebaseConfig).length) return Promise.reject('Firebase config is missing some variables')

    return !firebase.default.apps.length ? firebase.default.initializeApp(firebaseConfig) : firebase.default.app()

}

export default init