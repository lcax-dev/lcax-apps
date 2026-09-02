import { gql } from '@apollo/client'
import { useMutation, useQuery } from '@apollo/client/react'
import {
  DeleteOrganizationAssemblyMutation,
  DeleteOrganizationAssemblyMutationVariables,
  OrganizationAssembliesQuery,
  OrganizationAssembliesQueryVariables,
  OrganizationAssemblyQuery,
  OrganizationAssemblyQueryVariables,
  OrganizationEpdTypeaheadQuery,
  OrganizationEpdTypeaheadQueryVariables,
  SaveOrganizationAssemblyMutation,
  SaveOrganizationAssemblyMutationVariables,
} from '@/queries/generated/graphql.ts'

export const organizationAssembliesQueryDocument = gql`
  query organizationAssemblies {
    organizationAssemblies {
      id
      name
      visibility
      incomplete
      productCount
      results {
        gwp {
          a1a3
        }
      }
    }
  }
`

export const useOrganizationAssembliesQuery = (
  options?: useQuery.Options<OrganizationAssembliesQuery, OrganizationAssembliesQueryVariables>,
) => {
  return useQuery<OrganizationAssembliesQuery, OrganizationAssembliesQueryVariables>(
    organizationAssembliesQueryDocument,
    options,
  )
}

export const organizationAssemblyQueryDocument = gql`
  query organizationAssembly($id: String!) {
    organizationAssembly(id: $id) {
      id
      name
      description
      comment
      quantity
      unit
      visibility
      incomplete
      classification {
        name
        system
        code
      }
      products {
        id
        name
        description
        quantity
        unit
        referenceServiceLife
        classification {
          name
          system
          code
        }
        impactData {
          id
          version
          epd {
            id
            name
            version
            declaredUnit
            publishedDate
            referenceServiceLife
            impacts {
              gwp {
                a1a3
              }
            }
          }
        }
      }
    }
  }
`

export const useOrganizationAssemblyQuery = (
  options?: useQuery.Options<OrganizationAssemblyQuery, OrganizationAssemblyQueryVariables>,
) => {
  return useQuery<OrganizationAssemblyQuery, OrganizationAssemblyQueryVariables>(
    organizationAssemblyQueryDocument,
    options,
  )
}

export const organizationEpdTypeaheadQueryDocument = gql`
  query organizationEpdTypeahead($where: EpdsFilters, $limit: Int) {
    epds(where: $where, limit: $limit) {
      id
      name
      version
      publishedDate
      declaredUnit
      referenceServiceLife
      impacts {
        gwp {
          a1a3
        }
      }
    }
  }
`

export const useOrganizationEpdTypeaheadQuery = (
  options?: useQuery.Options<OrganizationEpdTypeaheadQuery, OrganizationEpdTypeaheadQueryVariables>,
) => {
  return useQuery<OrganizationEpdTypeaheadQuery, OrganizationEpdTypeaheadQueryVariables>(
    organizationEpdTypeaheadQueryDocument,
    options,
  )
}

export const saveOrganizationAssemblyMutationDocument = gql`
  mutation saveOrganizationAssembly($input: SaveOrganizationAssemblyInput!) {
    saveOrganizationAssembly(input: $input) {
      id
      name
      description
      comment
      quantity
      unit
      visibility
      incomplete
      classification {
        name
        system
        code
      }
      products {
        id
        name
        description
        quantity
        unit
        referenceServiceLife
        classification {
          name
          system
          code
        }
        impactData {
          id
          version
          epd {
            id
            name
            version
            declaredUnit
            publishedDate
            referenceServiceLife
            impacts {
              gwp {
                a1a3
              }
            }
          }
        }
      }
    }
  }
`

export const useSaveOrganizationAssemblyMutation = (
  options?: useMutation.Options<SaveOrganizationAssemblyMutation, SaveOrganizationAssemblyMutationVariables>,
) => {
  return useMutation<SaveOrganizationAssemblyMutation, SaveOrganizationAssemblyMutationVariables>(
    saveOrganizationAssemblyMutationDocument,
    options,
  )
}

export const deleteOrganizationAssemblyMutationDocument = gql`
  mutation deleteOrganizationAssembly($id: String!) {
    deleteOrganizationAssembly(id: $id)
  }
`

export const useDeleteOrganizationAssemblyMutation = (
  options?: useMutation.Options<DeleteOrganizationAssemblyMutation, DeleteOrganizationAssemblyMutationVariables>,
) => {
  return useMutation<DeleteOrganizationAssemblyMutation, DeleteOrganizationAssemblyMutationVariables>(
    deleteOrganizationAssemblyMutationDocument,
    options,
  )
}

export type {
  OrganizationAssembliesQuery,
  OrganizationAssembliesQueryVariables,
  OrganizationAssemblyQuery,
  OrganizationAssemblyQueryVariables,
  SaveOrganizationAssemblyMutation,
}
