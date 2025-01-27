import { ReactNode, useMemo } from 'react'

import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'

type GraphQlProviderProps = {
  url: string
  children: ReactNode
}

export const GraphQLProvider = ({ children, url }: GraphQlProviderProps) => {
  const backendLink = createHttpLink({
    uri: `${url}/graphql`,
    credentials: 'include',
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
