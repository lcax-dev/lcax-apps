import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { LcAxKind, SearchQuery, SearchQueryVariables } from '@/queries/generated/graphql.ts'

export const searchQueryDocument = gql`
  query search($q: String, $kinds: [LCAxKind!], $where: SearchFilters, $limit: Int, $offset: Int) {
    search(q: $q, kinds: $kinds, where: $where, limit: $limit, offset: $offset) {
      __typename
      ... on EPD {
        epdId: id
        epdName: name
        declaredUnit
        location
        subtype
        metaData
      }
      ... on Assembly {
        assemblyId: id
        assemblyName: name
        unit
        classification {
          name
        }
      }
    }
  }
`

export const useSearchQuery = (options?: useQuery.Options<SearchQuery, SearchQueryVariables>) => {
  return useQuery<SearchQuery, SearchQueryVariables>(searchQueryDocument, options)
}

export type { LcAxKind, SearchQuery, SearchQueryVariables }
