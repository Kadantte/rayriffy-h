import React from 'react'

import { Helmet } from 'react-helmet'

import { Box } from '@chakra-ui/core'

import Context from '../../store'

import Header from './header'
import ServiceWorker from './serviceworker'

const AppComponent: React.FC = props => {
  const { children } = props

  return (
    <React.StrictMode>
      <Context>
        <Box pt={12}>
          <Helmet defaultTitle='Riffy H' titleTemplate='%s · Riffy H' />
          <Box px={[3, 4, 5]}>
            <Header />
            <ServiceWorker />
          </Box>
          <Box>{children}</Box>
        </Box>
      </Context>
    </React.StrictMode>
  )
}

export default AppComponent
