import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType,
} from 'graphql/type'
import { GraphQLEpd } from '@/schema/types/epds'
import { GraphQLImpacts, JSONObject } from '@/schema/types/objects'
import { FloatFilter, GraphQLSortOrder, IntFilter, StringFilter } from '@/schema/types/inputs'

export const ProductsFilters: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'ProductsFilters',
  fields: () => ({
    id: { type: StringFilter },
    name: { type: StringFilter },
    type: { type: StringFilter },
    description: { type: StringFilter },
    referenceServiceLife: { type: IntFilter },
    quantity: { type: FloatFilter },
    unit: { type: StringFilter },
    transport: { type: StringFilter },
    organizationId: { type: StringFilter },
    visibility: { type: StringFilter },
    OR: { type: new GraphQLList(ProductsFilters) },
  }),
})

export const ProductsOrderBy = new GraphQLInputObjectType({
  name: 'ProductsOrderBy',
  fields: {
    id: { type: GraphQLSortOrder },
    name: { type: GraphQLSortOrder },
    type: { type: GraphQLSortOrder },
    description: { type: GraphQLSortOrder },
    referenceServiceLife: { type: GraphQLSortOrder },
    quantity: { type: GraphQLSortOrder },
    unit: { type: GraphQLSortOrder },
    transport: { type: GraphQLSortOrder },
  },
})

export const GraphQLProduct = new GraphQLObjectType({
  name: 'Product',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    description: { type: GraphQLString },
    referenceServiceLife: { type: GraphQLInt },
    impactData: { type: new GraphQLList(GraphQLEpd) },
    quantity: { type: GraphQLFloat },
    unit: { type: GraphQLString },
    transport: { type: GraphQLString },
    organizationId: { type: GraphQLString },
    visibility: { type: GraphQLString },
    results: { type: GraphQLImpacts },
    metaData: { type: JSONObject },
  },
})
