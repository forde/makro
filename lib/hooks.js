import { auth, firestore } from '../lib/firebase'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

// Custom hook to read auth record and user profile doc
export function useUserData() {
    const [user] = useAuthState(auth)
    const [username, setUsername] = useState(null)
    const [weight, setWeight] = useState(0)

    useEffect(() => {
        // turn off realtime subscription
        let unsubscribe

        if(user) {
            const ref = firestore.collection('users').doc(user.uid)
            unsubscribe = ref.onSnapshot((doc) => {
                setUsername(doc.data()?.username)
                setWeight(doc.data()?.weight)
            })
        } else {
            setUsername(null)
            setWeight(weight)
        }

        return unsubscribe
    }, [user])

    return { user, username, weight }
}