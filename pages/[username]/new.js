import Metatags from '~/components/Metatags'
import RecipeForm from '~/components/RecipeForm'

export default function NewRecipe() {
    return(
        <div className="pb-48">
            <Metatags />
            <RecipeForm />
        </div>
    )
}