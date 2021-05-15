import { getUserByUsername, docToJson } from '~lib/firebase'

import UsernameForm from '~/components/UsernameForm'
import RecepieFeed from '~/components/RecepieFeed'
import Button from '~/components/Button'
import { auth } from '~/lib/firebase'
import { goTo } from '~/lib/helpers'

export default function Profile({ user, recepies }) {

    const signOut = async () => {
        await auth.signOut()
        goTo('/')
    }

    if(!user) return null

    if(!user.username) return <UsernameForm/>

    return(
        <>
            <div className="container">
                <RecepieFeed recepies={recepies} />
                <Button onClick={signOut}>Sign out</Button>
            </div>
        </>
    )
}

export async function getServerSideProps({ query }) {
    const { username } = query

    const userDoc = await getUserByUsername(username);

    // JSON serializable data
    let user = null;
    let recepies = null;

    if (userDoc) {
        user = userDoc.data();
        const recepiesQuery = userDoc.ref
            .collection('recepies')
            .where('published', '==', true)
            .orderBy('createdAt', 'desc')
            .limit(5);
        recepies = (await recepiesQuery.get()).docs.map(docToJson);
    }

    return {
        props: { user, recepies }, // will be passed to the page component as props
    }
}