import { getUserByUsername, docToJson } from '~lib/firebase'

import UsernameForm from '~/components/UsernameForm'
import RecepieFeed from '~/components/RecepieFeed'
import Button from '~/components/Button'
import Metatags from '~/components/Metatags'
import { auth } from '~/lib/firebase'
import { goTo } from '~/lib/helpers'

export default function Profile({ user, recipes }) {

    const signOut = async () => {
        await auth.signOut()
        goTo('/')
    }

    if(!user) return null

    if(!user.username) return <UsernameForm/>

    return(
        <>
            <Metatags />
            <div className="container">
                <RecepieFeed recipes={recipes} />
                <Button onClick={signOut}>Sign out</Button>
            </div>
        </>
    )
}

export async function getServerSideProps({ query }) {
    const { username } = query

    const userDoc = await getUserByUsername(username)

    if(!userDoc) return { notFound: true }

    // JSON serializable data
    let user = null;
    let recipes = null;

    if (userDoc) {
        user = userDoc.data();
        const recipesQuery = userDoc.ref
            .collection('recipes')
            .where('published', '==', true)
            .orderBy('createdAt', 'desc')
            .limit(5);
        recipes = (await recipesQuery.get()).docs.map(docToJson)
    }

    return {
        props: { user, recipes }, // will be passed to the page component as props
    }
}