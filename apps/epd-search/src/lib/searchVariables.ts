import { kindsForQuery, parseKinds, parseUnit } from '@/lib/searchParams.ts'
import {
  CountryEnum,
  LcAxKind,
  SearchFilters,
  SearchQueryVariables,
  StandardEnum,
  SubTypeEnum,
  UnitEnum,
} from '@/queries/generated/graphql.ts'

export const SEARCH_LIMIT = 50

export const buildSearchVariables = (searchParams: URLSearchParams): SearchQueryVariables => {
  const q = searchParams.get('q')?.trim() || undefined
  const kinds = kindsForQuery(parseKinds(searchParams)) as LcAxKind[] | undefined
  const unit = parseUnit(searchParams)
  const location = searchParams.get('location') || ''
  const subtype = searchParams.get('subtype') || ''
  const standard = searchParams.get('standard') || ''
  const type = searchParams.get('type') || ''
  const classification = searchParams.get('classification') || ''
  const publishedDate = searchParams.get('publishedDate') || ''
  const validUntil = searchParams.get('validUntil') || ''

  const where: SearchFilters = {}
  if (unit) where.unit = { eq: unit as UnitEnum }
  if (location) where.location = { eq: location as CountryEnum }
  if (subtype) where.subtype = { eq: subtype as SubTypeEnum }
  if (standard) where.standard = { eq: standard as StandardEnum }
  if (type) where.type = { contains: type }
  if (classification) where.classification = { contains: classification }
  if (publishedDate) where.publishedDate = { gte: publishedDate }
  if (validUntil) where.validUntil = { lte: validUntil }

  return {
    q,
    kinds,
    where: Object.keys(where).length > 0 ? where : undefined,
    limit: SEARCH_LIMIT,
  }
}
