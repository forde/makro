import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '~/styles/Home.module.css'
import { styled } from '@stitches/react'
import { FiEdit } from 'react-icons/fi'

import { Row, Col } from '~/components/grid'
import Modal from '~/components/Modal'
import Button from '~/components/Button'
import Input from '~/components/Input'
import IngredientForm from '~/components/IngredientForm'
import { firestore } from '~/lib/firebase'

export default function Ingredients() {

    const [ formVisible, setFormVisible ] = useState(false)
    const [ ingredients, setIngredients ] = useState([])
    const [ editedIngredient, setEditedIngredient ] = useState(null)
    const [ query, setQuery ] = useState('')

    useEffect(() => {
        firestore.collection('ingredients').onSnapshot(snap => {
            let data = []
            snap.forEach((doc) => data.push({...doc.data(), uid: doc.id}) )
            setIngredients(data)
        })
    }, [])

    const closeForm = () => {
        setEditedIngredient(null)
        setFormVisible(null)
    }

    const matchSearch = ing => {
        const q = query.trim().toLowerCase()
        return !q ? true : ~ing.name.toLowerCase().indexOf(q)
    }

    return(
        <>
            <div className="container pb-48">
                <Input
                    placeholder="Search"
                    onChange={setQuery}
                    value={query}
                    className="mb-32"
                />
                {ingredients.filter(matchSearch).map(ing => {
                    return(
                        <div key={ing.uid} className="card mb-24 p-24">
                            <h3 className="title mb-8 bold">{ing.name}</h3>
                            <label>
                                <Det>Energy: {ing.macro.energy}g</Det>
                                <Det>Fat: {ing.macro.fat}g</Det>
                                <Det>Carbs: {ing.macro.carbs}g</Det>
                                <Det>Sugar: {ing.macro.sugar}g</Det>
                                <Det>Protein: {ing.macro.protein}g</Det>
                                <Det>/</Det>
                                <Det>{ing.macroIn} {ing.macroInDesc && `(${ing.macroInDesc})`}</Det>
                            </label>
                            <FiEdit
                                onClick={() => {
                                    setEditedIngredient(ing)
                                    setFormVisible(true)
                                }}
                                className="icon-l absolute center-y clickable"
                                style={{right:'24px'}}
                            />
                        </div>
                    )
                })}
                <Button onClick={() => setFormVisible(true)}>Add ingredient</Button>
                {formVisible &&
                    <Modal onCloseRequest={closeForm}>
                        <IngredientForm
                            ingredient={editedIngredient}
                            onSaved={closeForm}
                        />
                    </Modal>
                }
            </div>
        </>
    )
}

const Det = styled('span', {
    marginRight: '8px',
})