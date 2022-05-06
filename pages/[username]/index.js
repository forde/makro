import { getUserByUsername, docToJson } from '~lib/firebase'
import Link from 'next/link'
import UsernameForm from '~/components/UsernameForm'
import RecipeFeed from '~/components/RecipeFeed'
import Button from '~/components/Button'
import Metatags from '~/components/Metatags'
import { Row, Col } from '~/components/grid'
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
            <div className="container pt-24 pb-48">
                <Row>
                    <Col width={[4,4,12]}>
                        <a className="card block flex-center" onClick={() => goTo(`/[username]/new`, `/${user.username}/new`)}>
                            <i className="icon-xxl mb-24">🥘</i>
                            <strong>Nowy przepis</strong>
                        </a>
                    </Col>
                    <Col width={[4,4,12]}>
                        <a className="card block flex-center" onClick={() => goTo(`/ingredients`)}>
                            <i className="icon-xxl mb-24">🧀</i>
                            <strong>Składniki</strong>
                        </a>
                    </Col>
                    <Col width={[4,4,12]}>
                        <a className="card block flex-center" onClick={() => signOut()}>
                            <i className="icon-xxl mb-24">👋🏼</i>
                            <strong>Wyloguj</strong>
                        </a>
                    </Col>
                </Row>
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
        user = userDoc.data()
        /*const recipesQuery = userDoc.ref
            .collection('recipes')
            .where('published', '==', true)
            .orderBy('createdAt', 'desc')
            .limit(5);
        recipes = await Promise.all((await recipesQuery.get()).docs.map(docToJson))*/
    }

    return {
        props: {
            user,
            //recipes
        }
    }
}