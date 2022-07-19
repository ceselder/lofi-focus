import Bg from '../components/bg'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Bg />
      <div class="static z-10">
        <Component {...pageProps} /> 
      </div>
      
    </>
  )
}

export default MyApp
