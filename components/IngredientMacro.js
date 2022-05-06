import { styled } from '@stitches/react'
import { percentOf } from '~/lib/helpers'

export default function IngredientMacro({ ingredient, className }) {

    if(!ingredient?.macro) return null

    const { energy, fat, carbs, protein, sugar } = ingredient.macro || {}

    const ratio =  percentOf( Number(ingredient.ammount), Number(ingredient.macroIn.replace(/\D/g,'')) )

    const valueInAmmount = x => !ratio ? x : parseInt((x * ratio ) / 100)

    const per = () => {
        if(!ingredient.ammount) return ingredient.macroIn

        return ingredient.ammount+ingredient.macroIn.replace(/\d/g,'')
    }

    const desc = () => {
        if(ingredient.ammountDesc) return `(${ingredient.ammountDesc})`
        if(ingredient.macroInDesc) return `(${ingredient.macroInDesc})`
        return null
    }

    return(
        <label className={className}>
            <Det>{valueInAmmount(energy)} Kcal</Det>
            <Det>|</Det>
            <Det>T: {valueInAmmount(fat)}g</Det>
            <Det>W: {valueInAmmount(carbs)}g</Det>
            <Det>C: {valueInAmmount(sugar)}g</Det>
            <Det>B: {valueInAmmount(protein)}g</Det>
            <Det>/</Det>
            <Det>{per()} {desc()}</Det>
        </label>
    )
}

const Det = styled('span', {
    marginRight: '8px',
    lineHeight: '1.4'
})