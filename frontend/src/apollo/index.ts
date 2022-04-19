import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloLink } from '@apollo/client/core'
import { WebSocketLink } from '@apollo/client/link/ws'
import { createUploadLink } from 'apollo-upload-client'
import { getMainDefinition } from 'apollo-utilities'

import { API_ENDPOINT, WS_ENDPOINT } from '@root/constants'

import authLink from './authLink'

const linkOptions = {
  // credentials: "include",
  uri: `${API_ENDPOINT}/graphql`,
}

const uploadLink = createUploadLink(linkOptions)

const wsLink = new WebSocketLink({
  uri: `${WS_ENDPOINT}/graphql`,
  options: {
    reconnect: true,
  },
})

const link = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  uploadLink as unknown as ApolloLink,
)

export default new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  link: authLink.concat(link as ApolloLink),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
})
