import { styled } from '@stitches/react'
import { percentOf } from '~/lib/helpers'

export default function IngredientMacro({ ingredient, ammount }) {

    const { energy, fat, carbs, protein, sugar } = ingredient.macro

    const ratio =  percentOf( Number(ammount), Number(ingredient.macroIn.replace(/\D/g,'')) )

    const valueInAmmount = x => !ratio ? x : parseInt((x * ratio ) / 100)

    return(
        <label>
            <Det>{valueInAmmount(energy)} Kcal</Det>
            <Det>|</Det>
            <Det>F: {valueInAmmount(fat)}g</Det>
            <Det>C: {valueInAmmount(carbs)}g</Det>
            <Det>P: {valueInAmmount(protein)}g</Det>
            <Det>S: {valueInAmmount(sugar)}g</Det>
            <Det>/</Det>
            <Det>{ingredient.macroIn} {ingredient.macroInDesc && `(${ingredient.macroInDesc})`}</Det>
        </label>
    )
}

const Det = styled('span', {
    marginRight: '8px',
})