import gql from 'graphql-tag'
import { afterEach, describe, test } from 'vitest'
import { dbConnection, ResponseBody } from '@/__test__/__mock__'
import { server } from '@/config'
import { user, session, account } from '@/models'

describe('auth integration', async () => {
  afterEach(async () => {
    await dbConnection.delete(session)
    await dbConnection.delete(account)
    await dbConnection.delete(user)
  })

  test('signup successful', async ({ expect }) => {
    const signupData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    }

    const response = await server.executeOperation({
      query: gql`
        mutation signup($email: String!, $password: String!, $name: String!) {
          signup(email: $email, password: $password, name: $name) {
            user {
              id
              email
              name
            }
            session {
              id
              token
            }
          }
        }
      `,
      variables: signupData,
    })

    const result = response.body as unknown as ResponseBody<{ signup: any }>

    expect(result.kind === 'single')
    expect(result.singleResult.errors).toBeUndefined()
    expect(result.singleResult.data.signup.user.email).toBe(signupData.email)
    expect(result.singleResult.data.signup.user.name).toBe(signupData.name)
    expect(result.singleResult.data.signup.session.token).toBeDefined()

    const users = await dbConnection.select().from(user)
    expect(users.length).toBe(1)
    expect(users[0].email).toBe(signupData.email)
  })

  test('signup fails with existing email', async ({ expect }) => {
    const signupData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    }

    // First signup
    await server.executeOperation({
      query: gql`
        mutation signup($email: String!, $password: String!, $name: String!) {
          signup(email: $email, password: $password, name: $name) {
            user { id }
          }
        }
      `,
      variables: signupData,
    })

    // Second signup with same email
    const response = await server.executeOperation({
      query: gql`
        mutation signup($email: String!, $password: String!, $name: String!) {
          signup(email: $email, password: $password, name: $name) {
            user { id }
          }
        }
      `,
      variables: signupData,
    })

    const result = response.body as unknown as ResponseBody<{ signup: any }>
    expect(result.singleResult.errors).toBeDefined()
    expect(result.singleResult.errors[0].message).toContain('User already exists')
  })

  test('login successful', async ({ expect }) => {
    const userData = {
      email: 'login@example.com',
      password: 'password123',
      name: 'Login User',
    }

    // Signup first
    await server.executeOperation({
      query: gql`
        mutation signup($email: String!, $password: String!, $name: String!) {
          signup(email: $email, password: $password, name: $name) {
            user { id }
          }
        }
      `,
      variables: userData,
    })

    const response = await server.executeOperation({
      query: gql`
        mutation login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            user {
              id
              email
            }
            session {
              token
            }
          }
        }
      `,
      variables: {
        email: userData.email,
        password: userData.password,
      },
    })

    const result = response.body as unknown as ResponseBody<{ login: any }>
    expect(result.kind === 'single')
    expect(result.singleResult.errors).toBeUndefined()
    expect(result.singleResult.data.login.user.email).toBe(userData.email)
    expect(result.singleResult.data.login.session.token).toBeDefined()
  })

  test('login fails with incorrect password', async ({ expect }) => {
    const userData = {
      email: 'wrongpass@example.com',
      password: 'password123',
      name: 'Wrong Pass User',
    }

    await server.executeOperation({
      query: gql`
        mutation signup($email: String!, $password: String!, $name: String!) {
          signup(email: $email, password: $password, name: $name) {
            user { id }
          }
        }
      `,
      variables: userData,
    })

    const response = await server.executeOperation({
      query: gql`
        mutation login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            user { id }
          }
        }
      `,
      variables: {
        email: userData.email,
        password: 'wrongpassword',
      },
    })

    const result = response.body as unknown as ResponseBody<{ login: any }>
    expect(result.singleResult.errors).toBeDefined()
    expect(result.singleResult.errors[0].message).toContain('Invalid email or password')
  })

  test('login fails with non-existent user', async ({ expect }) => {
    const response = await server.executeOperation({
      query: gql`
        mutation login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            user { id }
          }
        }
      `,
      variables: {
        email: 'notfound@example.com',
        password: 'password123',
      },
    })

    const result = response.body as unknown as ResponseBody<{ login: any }>
    expect(result.singleResult.errors).toBeDefined()
    expect(result.singleResult.errors[0].message).toContain('Invalid email or password')
  })
})
