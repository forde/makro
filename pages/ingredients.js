import { useState, useEffect } from 'react'
import Head from 'next/head'
import { FiEdit } from 'react-icons/fi'
import { Row, Col } from '~/components/grid'
import Modal from '~/components/Modal'
import Button from '~/components/Button'
import Input from '~/components/Input'
import IngredientForm from '~/components/IngredientForm'
import { firestore } from '~/lib/firebase'
import IngredientMacro from '~/components/IngredientMacro'

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
                <Row className="mb-32">
                    <Col width={[9,9,12]}>
                        <Input
                            placeholder="Szukaj"
                            onChange={setQuery}
                            value={query}
                        />
                    </Col>
                    <Col width={[3,3,12]}>
                        <Button className="w-100"onClick={() => setFormVisible(true)}>Nowy składnik</Button>
                    </Col>
                </Row>

                {ingredients.filter(matchSearch).map(ing => {
                    return(
                        <div key={ing.uid} className="card mb-24 p-24">
                            <h3 className="title mb-8 bold">{ing.name}</h3>
                            <IngredientMacro ingredient={ing} />
                            <FiEdit
                                onClick={() => {
                                    setEditedIngredient(ing)
                                    setFormVisible(true)
                                }}
                                className="icon-m absolute center-y clickable"
                                style={{right:'24px'}}
                            />
                        </div>
                    )
                })}
                <Button className="w-100"onClick={() => setFormVisible(true)}>Nowy składnik</Button>
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