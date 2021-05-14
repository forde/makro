import { useState, useEffect } from 'react'

import { Row, Col } from '~/components/grid'
import Input from '~/components/Input'
import Button from '~/components/Button'
import { firestore } from '~/lib/firebase'
import { toCamel } from '~/lib/helpers'

export default function IngredientForm ({ onSaved, ingredient }) {

    const [ data, setData ] = useState(ingredient || {
        name: '',
        makro: { carbs: 0, energy: 0, fat: 0, protein: 0, sugar: 0 },
        makroIn: '100',
        makroInUnit: 'g'
    })

    const set = (key, val) => {
        setData({ ...data, [key]: val })
    }

    const submit = async () => {
        const id = data.uid || toCamel(data.name)
        await firestore.collection('ingredients').doc(id).set(data)
        onSaved()
    }

    return(
        <div>

            <Row className="mb-16">
                <Col width={7.2}>
                    <label className="mb-8">Ingredient name</label>
                    <Input placeholder="Name" theme="flat" value={data.name} onChange={val => set('name', val)} />
                </Col>
                <Col width={2.4}>
                <label className="mb-8">In</label>
                    <Input placeholder="In" theme="flat" value={data.makroIn} onChange={val => set('makroIn', val)} />
                </Col>
                <Col width={2.4}>
                    <label className="mb-8">Unit</label>
                    <Input placeholder="Unit" theme="flat" value={data.makroInUnit} onChange={val => set('makroInUnit', val)} />
                </Col>
            </Row>
            <Row className="mb-16">
                <Col width={2.4}>
                    <label className="mb-8">Carbs</label>
                    <Input type="number" placeholder="Carbs" theme="flat" value={data.makro.carbs} onChange={val => set('makro', {...data.makro, carbs: val})} />
                </Col>
                <Col width={2.4}>
                    <label className="mb-8">Energy</label>
                    <Input type="number" placeholder="Energy" theme="flat" value={data.makro.energy} onChange={val => set('makro', {...data.makro, energy: val})} />
                </Col>
                <Col width={2.4}>
                    <label className="mb-8">Fat</label>
                    <Input type="number" placeholder="Fat" theme="flat" value={data.makro.fat} onChange={val => set('makro', {...data.makro, fat: val})} />
                </Col>
                <Col width={2.4}>
                    <label className="mb-8">Protein</label>
                    <Input type="number" placeholder="Protein" theme="flat" value={data.makro.protein} onChange={val => set('makro', {...data.makro, protein: val})} />
                </Col>
                <Col width={2.4}>
                    <label className="mb-8">Sugar</label>
                    <Input type="number" placeholder="Sugar" theme="flat" value={data.makro.sugar} onChange={val => set('makro', {...data.makro, sugar: val})} />
                </Col>
            </Row>
            <Button style={{width:'100%'}} onClick={submit}>{data.uid ? 'Save changes' : 'Add'}</Button>
        </div>
    )
}