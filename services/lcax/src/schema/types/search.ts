import { GraphQLEnumType, GraphQLInputObjectType, GraphQLUnionType } from 'graphql/type'
import { GraphQLAssembly } from '@/schema/types/assemblies'
import { GraphQLEpd } from '@/schema/types/epds'
import { CountryFilter, StandardFilter, StringFilter, SubTypeFilter, UnitFilter } from '@/schema/types/inputs'

export const LCAxKind = new GraphQLEnumType({
  name: 'LCAxKind',
  values: {
    EPD: { value: 'EPD' },
    ASSEMBLY: { value: 'ASSEMBLY' },
  },
})

export const SearchFilters = new GraphQLInputObjectType({
  name: 'SearchFilters',
  fields: {
    unit: { type: UnitFilter },
    location: { type: CountryFilter },
    subtype: { type: SubTypeFilter },
    standard: { type: StandardFilter },
    type: { type: StringFilter },
    publishedDate: { type: StringFilter },
    validUntil: { type: StringFilter },
    classification: { type: StringFilter },
  },
})

export const LCAxSearchResult = new GraphQLUnionType({
  name: 'LCAxSearchResult',
  types: [GraphQLEpd, GraphQLAssembly],
  resolveType: (value) => (value.__typename === 'Assembly' ? 'Assembly' : 'EPD'),
})
