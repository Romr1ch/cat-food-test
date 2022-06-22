import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from 'src/styles/global-style'
import { theme } from 'src/types/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextHead>
        <meta content='minimum-scale=1, initial-scale=1, width=device-width' name='viewport' />
      </NextHead>
      <DefaultSeo defaultTitle='Корм для кошачьих' titleTemplate='%s · Корм для кошачьих' />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
