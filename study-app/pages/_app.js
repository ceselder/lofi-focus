import Head from 'next/head'
import { useContext, useState } from 'react'
import Background from '../components/Background'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
    <link rel="manifest" href="/manifest.json"></link>
    </Head>
        <Component {...pageProps} /> 
    </>
  )
}

export default MyApp
