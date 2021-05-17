import { useEffect, useState, useRef, useCallback, useContext } from 'react'
import Input from '~/components/Input'
import { firestore } from '~/lib/firebase'
import { styled } from '@stitches/react'
import IngredientMacro from '~/components/IngredientMacro'
import { onClickOutside } from '~/lib/helpers'
import IngredientForm from '~/components/IngredientForm'
import Modal from '~/components/Modal'

export default function IngredientFinder({ onIngredientSelected, ...rest }) {

    const [ query, setQuery ] = useState('')
    const [ ingredients, setIngredients ] = useState([])
    const [ formVisible, setFormVisible ] = useState(false)

    useEffect(() => {
        firestore.collection('ingredients').onSnapshot(snap => {
            let data = []
            snap.forEach((doc) => data.push({...doc.data(), uid: doc.id}) )
            setIngredients(data)
        })
    }, [])

    const matchSearch = ing => {
        const q = query.trim().toLowerCase()
        return !q ? false : ~`${ing.name.toLowerCase()} ${ing.description.toLowerCase()}`.indexOf(q)
    }

    const finderRef = useRef(null)

    onClickOutside(finderRef, () => {
        setQuery('')
    })

    const results = ingredients.filter(matchSearch).filter((r,i) => i < 5)

    return(
        <div ref={finderRef} {...rest} >
            <Input
                placeholder="Search for ingredients"
                value={query}
                onChange={setQuery}
            />
            <Results className="card">
                {!!query.length &&
                    <>
                        {results.map(res => <div key={res.uid} onClick={() => {
                            onIngredientSelected(res)
                            setQuery('')
                        }}>
                            <div className="bold mb-8">{res.name}</div>
                            <IngredientMacro ingredient={res} />
                        </div>)}
                        <div className="bold purple" onClick={() => setFormVisible(true)}>
                            <div>Add ingredient</div>
                        </div>
                    </>
                }
            </Results>
            {formVisible &&
                <Modal onCloseRequest={() => setFormVisible(false)}>
                    <IngredientForm
                        onSaved={ing => {
                            onIngredientSelected(ing)
                            setFormVisible(false)
                            setQuery('')
                        }}
                    />
                </Modal>
            }
        </div>
    )
}

const Results = styled('div', {
    padding: '0px!important',
    position: 'absolute',
    top: 'calc(100% + 16px)',
    width: '100%',
    overflow: 'fidden',
    zIndex: '100',
    '>div': {
        padding: '8px 16px',
        cursor: 'pointer',
        label: {
            cursor: 'pointer'
        },
        '&:hover': {
            background: '#eef0f3'
        },
        '&:first-child': {
            paddingTop: '16px',
        },
        '&:last-child': {
            paddingTop: '16px',
            paddingBottom: '16px',
        }
    }
})