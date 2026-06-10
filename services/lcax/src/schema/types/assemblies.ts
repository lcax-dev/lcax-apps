import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInputObjectType,
} from 'graphql/type'
import { UnitEnum } from '@/schema/types/enums'
import { GraphQLProduct } from '@/schema/types/products'
import { GraphQLImpacts, JSONObject } from '@/schema/types/objects'
import { FloatFilter, GraphQLSortOrder, StringFilter, UnitFilter } from '@/schema/types/inputs'

export const AssembliesFilters: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'AssembliesFilters',
  fields: () => ({
    id: { type: StringFilter },
    name: { type: StringFilter },
    type: { type: StringFilter },
    description: { type: StringFilter },
    comment: { type: StringFilter },
    quantity: { type: FloatFilter },
    unit: { type: UnitFilter },
    organizationId: { type: StringFilter },
    visibility: { type: StringFilter },
    OR: { type: new GraphQLList(AssembliesFilters) },
  }),
})

export const AssembliesOrderBy = new GraphQLInputObjectType({
  name: 'AssembliesOrderBy',
  fields: {
    id: { type: GraphQLSortOrder },
    name: { type: GraphQLSortOrder },
    type: { type: GraphQLSortOrder },
    description: { type: GraphQLSortOrder },
    comment: { type: GraphQLSortOrder },
    quantity: { type: GraphQLSortOrder },
    unit: { type: GraphQLSortOrder },
  },
})

export const GraphQLClassification = new GraphQLObjectType({
  name: 'Classification',
  fields: {
    name: { type: GraphQLString },
    system: { type: GraphQLString },
    code: { type: GraphQLString },
  },
})

export const GraphQLAssembly = new GraphQLObjectType({
  name: 'Assembly',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    comment: { type: GraphQLString },
    quantity: { type: new GraphQLNonNull(GraphQLFloat) },
    unit: {
      type: new GraphQLNonNull(UnitEnum),
    },
    classification: { type: new GraphQLNonNull(new GraphQLList(GraphQLClassification)) },
    products: { type: new GraphQLNonNull(new GraphQLList(GraphQLProduct)) },
    organizationId: { type: GraphQLString },
    visibility: { type: GraphQLString },
    results: { type: GraphQLImpacts },
    metaData: { type: JSONObject },
    workspaceId: { type: GraphQLString },
    projectId: { type: GraphQLString },
    modelId: { type: GraphQLString },
  },
})
