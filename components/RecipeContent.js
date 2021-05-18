import { useEffect } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import IngredientMacro from '~/components/IngredientMacro'

export default function RecipeContent({ recipe }) {

    const createdAt = typeof recipe?.createdAt === 'number' ? new Date(recipe.createdAt) : recipe.createdAt.toDate()

    return(
        <>
            <div className="card p-16 mb-24">
                <Image src={recipe?.thumbnail} layout="responsive" width={760} height={570} />
            </div>

            <h1 className="bold mb-24">{recipe?.title}</h1>

            <small className="mb-32">
                <span className="mr-8">by <AuthorLink username={recipe.username}/></span>
                <span className="mr-8">on {dayjs(createdAt).format('DD-MM-YYYY HH:mm:ss')}</span>
                <span className="mr-8">{recipe?.category}</span>
                <span>❤️‍ {recipe?.heartCount}</span>
            </small>

            <h3 className="mb-24">Ingredients</h3>
            <div className="mb-24">
                {(recipe?.ingredients || []).map((ing, i) => (
                    <div key={i} className="mb-16">
                        <div className="bold mb-8">{ing.name} - {ing.ammount}{ing?.macroIn?.replace(/\d/g,'')}</div>
                        <IngredientMacro ingredient={ing} ammount={ing.ammount} />
                    </div>
                ))}
            </div>

            <h3 className="mb-24">Preparation</h3>
            <ReactMarkdown>{recipe?.content}</ReactMarkdown>
        </>
    )
}

function AuthorLink({ username }) {
    return(
        <Link href={`/[username]`} as={`/${username}`}>
            <a className="purple">@{username}</a>
        </Link>
    )
}