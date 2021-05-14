import Link from 'next/link'
import { useContext } from 'react'
import { styled } from '@stitches/react'

import { colors } from '~/styles'
import { auth, googleAuthProvider } from '~/lib/firebase'
import { UserContext } from '~/lib/context'

export default function NavBar({ }) {

    const { user, username } = useContext(UserContext)

    const signIn = async () => {
        await auth.signInWithPopup(googleAuthProvider)
    }

    return(
        <Component>
            <div className="container">
                <Link href="/">
                    <a>
                        <Logo>
                            <i className="icon-l">🔥</i> Home
                        </Logo>
                    </a>
                </Link>
                <ul>
                    {!user &&
                        <li>
                            <a onClick={signIn}>Sign in</a>
                        </li>
                    }
                    {user &&
                        <>
                            <li>
                                <Link href="/ingredients">
                                    <a>Ingredients</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile">
                                    <a>
                                        <img className="avatar" src={user.photoURL} />
                                    </a>
                                </Link>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </Component>
    )
}

const Logo = styled('div', {
    fontSize: '22px',
    fontWeight: 'bold',
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    color: colors.text,
    i: { marginRight: '8px' }
})

const Component = styled('nav', {
    '.container': {
        padding: '32px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    '.sign-in': {
        cursor: 'pointer'
    },
    'ul': {
        display: 'flex',
        alignItems: 'center',
        li: {
            marginLeft: '16px'
        }
    },
    '.avatar': {
        width: '36px',
        height: '36px',
        borderRadius: '100%'
    }
})