import { useState } from 'react'

import RecepieFeed from '~/components/RecepieFeed'
import Loader from '~/components/Loader'
import Button from '~/components/Button'
import { firestore, fromMillis, docToJson } from '~/lib/firebase'

export default function Home(props) {

    const [recipes, setRecipes] = useState(props.recipes)
    const [loading, setLoading] = useState(false)

    const [recipesEnd, setRecipesEnd] = useState(false)

    const getMoreRecipes = async () => {
        setLoading(true)
        const last = recipes[recipes.length - 1]

        const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt

        const query = firestore
            .collectionGroup('recipes')
            .where('published', '==', true)
            .orderBy('createdAt', 'desc')
            .startAfter(cursor)
            .limit(LIMIT)

        const newRecipes = (await query.get()).docs.map((doc) => doc.data())

        setRecipes(recipes.concat(newRecipes))
        setLoading(false)

        if(!newRecipes.length) setRecipesEnd(true)
    }

    return(
        <>
            <div className="container">
                <RecepieFeed recipes={recipes} />

                <div className="flex-center">
                    {!loading && !recipesEnd && <Button onClick={getMoreRecipes}>Load more</Button>}
                    <Loader visible={loading} />
                    {recipesEnd && 'You have reached the end!'}
                </div>
            </div>
        </>
    )
}

// Max post to query per page
const LIMIT = 10

export async function getServerSideProps(context) {
    const recipesQuery = firestore
        .collectionGroup('recipes')
        .where('published', '==', true)
        .orderBy('createdAt', 'desc')
        .limit(LIMIT)

    const recipes = (await recipesQuery.get()).docs.map(docToJson)

    return {
        props: { recipes }, // will be passed to the page component as props
    }
}