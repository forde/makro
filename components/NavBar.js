import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { styled } from '@stitches/react'
import { useRouter } from 'next/router'
import { colors } from '~/styles'
import { auth, googleAuthProvider } from '~/lib/firebase'
import { UserContext } from '~/lib/context'
import { goTo } from '~/lib/helpers'

export default function NavBar({ }) {

    const { user, username, weight } = useContext(UserContext)

    const router = useRouter()

    useEffect(() => {
        if(!username && user && router.asPath !== '/username') goTo('/username')
    }, [router.asPath, user])

    const signIn = async () => {
        await auth.signInWithPopup(googleAuthProvider)
    }

    const signOut = async () => {
        await auth.signOut()
        goTo('/')
    }

    return(
        <Wrapper className="pt-32 pb-48">
            <div className="container mb-32 flex-center-x">
                <Logo>
                    Moje <img className="clickable" onClick={() => goTo(`/`)} src="https://render.bitstrips.com/v2/cpanel/6972338-318685307_6-s4-v1.png?transparent=1&palette=1"/>Keto
                </Logo>

            </div>
            <Menu className="shadow">
                {!user && <li onClick={signIn}>Logowanie</li>}
                {user && [
                    //{ href: `/[username]`, as: `/${username}`, text: `${user.displayName.split(' ')[0]}` },
                    { href: `/[username]/new`, as: `/${username}/new`, text: `Nowy przepis` },
                    { href: `/ingredients`, as: `/ingredients`, text: `Składniki` },
                    { onClick: signOut, text: `Wyloguj` },
                ].map(l => <li
                    key={l.text}
                    className="clickable"
                    onClick={() => l.onClick ? l.onClick() : goTo(l.href, l.as)}
                >{l.text}</li>)}
            </Menu>
        </Wrapper>
    )
}

const Logo = styled('div', {
    fontSize: '32px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    color: colors.text,
    i: { marginRight: '8px' },
    img: {
        width: '100px',
    }
})

const Menu = styled('ul', {
    background: '#fff',
    borderRadius: '12px',
    margin: '0 auto',
    display: 'flex',
    width: 'fit-content',
    li: {
        padding: '12px 14px',
        cursor: 'pointer',
    }
})

const Wrapper = styled('nav', {

})