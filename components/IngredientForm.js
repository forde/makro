import { useState, useContext } from 'react'

import { Row, Col } from '~/components/grid'
import Input from '~/components/Input'
import Button from '~/components/Button'
import { firestore } from '~/lib/firebase'
import kebabCase from 'lodash.kebabcase'
import { UserContext } from '~/lib/context'

export default function IngredientForm ({ onSaved, ingredient }) {

    const { username } = useContext(UserContext)

    const [ data, setData ] = useState(ingredient || {
        name: '',
        description: '',
        macro: { carbs: 0, energy: 0, fat: 0, protein: 0, sugar: 0 },
        macroIn: '100g',
        macroInDesc: '',
        username,
    })

    const set = (key, val) => {
        setData({ ...data, [key]: val })
    }

    const submit = async () => {

        if(username !== 'forde') return alert('Only admins can do that for now. Sorry...')

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
                    <label className="mb-8">Nazwa</label>
                    <Input placeholder="Nazwa" theme="flat" value={data.name} onChange={val => set('name', val)} />
                </Col>
                <Col width={7.2}>
                    <label className="mb-8">Opis</label>
                    <Input placeholder="Opis" theme="flat" value={data.description} onChange={val => set('description', val)} />
                </Col>
            </Row>
            <Row className="mb-16">
                <Col width={4.8}>
                    <label className="mb-8">W</label>
                    <Input placeholder="W" theme="flat" value={data.macroIn} onChange={val => set('macroIn', val)} />
                </Col>
                <Col width={7.2}>
                    <label className="mb-8">W - szczeg????y</label>
                    <Input placeholder="??y??ka / szklanka itd." theme="flat" value={data.macroInDesc} onChange={val => set('macroInDesc', val)} />
                </Col>
            </Row>
            <Row className="mb-16">
                <Col width={2.4}>
                    <label className="mb-8">Kalorie</label>
                    <Input type="number" placeholder="Kalorie" theme="flat" value={data.macro.energy} onChange={val => set('macro', {...data.macro, energy: val})} />
                </Col>
                <Col width={2.4}>
                    <label className="mb-8">T??uszcz</label>
                    <Input type="number" placeholder="T??uszcz" theme="flat" value={data.macro.fat} onChange={val => set('macro', {...data.macro, fat: val})} />
                </Col>
                <Col width={2.4}>
                    <label className="mb-8">W??gle</label>
                    <Input type="number" placeholder="W??gle" theme="flat" value={data.macro.carbs} onChange={val => set('macro', {...data.macro, carbs: val})} />
                </Col>
                <Col width={2.4}>
                    <label className="mb-8">Cukier</label>
                    <Input type="number" placeholder="Cukier" theme="flat" value={data.macro.sugar} onChange={val => set('macro', {...data.macro, sugar: val})} />
                </Col>
                <Col width={2.4}>
                    <label className="mb-8">Bia??ko</label>
                    <Input type="number" placeholder="Bia??ko" theme="flat" value={data.macro.protein} onChange={val => set('macro', {...data.macro, protein: val})} />
                </Col>
            </Row>
            <Button style={{width:'100%'}} onClick={submit}>{data.uid ? 'Zapisz' : 'Dodaj'}</Button>
            {data.uid && <Button style={{width:'100%', marginTop: '16px'}} theme="white" onClick={remove}>Usu??</Button>}
        </div>
    )
}