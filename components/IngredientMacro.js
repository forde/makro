import { styled } from '@stitches/react'

export default function IngredientMacro({ ingredient }) {
    return(
        <label>
            <Det>{ingredient.macro.energy} Kcal</Det>
            <Det>|</Det>
            <Det>F: {ingredient.macro.fat}g</Det>
            <Det>C: {ingredient.macro.carbs}g</Det>
            <Det>P: {ingredient.macro.protein}g</Det>
            <Det>S: {ingredient.macro.sugar}g</Det>
            <Det>/</Det>
            <Det>{ingredient.macroIn} {ingredient.macroInDesc && `(${ingredient.macroInDesc})`}</Det>
        </label>
    )
}

const Det = styled('span', {
    marginRight: '8px',
})