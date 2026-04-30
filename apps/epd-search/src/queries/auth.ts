import { gql } from '@apollo/client'
import { useMutation, useQuery } from '@apollo/client/react'

import { type AuthResponse, type MutationLoginArgs, type MutationSignupArgs, User } from './graphql'

export const loginMutationDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        name
        emailVerified
        image
        createdAt
        updatedAt
      }
      session {
        id
        userId
        expiresAt
        token
        ipAddress
        userAgent
      }
    }
  }
`

export const signupMutationDocument = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      user {
        id
        email
        name
        emailVerified
        image
        createdAt
        updatedAt
      }
      session {
        id
        userId
        expiresAt
        token
        ipAddress
        userAgent
      }
    }
  }
`

export const useLoginMutation = (options?: useMutation.Options<{ login: AuthResponse }, MutationLoginArgs>) => {
  return useMutation<{ login: AuthResponse }, MutationLoginArgs>(loginMutationDocument, options)
}

export const useSignupMutation = (options?: useMutation.Options<{ signup: AuthResponse }, MutationSignupArgs>) => {
  return useMutation<{ signup: AuthResponse }, MutationSignupArgs>(signupMutationDocument, options)
}

export const getUserQueryDocument = gql`
  query getUser {
    user {
      id
      email
      name
      emailVerified
      image
      createdAt
      updatedAt
    }
  }
`

export const useGetUserQuery = (options?: useQuery.Options<{ user: User }>) => {
  return useQuery<{ user: User }>(getUserQueryDocument, options)
}
