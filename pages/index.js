import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '~/styles/Home.module.css'
import { styled } from '@stitches/react'

import Loader from '~/components/Loader'

function Home() {

    
    return(
        <div className="container">
            <div className="card">
                <h1>Makro</h1>
                <Button>Click</Button>
                <Loader visible />
            </div>
        </div>
    )
}
  
export default Home

const Button = styled('button', {
    backgroundColor: 'gainsboro',
    borderRadius: '9999px',
    fontSize: '13px',
    padding: '10px 15px',
    position: 'relative',
})