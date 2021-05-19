import { useState, useEffect, useContext } from 'react'
import Input from '~/components/Input'
import Button from '~/components/Button'
import kebabCase from 'lodash.kebabcase'
import Select from '~/components/Select'
import { Row, Col } from '~/components/grid'
import ReactMarkdown from 'react-markdown'
import { styled } from '@stitches/react'
import { colors } from '~/styles'
import IngredientMacro from '~/components/IngredientMacro'
import IngredientFinder from '/components/IngredientFinder'
import ImageUploader from '/components/ImageUploader'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import { firestore, auth, serverTimestamp } from '~/lib/firebase'
import { UserContext } from '~/lib/context'
import toast from 'react-hot-toast'
import { goTo } from '~/lib/helpers'

const defaults = {
    title: '',
    slug: '',
    category: '',
    portions: '',
    content: '',
    ingredients: [],
    published: '1',
    thumbnail: ''

}

export default function RecipeForm({ recipe=defaults }) {

    const [ title, setTitle ] = useState(recipe.title)
    const [ slug, setSlug ] = useState(recipe.slug)
    const [ category, setCategory ] = useState(recipe.category)
    const [ portions, setPortions ] = useState(recipe.portions)
    const [ content, setContent ] = useState(recipe.content)
    const [ ingredients, setIngredients ] = useState(recipe.ingredients)
    const [ published, setPublished ] = useState(recipe.published ? '1' : '0')
    const [ thumbnail, setThumbnail ] = useState(recipe.thumbnail)

    const { username } = useContext(UserContext)

    useEffect(() => {
        setSlug(encodeURI(kebabCase(title)))
    }, [title])

    const addIngredient = ing => {
        if(!!ingredients.filter(i => i.uid === ing.uid).length) return alert('Ten składnik juź jest na liście!')
        setIngredients([...ingredients, {...ing, ammount: Number(ing.macroIn.replace(/\D/g,'')), ammountDesc: '' } ])
    }

    const setIngredientAmmount = (val, uid) => {
        setIngredients(ingredients.map(ing => ing.uid === uid ? {...ing, ammount: val} : ing))
    }

    const setIngredientAmmountDesc = (val, uid) => {
        setIngredients(ingredients.map(ing => ing.uid === uid ? {...ing, ammountDesc: val} : ing))
    }

    const removeIngredient = uid => {
        setIngredients(ingredients.filter(ing => ing.uid !== uid))
    }

    const formValid = !!ingredients.length && title && slug && category && content && thumbnail && portions

    const submit = async () => {

        const uid = auth.currentUser.uid
        const ref = firestore.collection('users').doc(uid).collection('recipes').doc(slug)

        const data = {
            title,
            slug,
            uid,
            username,
            published: Boolean(Number(published)),
            content,
            thumbnail,
            category,
            portions: Number(portions),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            heartCount: 0,
            ingredients: ingredients.map(ing => ({
                ammount: ing.ammount,
                ammountDesc: ing.ammountDesc || '',
                ingredient: ing.uid
            }))
        }

        await ref.set(data);

        toast.success('Przepis zapisany')

        goTo(`/[username]/[slug]`, `/${username}/${slug}`)
    }

    return(
        <>
            <div className="container">
                <Row>
                    <Col width={[4,4,12]} className="pb-16">
                        <div className="card h-100 flex-center p-16" style={{backgroundImage: `url(${thumbnail})`, backgroundPosition: 'center center', backgroundSize: 'cover' }}>
                            <ImageUploader onDownloadUrlReady={setThumbnail} />
                            {thumbnail && <RemoveThumb onClick={() => setThumbnail('')} />}
                        </div>
                    </Col>
                    <Col width={[8,8,12]}>
                        <Input placeholder="Tytuł" value={title} onChange={setTitle} />
                        <label className="pt-16 pl-16 mb-16 block gray fw-400">{slug || '...'}</label>
                        <Row>
                            <Col width={[6,6,12]} >
                                <Select
                                    value={category}
                                    placeholder="Kategoria"
                                    options={[ { name: 'Śniadanie', value: 'śniadanie' }, { name: 'Obiad', value: 'obiad' }, { name: 'Deser', value: 'deser' }]}
                                    onChange={setCategory}
                                />
                            </Col>
                            {/*<Col width={[6,6,12]} >
                                <Select
                                    value={published}
                                    placeholder="Select"
                                    options={[ { name: 'Published', value: '1' }, { name: 'Unpublished', value: '0' }]}
                                    onChange={setPublished}
                                />
                            </Col>*/}
                            <Col width={[6,6,12]}>
                                <Input
                                    type="number"
                                    placeholder="Ilość porcji"
                                    value={portions}
                                    onChange={setPortions}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <IngredientFinder
                    className="mb-32"
                    onIngredientSelected={addIngredient}/>

                <div className="mb-32">
                    {ingredients.map((ing, i) => (
                        <Row key={i} >
                            <Col width={[7, 8, 12]}>
                                <div className="flex-center-y h-100">
                                    <div className="bold mb-8">{ing.name}</div>
                                    <IngredientMacro ingredient={ing} ammount={ing.ammount} />
                                </div>
                            </Col>
                            <Col width={[2, 2, 12]}>
                                <div className="flex-center-y-row">
                                    <Input
                                        disabled={!ing.name}
                                        type="number"
                                        placeholder="Ilość"
                                        suffix={ing?.macroIn?.replace(/\d/g,'')}
                                        value={ing.ammount}
                                        onChange={val => setIngredientAmmount(val, ing.uid)}
                                    />
                                </div>
                            </Col>
                            <Col width={[2, 2, 12]}>
                                <div className="flex-center-y-row">
                                    <Input
                                        disabled={!ing.name}
                                        placeholder="Opis"
                                        value={ing.ammountDesc}
                                        onChange={val => setIngredientAmmountDesc(val, ing.uid)}
                                    />
                                </div>
                            </Col>
                            <Col width={[1,1, 12]}>
                                <div className="flex-center-y-row h-100">
                                    <RemoveIng onClick={() => removeIngredient(ing.uid)} />
                                </div>
                            </Col>
                        </Row>
                    ))}
                </div>

                <Row className="mb-32">
                    <Col width={[6,6,12]}>
                        <div className="card p-16 h-100">
                            <ContentInput placeholder="Content (markdown)" value={content} onChange={e => setContent(e.target.value)} />
                        </div>
                    </Col>
                    <Col width={[6,6,12]}>
                        <div className="card p-16 h-100 content">
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </div>
                    </Col>
                </Row>

                <Button className="w-100" disabled={!formValid} onClick={submit} >{'Zapisz'}</Button>

            </div>
        </>
    )
}

const ContentInput = styled('textarea', {
    border: 0,
    outline: 0,
    width: '100%',
    height: '400px',
    fontSize: '17px',
    '&::placeholder': {
        color: colors.gray,
        opacity: 1,
        fontFamily: `'Noto Sans', sans-serif`,
    },
})

const RemoveIng = styled(IoMdRemoveCircleOutline, {
    minWidth: '24px',
    minHeight: '24px',
    marginLeft: '12px',
    cursor: 'pointer',
    '&:hover path': {
        fill: colors.red
    }
})

const RemoveThumb = styled(IoMdRemoveCircleOutline, {
    position: 'absolute',
    top: '6px',
    right: '6px',
    minWidth: '24px',
    minHeight: '24px',
    marginLeft: '12px',
    cursor: 'pointer',
    fill: colors.red,
    background: '#fff',
    borderRadius: '12px',
    border: '1px solid white',
})