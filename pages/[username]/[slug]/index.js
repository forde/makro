import { useEffect, useState } from 'react'
import { firestore, getUserByUsername, docToJson, getRecipeIngredients } from '~/lib/firebase'
import RecipeContent from '~/components/RecipeContent'
import { useDocumentData } from 'react-firebase-hooks/firestore'

export default function Recipe(props) {
    return (
        <div className="container pb-48">
            <RecipeContent recipe={props.recipe} />
        </div>
    )
}

export async function getStaticProps({ params }) {
    const { username, slug } = params
    const userDoc = await getUserByUsername(username)

    let recipe
    let path

    if(userDoc) {
        const recipeRef = userDoc.ref.collection('recipes').doc(slug)
        recipe = await docToJson(await recipeRef.get())

        //get ingredients
        recipe.ingredients = await getRecipeIngredients(recipe)

        path = recipeRef.path
    }

    return {
        props: { recipe, path },
        revalidate: 5000,
    }
}

export async function getStaticPaths() {
    // Improve my using Admin SDK to select empty docs
    const snapshot = await firestore.collectionGroup('recipes').get()

    const paths = snapshot.docs.map((doc) => {
        const { slug, username } = doc.data()
        return {
            params: { username, slug },
        }
    })

    return {
        paths,
        fallback: 'blocking',
    }
}