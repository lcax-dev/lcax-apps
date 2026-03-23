import gql from 'graphql-tag'
import { afterEach, beforeEach, describe, test } from 'vitest'
import { epdData } from '@/__test__/__data__'
import { dbConnection, ResponseBody } from '@/__test__/__mock__'
import { server } from '@/config'
import { epds } from '@/models'
import { type EPD } from '@/models/types'

describe('query epds', async () => {
  beforeEach(async () => {
    await dbConnection.insert(epds).values(epdData)
  })
  afterEach(async () => {
    await dbConnection.delete(epds)
  })

  test('return all epds', async ({ expect }) => {
    const response = await server.executeOperation({
      query: 'query epds { epds { id, source { name, url }, location } }',
    })

    expect(response).toMatchSnapshot()
    const result = response.body as unknown as ResponseBody<{ epds: EPD[] }>
    expect(result.singleResult.data.epds.length).toBe(epdData.length)
  })

  test('return single epd', async ({ expect }) => {
    const response = await server.executeOperation({
      query: gql`
        query getEPD($where: EpdsFilters) {
          epds(where: $where) {
            id
            name
          }
        }
      `,
      variables: { where: { id: { eq: epdData[0].id } } },
    })

    expect(response).toMatchSnapshot()

    const result = response.body as unknown as ResponseBody<{ epds: EPD[] }>
    expect(result.singleResult.data.epds.length).toBe(1)
  })
})

describe('mutate epds', async () => {
  afterEach(async () => {
    await dbConnection.delete(epds)
  })

  test('add epd', async ({ expect }) => {
    const response = await server.executeOperation({
      query: gql`
        mutation addEPD($values: [EpdsInsertInput!]!) {
          addEpds(values: $values) {
            id
            name
          }
        }
      `,
      variables: { values: epdData },
    })

    const result = response.body as unknown as ResponseBody<{ addEpds: EPD[] }>

    expect(result.kind === 'single')
    expect(result.singleResult.errors).toBeUndefined()
    expect(result.singleResult.data.addEpds.length).toBe(2)
    expect(result.singleResult.data.addEpds[0].id).toBeDefined()
  })

  test('delete epd', async ({ expect }) => {
    await dbConnection.insert(epds).values(epdData)

    const response = await server.executeOperation({
      query: gql`
        mutation deleteEPD($where: EpdsFilters) {
          deleteEpds(where: $where) {
            id
            name
          }
        }
      `,
      variables: { where: { id: { eq: epdData[0].id } } },
    })

    const result = response.body as unknown as ResponseBody<{ deleteEpds: EPD[] }>

    expect(result.kind === 'single')
    expect(result.singleResult.errors).toBeUndefined()
    expect(result.singleResult.data.deleteEpds.length).toBe(1)
    expect(result.singleResult.data.deleteEpds[0].id).toBe(epdData[0].id)

    const remainingEpds = await dbConnection.select().from(epds)
    expect(remainingEpds.length).toBe(epdData.length - 1)
  })

  test('update epd', async ({ expect }) => {
    await dbConnection.insert(epds).values(epdData)
    const newName = 'Updated EPD Name'

    const response = await server.executeOperation({
      query: gql`
        mutation updateEPD($set: EpdsUpdateInput!, $where: EpdsFilters) {
          updateEpds(set: $set, where: $where) {
            id
            name
            source {
              name
              url
            }
          }
        }
      `,
      variables: {
        set: { name: newName },
        where: { id: { eq: epdData[0].id } },
      },
    })

    const result = response.body as unknown as ResponseBody<{ updateEpds: EPD[] }>

    expect(result.kind === 'single')
    expect(result.singleResult.errors).toBeUndefined()
    expect(result.singleResult.data.updateEpds.length).toBe(1)
    expect(result.singleResult.data.updateEpds[0].name).toBe(newName)
  })
})
