import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '~/styles/Home.module.css'
import { styled } from '@stitches/react'

import { Row, Col } from '~/components/grid'
import Modal from '~/components/Modal'
import Button from '~/components/Button'
import IngredientForm from '~/components/IngredientForm'

export default function Ingredients() {

    const [ formVisible, setFormVisible ] = useState(false)

    return(
        <>
            <div className="container">
                <Button onClick={() => setFormVisible(true)}>Add ingredient</Button>
                {formVisible &&
                    <Modal onCloseRequest={() => setFormVisible(false)}>
                        <IngredientForm />
                    </Modal>
                }
            </div>
        </>
    )
}