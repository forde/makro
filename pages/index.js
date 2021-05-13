import React, { useState, useEffect } from 'react'

function HomePage() {

    const [ firebase, setFirebase ] = useState(null)

    useEffect(() => {
        setTimeout(async () => {
            const { default: loadFirebase }  = await import('~/lib/firebase')
            loadFirebase().then(firebase => setFirebase(firebase))
        }, 3000)
    }, [])

    // set up auth state listener
    useEffect(() => {
        if(!firebase) return
        firebase.auth().onAuthStateChanged((user) => {
            console.log('User', user)
        })
    }, [firebase])

    // set up collection state listener
    useEffect(() => {
        if(!firebase) return
        firebase.firestore().collection('collection').onSnapshot(snap => {
            let data = {}
            snap.forEach((doc) => data[doc.id] = doc.data()?.value )
            console.log('New data snapshot', data)
        })
    }, [firebase])

    const signIn = () => {
        setFirebaseUserError('')
        firebase.auth().signInWithEmailAndPassword('admin@spoton.no', pass)
        .then(() => null)
        .catch(e => console.log(e.message))
    }

    const signOut = () => firebase.auth().signOut()

    // firebase.firestore().collection('cacheKeys').doc('persistorKey').set({ value: cacheKeys.persistorKey + 1}, { merge: true })

    return <div>Welcome to Next.js!</div>
}
  
export default HomePage