import { useState, useEffect } from 'react'
import Input from '~/components/Input'
import Button from '~/components/Button'
import Metatags from '~/components/Metatags'
import kebabCase from 'lodash.kebabcase'
import Select from '~/components/Select'
import { Row, Col } from '~/components/Grid'
import ReactMarkdown from 'react-markdown'
import { styled } from '@stitches/react'
import { colors } from '~/styles'

export default function NewRecepie({  }) {

    const [ title, setTitle ] = useState('')
    const [ slug, setSlug ] = useState('')
    const [ content, setContent ] = useState('')
    const [ published, setPublished ] = useState('0')

    useEffect(() => {
        setSlug(kebabCase(title))
    }, [title])

    return(
        <>
            <Metatags />
            <div className="container">
                <Row className="mb-36">
                    <Col width={[9, 8, 12]}>
                        <Input placeholder="Title" value={title} onChange={setTitle} />
                        <label className="pt-16 pl-16 block gray fw-400">{slug}</label>
                    </Col>
                    <Col width={[3, 4, 12]}>
                        <Select
                            value={published}
                            placeholder="select value"
                            options={[ { name: 'Published', value: '1' }, { name: 'Unpublished', value: '0' }]}
                            onChange={setPublished}
                        />
                    </Col>
                </Row>

                <Row className="mb-36">
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