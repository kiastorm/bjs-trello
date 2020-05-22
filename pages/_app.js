import React from 'react'
import { ThemeProvider } from 'theme-ui'
import theme from '../theme'
import Header from '../components/Header';
import Flex from '../components/Flex';



const Layout = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Flex sx={{ flexDirection: 'column', height: '100vh' }}>
        <Header />
        <Component {...pageProps} />
      </Flex>
    </ThemeProvider>
  )
};

export default Layout;