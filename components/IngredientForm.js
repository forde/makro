import { useState, useEffect } from 'react'

import { Row, Col } from '~/components/grid'
import Input from '~/components/Input'
import Button from '~/components/Button'
import { firestore } from '~/lib/firebase'
import kebabCase from 'lodash.kebabcase'

export default function IngredientForm ({ onSaved, ingredient }) {

    const [ data, setData ] = useState(ingredient || {
        name: '',
        description: '',
        macro: { carbs: 0, energy: 0, fat: 0, protein: 0, sugar: 0 },
        macroIn: '100g',
        macroInDesc: ''
    })

    const set = (key, val) => {
        setData({ ...data, [key]: val })
    }

    const submit = async () => {
        const id = data.uid || kebabCase(data.name)
        await firestore.collection('ingredients').doc(id).set(data)
        onSaved({...data, uid: id})
    }

    const remove = async () => {
        await firestore.collection('ingredients').doc(data.uid).delete()
        onSaved(data)
    }

    return(
        <div>

            <Row className="mb-16">
                <Col width={4.8}>
                    <label className="mb-8">Name</label>
                    <Input placeholder="Name" theme="flat" value={data.name} onChange={val => set('name', val)} />
                </Col>
                <Col width={7.2}>
                    <label className="mb-8">Description</label>
                    <Input placeholder="Description" theme="flat" value={data.description} onChange={val => set('description', val)} />
                </Col>
            </Row>
            <Row className="mb-16">
                <Col width={4.8}>
                    <label className="mb-8">In</label>
                    <Input placeholder="In" theme="flat" value={data.macroIn} onChange={val => set('macroIn', val)} />
                </Col>
                <Col width={7.2}>
                    <label className="mb-8">In - details / alt</label>
                    <Input placeholder="Spoon, cup, etc." theme="flat" value={data.macroInDesc} onChange={val => set('macroInDesc', val)} />
                </Col>
            </Row>
            <Row className="mb-16">
                <Col width={2.4}>
                    <label className="mb-8">Energy</label>
                    <Input type="number" placeholder="Energy" theme="flat" value={data.macro.energy} onChange={val => set('macro', {...data.macro, energy: val})} />
                </Col>
                <Col width={2.4}>
                    <label className="mb-8">Fat</label>
                    <Input type="number" placeholder="Fat" theme="flat" value={data.macro.fat} onChange={val => set('macro', {...data.macro, fat: val})} />
                </Col>
                <Col width={2.4}>
                    <label className="mb-8">Carbs</label>
                    <Input type="number" placeholder="Carbs" theme="flat" value={data.macro.carbs} onChange={val => set('macro', {...data.macro, carbs: val})} />
                </Col>
                <Col width={2.4}>
                    <label className="mb-8">Sugar</label>
                    <Input type="number" placeholder="Sugar" theme="flat" value={data.macro.sugar} onChange={val => set('macro', {...data.macro, sugar: val})} />
                </Col>
                <Col width={2.4}>
                    <label className="mb-8">Protein</label>
                    <Input type="number" placeholder="Protein" theme="flat" value={data.macro.protein} onChange={val => set('macro', {...data.macro, protein: val})} />
                </Col>
            </Row>
            <Button style={{width:'100%'}} onClick={submit}>{data.uid ? 'Save changes' : 'Add'}</Button>
            {data.uid && <Button style={{width:'100%', marginTop: '16px'}} theme="tertiary" onClick={remove}>Delete</Button>}
        </div>
    )
}