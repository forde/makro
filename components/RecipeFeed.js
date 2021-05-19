import { truncate } from '~/lib/helpers'
import Link from 'next/link'
import Image from 'next/image'

export default function RecipeFeed({ recipes, admin }) {
    return (recipes || []).map(rec => <RecipeItem recipe={rec} key={rec.slug} admin={admin} />)
}

function RecipeItem({ recipe, admin }) {
    return(
        <Link href={`/[username]/[slug]`} as={`/${recipe.username}/${recipe.slug}`}>
            <a>
                <div className="card p-16 mb-32">
                    <div className="br-6 oh mb-24">
                        <Image src={recipe?.thumbnail} layout="intrinsic" width={760} height={570} sizes={'760px'} />
                    </div>
                    <h1 className="bold mb-16">{recipe.title}</h1>
                    <p className="label mb-8 content fw-400">{truncate(recipe.content, 150)}</p>
                </div>
            </a>
        </Link>
    )
}