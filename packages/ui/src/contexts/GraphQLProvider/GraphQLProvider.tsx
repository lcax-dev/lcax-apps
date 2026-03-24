import { ReactNode, useMemo } from 'react'

import { ApolloProvider } from '@apollo/client/react'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

type GraphQlProviderProps = {
  url: string
  children: ReactNode
}

export const GraphQLProvider = ({ children, url }: GraphQlProviderProps) => {
  const backendLink = new HttpLink({
    uri: `${url}/graphql`,
  })
  const client = useMemo(
    () =>
      new ApolloClient({
        link: backendLink,
        cache: new InMemoryCache(),
      }),
    [backendLink],
  )

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
