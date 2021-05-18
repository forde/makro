import { truncate } from '~/lib/helpers'
import Link from 'next/link'

export default function RecipeFeed({ recipes, admin }) {
    return (recipes || []).map(rec => <RecipeItem recipe={rec} key={rec.slug} admin={admin} />)
}

function RecipeItem({ recipe, admin }) {
    return(
        <Link href={`/[username]/[slug]`} as={`/${recipe.username}/${recipe.slug}`}>
            <a>
                <div className="card mb-32">
                    <h3 className="bold mb-16">{recipe.title}</h3>
                    <p className="label">{truncate(recipe.content, 70)}</p>
                </div>
            </a>
        </Link>
    )
}