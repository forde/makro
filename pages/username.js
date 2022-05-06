import UsernameForm from '~/components/UsernameForm'
import { useContext } from 'react'
import { UserContext } from '~/lib/context'

import { goTo } from '~/lib/helpers'

export default function Username() {

    const { user, username } = useContext(UserContext)

    if(!user || username) {
        goTo('/')
        return null
    }

    return <UsernameForm/>
}