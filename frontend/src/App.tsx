import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom'

import apolloClient from '@root/apollo'
import Routes from '@navigation/routes'
import { AppContextProvider } from './AppContext'

import 'aos/dist/aos.css'
import '@assets/css/bootstrap.min.css'
import '@assets/scss/style.scss'

const App: React.FC = () => (
  <ApolloProvider client={apolloClient}>
    <Router>
      <AppContextProvider>
        <Routes />
      </AppContextProvider>
    </Router>
  </ApolloProvider>
)

export default App
