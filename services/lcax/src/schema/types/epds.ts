import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/type'
import { CountryEnum, StandardEnum, SubTypeEnum, UnitEnum } from '@/schema/types/enums'
import { GraphQLImpacts, JSONObject } from '@/schema/types/objects'

export const GraphQLEPDSource = new GraphQLObjectType({
  name: 'EPDSource',
  fields: {
    name: { type: GraphQLString },
    url: { type: GraphQLString },
  },
})

export const GraphQLEPDConversion = new GraphQLObjectType({
  name: 'EPDConversion',
  fields: {
    value: { type: GraphQLFloat },
    to: { type: GraphQLString },
    metaData: { type: GraphQLString },
  },
})

export const GraphQLSortOrder = new GraphQLEnumType({
  name: 'SortOrder',
  values: {
    asc: { value: 'asc' },
    desc: { value: 'desc' },
  },
})

export const StringFilter = new GraphQLInputObjectType({
  name: 'StringFilter',
  fields: {
    eq: { type: GraphQLString },
    isNull: { type: GraphQLBoolean },
  },
})

export const IntFilter = new GraphQLInputObjectType({
  name: 'IntFilter',
  fields: {
    eq: { type: GraphQLInt },
    isNull: { type: GraphQLBoolean },
  },
})

export const UnitFilter = new GraphQLInputObjectType({
  name: 'UnitFilter',
  fields: {
    eq: { type: UnitEnum },
    isNull: { type: GraphQLBoolean },
  },
})

export const StandardFilter = new GraphQLInputObjectType({
  name: 'StandardFilter',
  fields: {
    eq: { type: StandardEnum },
    isNull: { type: GraphQLBoolean },
  },
})

export const CountryFilter = new GraphQLInputObjectType({
  name: 'CountryFilter',
  fields: {
    eq: { type: CountryEnum },
    isNull: { type: GraphQLBoolean },
  },
})

export const SubTypeFilter = new GraphQLInputObjectType({
  name: 'SubTypeFilter',
  fields: {
    eq: { type: SubTypeEnum },
    isNull: { type: GraphQLBoolean },
  },
})

export const EpdsFilters: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'EpdsFilters',
  fields: () => ({
    id: { type: StringFilter },
    name: { type: StringFilter },
    type: { type: StringFilter },
    version: { type: StringFilter },
    publishedDate: { type: StringFilter },
    validUntil: { type: StringFilter },
    declaredUnit: { type: UnitFilter },
    standard: { type: StandardFilter },
    location: { type: CountryFilter },
    subtype: { type: SubTypeFilter },
    comment: { type: StringFilter },
    referenceServiceLife: { type: IntFilter },
    OR: { type: new GraphQLList(EpdsFilters) },
  }),
})

export const EpdsOrderBy = new GraphQLInputObjectType({
  name: 'EpdsOrderBy',
  fields: {
    id: { type: GraphQLSortOrder },
    name: { type: GraphQLSortOrder },
    type: { type: GraphQLSortOrder },
    version: { type: GraphQLSortOrder },
    publishedDate: { type: GraphQLSortOrder },
    validUntil: { type: GraphQLSortOrder },
    declaredUnit: { type: GraphQLSortOrder },
    standard: { type: GraphQLSortOrder },
    location: { type: GraphQLSortOrder },
    subtype: { type: GraphQLSortOrder },
    comment: { type: GraphQLSortOrder },
    referenceServiceLife: { type: GraphQLSortOrder },
  },
})

export const GraphQLEpd = new GraphQLObjectType({
  name: 'EPD',
  fields: {
    id: { type: GraphQLString },
    epdId: { type: GraphQLString },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    declaredUnit: {
      type: UnitEnum,
    },
    version: { type: GraphQLString },
    publishedDate: { type: GraphQLString },
    validUntil: { type: GraphQLString },
    referenceServiceLife: { type: GraphQLInt },
    standard: {
      type: StandardEnum,
    },
    comment: { type: GraphQLString },
    location: {
      type: CountryEnum,
    },
    subtype: {
      type: SubTypeEnum,
    },
    metaData: { type: JSONObject },
    workspaceId: { type: GraphQLString },
    projectId: { type: GraphQLString },
    modelId: { type: GraphQLString },
    source: { type: GraphQLEPDSource },
    conversions: { type: new GraphQLList(GraphQLEPDConversion) },
    impacts: { type: GraphQLImpacts },
  },
})
