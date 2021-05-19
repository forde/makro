import Link from 'next/link'
import { useContext } from 'react'
import { styled } from '@stitches/react'
import { useRouter } from 'next/router'
import { colors } from '~/styles'
import { auth, googleAuthProvider } from '~/lib/firebase'
import { UserContext } from '~/lib/context'
import { goTo } from '~/lib/helpers'

export default function NavBar({ }) {

    const { user, username } = useContext(UserContext)

    const router = useRouter()

    const signIn = async () => {
        await auth.signInWithPopup(googleAuthProvider)
    }

    const onMeClick = () => {
        if(!user) return signIn()
        if(router.pathname !== '/[username]') return goTo(`/[username]`, `/${username}`)
        goTo(`/`)
    }

    return(
        <Wrapper>
            <div className="container pt-32 pb-32 mb-32 flex-center-x">
                <Logo>
                    Moje <img className="ml-16 mr-16 clickable" onClick={onMeClick} src="https://vercel.com/api/www/avatar/a45cb6ebfdd9fc6ebc17d076e57ef82d9d2bb970?s=60"/>Keto
                </Logo>
            </div>
        </Wrapper>
    )
}

const Logo = styled('div', {
    fontSize: '32px',
    fontWeight: 'bold',
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    color: colors.text,
    i: { marginRight: '8px' }
})

const Wrapper = styled('nav', {

})