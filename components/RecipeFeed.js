import { truncate } from '~/lib/helpers'
import Link from 'next/link'
import Image from 'next/image'
import RecipeMakro from '~/components/RecipeMakro'
import { imagekitUrl } from '~/lib/helpers'

export default function RecipeFeed({ recipes, admin }) {
    return (recipes || []).map(rec => <RecipeItem recipe={rec} key={rec.slug} admin={admin} />)
}

function RecipeItem({ recipe, admin }) {
    return(
        <Link href={`/[username]/[slug]`} as={`/${recipe.username}/${recipe.slug}`}>
            <a>
                <div className="card p-16 mb-32">
                    <div className="br-10 oh mb-24">
                        <img src={imagekitUrl(recipe?.thumbnail, 'tr=w-728')} />
                    </div>
                    <h1 className="bold mb-24 pl-16 pr-16">{recipe.title}</h1>
                    <RecipeMakro recipe={recipe} perPortion className="pl-16 pr-16"/>
                </div>
            </a>
        </Link>
    )
}