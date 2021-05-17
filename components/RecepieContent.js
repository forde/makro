import { useEffect } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import IngredientMacro from '~/components/IngredientMacro'

export default function RecepieContent({ recepie }) {

    const createdAt = typeof recepie?.createdAt === 'number' ? new Date(recepie.createdAt) : recepie.createdAt.toDate()
    console.log(recepie.ingredients);


    return(
        <>
            <div className="card p-16 mb-24">
                <Image src={recepie?.thumbnail} layout="responsive" width={760} height={570} />
            </div>

            <h1 className="bold mb-24">{recepie?.title}</h1>

            <small className="mb-32">
                <span className="mr-8">by <AuthorLink username={recepie.username}/></span>
                <span className="mr-8">on {dayjs(createdAt).format('DD-MM-YYYY HH:mm:ss')}</span>
                <span className="mr-8">{recepie?.category}</span>
                <span>❤️‍ {recepie?.heartCount}</span>
            </small>

            <h3 className="mb-24">Ingredients</h3>
            {/*(recepie?.ingredients || []).map((ing, i) => (
                <div key={i} className="flex-center-y h-100">
                    <div className="bold mb-8">{ing.ingredient.name}</div>
                    <IngredientMacro ingredient={ing.ingredient} ammount={ing.ammount} />
                </div>
            ))*/}

            <h3 className="mb-24">Preparation</h3>
            <ReactMarkdown>{recepie?.content}</ReactMarkdown>
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