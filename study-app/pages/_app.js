import { useContext, useState } from 'react'
import Background from '../components/Background'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
            <Component {...pageProps} /> 
    </>
  )
}

export default MyApp
