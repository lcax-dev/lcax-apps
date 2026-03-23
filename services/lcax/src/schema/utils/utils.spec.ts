import { and, asc, desc, eq, or } from 'drizzle-orm'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { orderByHelper } from './orderBy'
import { whereHelper } from './where'

// Mocking drizzle-orm functions to inspect calls
vi.mock('drizzle-orm', async () => {
  const actual = await vi.importActual('drizzle-orm')
  return {
    ...actual,
    and: vi.fn((...args) => ({ type: 'and', args })),
    or: vi.fn((...args) => ({ type: 'or', args })),
    eq: vi.fn((col, val) => ({ type: 'eq', col, val })),
    asc: vi.fn((col) => ({ type: 'asc', col })),
    desc: vi.fn((col) => ({ type: 'desc', col })),
  }
})

describe('whereHelper', () => {
  const mockModel = {
    id: { name: 'id' },
    name: { name: 'name' },
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return undefined if where is empty', () => {
    // @ts-expect-error ignore
    expect(whereHelper({}, mockModel)).toBeUndefined()
  })

  it('should return undefined if where is undefined', () => {
    // @ts-expect-error ignore
    expect(whereHelper(undefined, mockModel)).toBeUndefined()
  })

  it('should return a single eq filter', () => {
    const where = { id: { eq: '123' } }
    // @ts-expect-error ignore
    const result = whereHelper(where, mockModel)

    expect(eq).toHaveBeenCalledWith(mockModel.id, '123')
    expect(and).not.toHaveBeenCalled()
    expect(result).toEqual({ type: 'eq', col: mockModel.id, val: '123' })
  })

  it('should return multiple filters joined by and', () => {
    const where = { id: { eq: '123' }, name: { eq: 'test' } }
    // @ts-expect-error ignore
    const result = whereHelper(where, mockModel)

    expect(eq).toHaveBeenCalledWith(mockModel.id, '123')
    expect(eq).toHaveBeenCalledWith(mockModel.name, 'test')
    expect(and).toHaveBeenCalled()
    expect(result).toEqual({
      type: 'and',
      args: [
        { type: 'eq', col: mockModel.id, val: '123' },
        { type: 'eq', col: mockModel.name, val: 'test' },
      ],
    })
  })

  it('should ignore undefined values', () => {
    const where = { id: { eq: '123' }, name: undefined }
    // @ts-expect-error ignore
    const result = whereHelper(where, mockModel)

    expect(eq).toHaveBeenCalledWith(mockModel.id, '123')
    expect(eq).not.toHaveBeenCalledWith(mockModel.name, expect.anything())
    expect(result).toEqual({ type: 'eq', col: mockModel.id, val: '123' })
  })

  it('should ignore keys not in model', () => {
    const where = { nonExistent: { eq: 'value' }, id: { eq: '123' } }
    // @ts-expect-error ignore
    const result = whereHelper(where, mockModel)

    expect(eq).toHaveBeenCalledWith(mockModel.id, '123')
    expect(result).toEqual({ type: 'eq', col: mockModel.id, val: '123' })
  })

  it('should support OR conditions', () => {
    const where = {
      OR: [{ id: { eq: '1' } }, { id: { eq: '2' } }],
    }
    // @ts-expect-error ignore
    const result = whereHelper(where, mockModel)

    expect(or).toHaveBeenCalled()
    expect(result).toEqual({
      type: 'or',
      args: [
        { type: 'eq', col: mockModel.id, val: '1' },
        { type: 'eq', col: mockModel.id, val: '2' },
      ],
    })
  })

  it('should support complex nested AND/OR conditions', () => {
    const where = {
      name: { eq: 'test' },
      OR: [{ id: { eq: '1' } }, { id: { eq: '2' } }],
    }
    // @ts-expect-error ignore
    const result = whereHelper(where, mockModel)

    expect(and).toHaveBeenCalled()
    expect(or).toHaveBeenCalled()
    expect(result).toEqual({
      type: 'and',
      args: [
        { type: 'eq', col: mockModel.name, val: 'test' },
        {
          type: 'or',
          args: [
            { type: 'eq', col: mockModel.id, val: '1' },
            { type: 'eq', col: mockModel.id, val: '2' },
          ],
        },
      ],
    })
  })
})

describe('orderByHelper', () => {
  const mockModel = {
    id: { name: 'id' },
    name: { name: 'name' },
  }

  it('should return empty array if orderBy is empty', () => {
    // @ts-expect-error ignore
    expect(orderByHelper([], mockModel)).toEqual([])
  })

  it('should return empty array if orderBy is undefined', () => {
    // @ts-expect-error ignore
    expect(orderByHelper(undefined, mockModel)).toEqual([])
  })

  it('should return asc order', () => {
    const orderBy = [{ id: 'asc' }] as const
    // @ts-expect-error ignore
    const result = orderByHelper(orderBy, mockModel)

    expect(asc).toHaveBeenCalledWith(mockModel.id)
    expect(result).toEqual([{ type: 'asc', col: mockModel.id }])
  })

  it('should return desc order', () => {
    const orderBy = [{ name: 'desc' }] as const
    // @ts-expect-error ignore
    const result = orderByHelper(orderBy, mockModel)

    expect(desc).toHaveBeenCalledWith(mockModel.name)
    expect(result).toEqual([{ type: 'desc', col: mockModel.name }])
  })

  it('should handle multiple order criteria', () => {
    const orderBy = [{ id: 'asc' }, { name: 'desc' }] as const
    // @ts-expect-error ignore
    const result = orderByHelper(orderBy, mockModel)

    expect(asc).toHaveBeenCalledWith(mockModel.id)
    expect(desc).toHaveBeenCalledWith(mockModel.name)
    expect(result).toEqual([
      { type: 'asc', col: mockModel.id },
      { type: 'desc', col: mockModel.name },
    ])
  })
})
