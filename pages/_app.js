import '../styles/globals.scss'
import withDarkMode from 'next-dark-mode'


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withDarkMode(MyApp)
