import { useContext } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import IngredientMacro from '~/components/IngredientMacro'
import { UserContext } from '~/lib/context'
import { styled } from '@stitches/react'
import { percentOf } from '~/lib/helpers'

export default function RecipeContent({ recipe }) {

    const createdAt = typeof recipe?.createdAt === 'number' ? new Date(recipe.createdAt) : recipe.createdAt.toDate()

    const makro = (recipe?.ingredients || []).reduce((acc, ing) => {
        const ratio =  percentOf( Number(ing.ammount), Number(ing.macroIn.replace(/\D/g,'')) )
        const valueInAmmount = x => !ratio ? x : parseInt((x * ratio ) / 100)
        return {
            fat: acc.fat + valueInAmmount(ing.macro.fat),
            carbs: acc.carbs + valueInAmmount(ing.macro.carbs),
            sugar: acc.sugar + valueInAmmount(ing.macro.sugar),
            protein: acc.protein + valueInAmmount(ing.macro.protein),
            energy: acc.energy + valueInAmmount(ing.macro.energy),
        }
    }, { fat: 0, carbs: 0, sugar: 0, protein: 0, energy: 0 })


    const recipeMakro = (portions=1) => {

        const perPortion = val => parseInt(val / portions)

        return(
            <div className="mb-32">
                <MetaDetail><i>🔥</i>Kcal <strong className="ml-8">{perPortion(makro.energy)}</strong></MetaDetail>
                <MetaDetail><i>🥓</i>Tłuszcz <strong className="ml-8">{perPortion(makro.fat)}</strong></MetaDetail>
                <MetaDetail><i>🍞</i>Węgle <strong className="ml-8">{perPortion(makro.carbs)}</strong></MetaDetail>
                <MetaDetail><i>🍭</i>Cukier <strong className="ml-8">{perPortion(makro.sugar)}</strong></MetaDetail>
                <MetaDetail><i>🍖</i>Białko <strong className="ml-8">{perPortion(makro.protein)}</strong></MetaDetail>
            </div>
        )
    }

    return(
        <div className="card mb-48 p-16">

            <div className="br-10 oh mb-16">
                <Image src={recipe?.thumbnail} layout="intrinsic" width={760} height={570} sizes={'760px'} />
            </div>

            <div className="p-16">
                <h1 className="bold mb-24 ">{recipe?.title}</h1>

                <div className="mb-32">
                    <MetaDetail><i>👨🏼‍🍳</i><AuthorLink recipe={recipe}/></MetaDetail>
                    <MetaDetail><i>📆 </i>{dayjs(createdAt).format('DD-MM-YYYY')}</MetaDetail>
                    <MetaDetail><i>🥘 </i>{recipe?.category}</MetaDetail>
                    <MetaDetail><i>🥣</i>{recipe?.portions} </MetaDetail>
                    <MetaDetail><i>❤️‍ </i>{recipe?.heartCount}</MetaDetail>
                    <MetaDetail><i>⚙️ </i><EditLink recipe={recipe}/></MetaDetail>
                </div>

                <h2 className="mb-24">Składniki</h2>
                <div className="mb-48">
                    {(recipe?.ingredients || []).map((ing, i) => (
                        <div key={i} className="mb-16">
                            <div className="bold mb-8">
                                {ing.name} -
                                {` ${ing.ammount}`}{ing?.macroIn?.replace(/\d/g,'')}
                                {ing.ammountDesc ? ` (${ing.ammountDesc})` : null}
                            </div>
                            <IngredientMacro ingredient={ing} />
                        </div>
                    ))}
                </div>

                <h2 className="mb-24">Przygotowanie</h2>
                <ReactMarkdown className="content mb-48">{recipe?.content}</ReactMarkdown>

                <h2 className="mb-24">Makro (całość)</h2>
                {recipeMakro()}

                <h2 className="mb-24">Makro (1 porcja)</h2>
                {recipeMakro(Number(recipe?.portions))}

            </div>
        </div>
    )
}

function AuthorLink({ recipe }) {
    return(
        <Link href={`/[username]`} as={`/${recipe?.username}`}>
            <a className="accent">@{recipe?.username}</a>
        </Link>
    )
}

function EditLink({ recipe }) {
    const { username } = useContext(UserContext)

    if(username && recipe?.username === username) return(
        <Link href={`/[username]/[slug]/edit`} as={`/${username}/${recipe?.slug}/edit`}>
            <a className="accent">edit</a>
        </Link>
    )
    return null
}

const MetaDetail = styled('div', {
    padding: '6px 12px',
    borderRadius: '40px',
    background: '#eef0f1',
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '14px',
    marginRight: '12px',
    marginBottom: '12px',
    'i': {
        fontSize: '20px',
        marginRight: '12px',
    }
})