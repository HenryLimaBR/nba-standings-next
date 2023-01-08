import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import '../styles/global.scss'

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default App