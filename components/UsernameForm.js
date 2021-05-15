import { UserContext } from '~/lib/context'
import { useEffect, useState, useCallback, useContext } from 'react'
import debounce from 'lodash.debounce'

import { firestore } from '~/lib/firebase'
import Loader from '~/components/Loader'
import Input from '~/components/Input'

export default function UsernameForm() {

    const { user, username } = useContext(UserContext)

    const [ usernameValue, setUsernameValue ] = useState('')
    const [ isValid, setIsValid ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState('')

    const onSubmit = async () => {
        setError('')

        // Create refs for both documents
        const userDoc = firestore.doc(`users/${user.uid}`)
        const usernameDoc = firestore.doc(`usernames/${usernameValue}`)

        // Commit both docs together as a batch write.
        const batch = firestore.batch()
        batch.set(userDoc, { username: usernameValue, photoURL: user.photoURL, displayName: user.displayName })
        batch.set(usernameDoc, { uid: user.uid })

        setLoading(true)

        await batch.commit()

        setLoading(false)
    }

    const onChange = value => {
        const val = value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        if(val.length < 3) {
            setUsernameValue(val)
            setLoading(false)
        }

        if(re.test(val)) {
            setUsernameValue(val)
            setLoading(true)
        }

        setIsValid(false)
    }

    useEffect(() => {
        checkUsername(usernameValue);
    }, [usernameValue])

    useEffect(() => {
        setUsernameValue(username)
    }, [username])

    const checkUsername = useCallback(
        debounce(async (username) => {
            if (user && username && username.length >= 3) {
                setError('')
                const record = await firestore.doc(`usernames/${username}`).get()
                const exists = record.data() && record.data().uid !== user.uid
                if(exists) setError('Username already taken')
                setIsValid(!exists)
                setLoading(false)
            }
        }, 500),
        []
    )

    return(
        <>
            <div className="container">
                <div className="card mb-32">
                    <label className="mb-8">Change your username</label>
                    <div>
                        <Input
                            placeholder="username"
                            theme="flat"
                            value={usernameValue || ''}
                            onChange={onChange}
                            onEnter={(isValid && !loading) ? onSubmit : false}
                        />
                        {loading && <Loader visible style={{ position: 'absolute', top: '12px', right: '16px'}}/>}
                    </div>
                    <small className="pt-8 error">{error}</small>
                </div>
            </div>
        </>
    )
}