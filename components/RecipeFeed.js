import Link from 'next/link'
import RecipeMakro from '~/components/RecipeMakro'
import { imagekitUrl } from '~/lib/helpers'
import { styled } from '@stitches/react'

export default function RecipeFeed({ recipes, admin }) {
    return (
        <Wrapper>
            {(recipes || []).map(rec => <RecipeItem recipe={rec} key={rec.slug} admin={admin} />)}
        </Wrapper>
    )
}

function RecipeItem({ recipe, admin }) {
    return(
        <Link href={`/[username]/[slug]`} as={`/${recipe.username}/${recipe.slug}`}>
            <a>
                <div className="card pl-16 pr-16 pt-16">
                    <div className="br-10 oh mb-24">
                        <img src={imagekitUrl(recipe?.thumbnail, 'tr=w-728')} />
                    </div>
                    <h2 className="bold mb-24">{recipe.title}</h2>
                    <RecipeMakro recipe={recipe} perPortion justIcons />
                </div>
            </a>
        </Link>
    )
}

const Wrapper = styled('div', {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '-10px',
    marginRight: '-10px',
    '> a': {
        width: 'calc(50% - 20px)',
        margin: '0 10px 20px 10px'
    },
    '.card': {
        paddingBottom: '8px'
    },
    '@media(max-width: 767px)': {
        marginLeft: '0px',
        marginRight: '0px',
        '> a': {
            width: '100%',
            margin: '0 0 20px 0'
        },
    }
})