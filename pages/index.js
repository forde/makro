import { useState } from 'react'

import RecepieFeed from '~/components/RecepieFeed'
import Loader from '~/components/Loader'
import Button from '~/components/Button'
import { firestore, fromMillis, docToJson } from '~/lib/firebase'

export default function Home(props) {

    const [recepies, setRecepies] = useState(props.recepies)
    const [loading, setLoading] = useState(false)

    const [recepiesEnd, setRecepiesEnd] = useState(false)

    const getMoreRecepies = async () => {
        setLoading(true)
        const last = recepies[recepies.length - 1]

        const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt

        const query = firestore
            .collectionGroup('recepies')
            .where('published', '==', true)
            .orderBy('createdAt', 'desc')
            .startAfter(cursor)
            .limit(LIMIT)

        const newRecepies = (await query.get()).docs.map((doc) => doc.data())

        setRecepies(recepies.concat(newRecepies))
        setLoading(false)

        if(!newRecepies.length) setRecepiesEnd(true)
    }

    return(
        <>
            <div className="container">
                <RecepieFeed recepies={recepies} />

                <div className="flex-center">
                    {!loading && !recepiesEnd && <Button onClick={getMoreRecepies}>Load more</Button>}
                    <Loader visible={loading} />
                    {recepiesEnd && 'You have reached the end!'}
                </div>
            </div>
        </>
    )
}

// Max post to query per page
const LIMIT = 10

export async function getServerSideProps(context) {
    const recepiesQuery = firestore
        .collectionGroup('recepies')
        .where('published', '==', true)
        .orderBy('createdAt', 'desc')
        .limit(LIMIT)

    const recepies = (await recepiesQuery.get()).docs.map(docToJson)

    return {
        props: { recepies }, // will be passed to the page component as props
    }
}