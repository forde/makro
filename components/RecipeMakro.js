import { styled } from '@stitches/react'

export default function RecipeMakro({ recipe, perPortion, ...rest }) {

    const { energy, fat, carbs, sugar, protein } = recipe.macro

    const val = v => perPortion ? parseInt(v / recipe.portions) : v

    return(
        <div {...rest}>
            <MetaDetail><i>🔥</i>Kcal <strong className="ml-8">{val(energy)}</strong></MetaDetail>
            <MetaDetail><i>🥓</i>Tłuszcz <strong className="ml-8">{val(fat)}</strong></MetaDetail>
            <MetaDetail><i>🍞</i>Węgle <strong className="ml-8">{val(carbs)}</strong></MetaDetail>
            <MetaDetail><i>🍭</i>Cukier <strong className="ml-8">{val(sugar)}</strong></MetaDetail>
            <MetaDetail><i>🍖</i>Białko <strong className="ml-8">{val(protein)}</strong></MetaDetail>
        </div>
    )
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