import { useState, useEffect } from 'react'
import Metatags from '~/components/Metatags'
import RecipeForm from '~/components/RecipeForm'
import Router from 'next/router'
import { getUserByUsername, docToJson, getRecipeIngredients } from '~/lib/firebase'

export default function EditRecipe({ recipe }) {
    return(
        <div className="pb-48">
            <Metatags />
            {recipe && <RecipeForm recipe={recipe} />}
        </div>
    )
}

export async function getServerSideProps({ query }) {

    const { username, slug } = query

    const userDoc = await getUserByUsername(username)
    const recipeRef = userDoc.ref.collection('recipes').doc(slug)
    const recipe = await docToJson(await recipeRef.get())
    recipe.ingredients = await getRecipeIngredients(recipe)

    return {
        props: {
            recipe
        }
    }
}