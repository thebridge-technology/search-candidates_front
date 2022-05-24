import type { AppProps } from 'next/app'
import Head from "next/head"
import GlobalStyle from '../styles/globals'
import { Body } from '../styles/main'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle/>
        <Head>
          <title>The Bridge Network</title>
          <meta
            name="description"
          />
          <meta name="viewport" content="initial-scale=1, width=device-width"/>
        </Head>
        <Body>
          <Component {...pageProps} />
        </Body>
      </ThemeProvider>
    </>
  )
}

export default App