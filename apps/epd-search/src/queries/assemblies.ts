import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { GetAssemblyQuery, GetAssemblyQueryVariables } from '@/queries/generated/graphql.ts'

export const getAssemblyQueryDocument = gql`
  query getAssembly($id: String!) {
    assemblies(where: { id: { eq: $id } }, limit: 1) {
      id
      name
      description
      quantity
      unit
      classification {
        name
        system
        code
      }
      products {
        id
        name
        quantity
        unit
        impactData {
          id
          name
        }
      }
      results {
        gwp {
          a1a3
        }
        odp {
          a1a3
        }
        ap {
          a1a3
        }
        ep {
          a1a3
        }
        pocp {
          a1a3
        }
        adpe {
          a1a3
        }
        adpf {
          a1a3
        }
      }
    }
  }
`

export const useGetAssemblyQuery = (options?: useQuery.Options<GetAssemblyQuery, GetAssemblyQueryVariables>) => {
  return useQuery<GetAssemblyQuery, GetAssemblyQueryVariables>(getAssemblyQueryDocument, options)
}

export type { GetAssemblyQuery, GetAssemblyQueryVariables }
