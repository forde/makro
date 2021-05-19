import { truncate } from '~/lib/helpers'
import Link from 'next/link'
import Image from 'next/image'
import RecipeMakro from '~/components/RecipeMakro'

export default function RecipeFeed({ recipes, admin }) {
    return (recipes || []).map(rec => <RecipeItem recipe={rec} key={rec.slug} admin={admin} />)
}

function RecipeItem({ recipe, admin }) {
    return(
        <Link href={`/[username]/[slug]`} as={`/${recipe.username}/${recipe.slug}`}>
            <a>
                <div className="card p-16 mb-32">
                    <div className="br-10 oh mb-24">
                        <Image src={recipe?.thumbnail} layout="intrinsic" width={760} height={570} sizes={'760px'} />
                    </div>
                    <h1 className="bold mb-24">{recipe.title}</h1>
                    <RecipeMakro recipe={recipe} perPortion />
                </div>
            </a>
        </Link>
    )
}