import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/type'
import { CountryEnum, StandardEnum, SubTypeEnum, UnitEnum } from '@/schema/types/enums'
import { GraphQLImpacts, JSONObject } from '@/schema/types/objects'
import {
  CountryFilter,
  IntFilter,
  StandardFilter,
  StringFilter,
  SubTypeFilter,
  UnitFilter,
  GraphQLSortOrder,
} from '@/schema/types/inputs'

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
    organizationId: { type: StringFilter },
    visibility: { type: StringFilter },
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
    organizationId: { type: GraphQLString },
    visibility: { type: GraphQLString },
    metaData: { type: JSONObject },
    workspaceId: { type: GraphQLString },
    projectId: { type: GraphQLString },
    modelId: { type: GraphQLString },
    source: { type: GraphQLEPDSource },
    conversions: { type: new GraphQLList(GraphQLEPDConversion) },
    impacts: { type: GraphQLImpacts },
  },
})
