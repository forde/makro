import '~/styles/globals.css'
import { Toaster } from 'react-hot-toast'

import NavBar from '~/components/NavBar'
import { UserContext } from '~/lib/context'
import { useUserData } from '~/lib/hooks'

function App ({ Component, pageProps }) {

    const userData = useUserData()

    return (
        <UserContext.Provider value={userData}>
            <NavBar/>
            <Component {...pageProps} />
            <Toaster/>
        </UserContext.Provider>
    )
}

export default App