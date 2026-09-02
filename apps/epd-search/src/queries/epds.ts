import { gql } from '@apollo/client'
import { useMutation, useQuery } from '@apollo/client/react'
import { Epd, MutationAddEpdsArgs, MutationAddLcAxDataArgs, QueryEpdsArgs } from '@/queries/generated/graphql.ts'

export const addEpdsMutationDocument = gql`
  mutation addEpds($values: [EpdsInsertInput!]!) {
    addEpds(values: $values) {
      id
      name
    }
  }
`

export const useAddEpdsMutation = (options?: useMutation.Options<{ addEpds: Epd[] }, MutationAddEpdsArgs>) => {
  return useMutation<{ addEpds: Epd[] }, MutationAddEpdsArgs>(addEpdsMutationDocument, options)
}

export const addLCAxDataMutationDocument = gql`
  mutation addLCAxData($values: [LCAxInput!]!, $organizationId: String, $visibility: String) {
    addLCAxData(values: $values, organizationId: $organizationId, visibility: $visibility)
  }
`

export const useAddLCAxDataMutation = (
  options?: useMutation.Options<{ addLCAxData: any[] }, MutationAddLcAxDataArgs>,
) => {
  return useMutation<{ addLCAxData: any[] }, MutationAddLcAxDataArgs>(addLCAxDataMutationDocument, options)
}

export const getEpdQueryDocument = gql`
  query getEpd($id: String!) {
    epds(where: { id: { eq: $id } }, limit: 1) {
      id
      name
      epdId
      type
      declaredUnit
      version
      publishedDate
      validUntil
      referenceServiceLife
      standard
      location
      subtype
      metaData
      source {
        name
        url
      }
      conversions {
        value
        to
        metaData
      }
      impacts {
        gwp {
          a1a3
          a4
          a5
          b1
          b2
          b3
          b4
          b5
          b6
          b7
          c1
          c2
          c3
          c4
          d
        }
        odp {
          a1a3
          a4
          a5
          c1
          c2
          c3
          c4
          d
        }
        ap {
          a1a3
          a4
          a5
          c1
          c2
          c3
          c4
          d
        }
        ep {
          a1a3
          a4
          a5
          c1
          c2
          c3
          c4
          d
        }
        pocp {
          a1a3
          a4
          a5
          c1
          c2
          c3
          c4
          d
        }
        adpe {
          a1a3
          a4
          a5
          c1
          c2
          c3
          c4
          d
        }
        adpf {
          a1a3
          a4
          a5
          c1
          c2
          c3
          c4
          d
        }
      }
    }
  }
`

export const useGetEpdQuery = (options?: useQuery.Options<{ epds: Epd[] }, QueryEpdsArgs>) => {
  return useQuery<{ epds: Epd[] }, QueryEpdsArgs>(getEpdQueryDocument, options)
}

export const searchEpdsQueryDocument = gql`
  query searchEpds($where: EpdsFilters, $limit: Int, $offset: Int) {
    epds(where: $where, limit: $limit, offset: $offset) {
      id
      name
      declaredUnit
      location
      subtype
      type
      standard
      publishedDate
      validUntil
      metaData
    }
  }
`

export const useSearchEpdsQuery = (options?: useQuery.Options<{ epds: Epd[] }, QueryEpdsArgs>) => {
  return useQuery<{ epds: Epd[] }, QueryEpdsArgs>(searchEpdsQueryDocument, options)
}

export const getLcaxStatisticsQueryDocument = gql`
  query getLcaxStatistics {
    lcaxStatistics {
      totalCount
      epdsCount
      assembliesCount
      productsCount
      uploads {
        date
        count
        epds
        assemblies
        products
      }
    }
  }
`

export const useGetLcaxStatisticsQuery = (options?: any) => {
  return useQuery(getLcaxStatisticsQueryDocument, options)
}
