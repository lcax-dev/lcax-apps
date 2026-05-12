import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { httpServer } from '@/config/server'
import { dbConnection } from '@/config/database'
import { epds } from '@/models'
import { epdData } from '@/__test__/__data__'
import { AddressInfo } from 'net'
import { EPD } from 'lcax'

describe('REST EPD endpoint', () => {
  let url: string

  beforeAll(async () => {
    if (!httpServer.listening) {
      await new Promise<void>((resolve) => httpServer.listen(0, resolve))
    }
    const port = (httpServer.address() as AddressInfo).port
    url = `http://localhost:${port}`
    process.env.FRONTEND_URL = 'http://test-frontend.com'
  })

  afterAll(async () => {
    await new Promise<void>((resolve) => httpServer.close(() => resolve()))
  })

  beforeEach(async () => {
    await dbConnection.delete(epds)
    await dbConnection.insert(epds).values(epdData)
    // Add an older version for testing latest logic
    await dbConnection.insert(epds).values({
      ...epdData[0],
      version: '2024',
      publishedDate: '2024-07-01',
    })
  })

  test('should return latest EPD as JSON when Accept is application/json', async () => {
    const epdId = epdData[0].id
    const response = await fetch(`${url}/epds/${epdId}`, {
      headers: {
        Accept: 'application/json',
      },
    })

    expect(response.status).toBe(200)
    const data = (await response.json()) as EPD
    expect(data.id).toBe(epdId)
    expect(data.version).toBe('2025') // The newer one from epdData
  })

  test('should return specific version when version query param is provided', async () => {
    const epdId = epdData[0].id
    const version = '2024'
    const response = await fetch(`${url}/epds/${epdId}?version=${version}`, {
      headers: {
        Accept: 'application/json',
      },
    })

    expect(response.status).toBe(200)
    const data = (await response.json()) as EPD
    expect(data.id).toBe(epdId)
    expect(data.version).toBe(version)
  })

  test('should return 404 when EPD is not found and Accept is application/json', async () => {
    const response = await fetch(`${url}/epds/00000000-0000-0000-0000-000000000000`, {
      headers: {
        Accept: 'application/json',
      },
    })

    expect(response.status).toBe(404)
  })

  test('should redirect to frontend when Accept is not application/json', async () => {
    const epdId = epdData[0].id
    const response = await fetch(`${url}/epds/${epdId}`, {
      redirect: 'manual',
    })

    expect(response.status).toBe(302)
    expect(response.headers.get('location')).toBe(`${process.env.FRONTEND_URL}/epds/${epdId}`)
  })

  test('should redirect to frontend with version query param when Accept is not application/json', async () => {
    const epdId = epdData[0].id
    const version = '2024'
    const response = await fetch(`${url}/epds/${epdId}?version=${version}`, {
      redirect: 'manual',
    })

    expect(response.status).toBe(302)
    expect(response.headers.get('location')).toBe(`${process.env.FRONTEND_URL}/epds/${epdId}?version=${version}`)
  })
})
