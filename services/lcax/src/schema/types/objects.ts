import { GraphQLFloat, GraphQLObjectType, GraphQLScalarType } from 'graphql'
import { impactCategories, lifeCycleModules } from 'lcax'
import { GraphQLJSONObject } from 'graphql-type-json'

export const JSONObject = new GraphQLScalarType({
  name: 'JSONObject',
  description: GraphQLJSONObject.description,
  serialize: GraphQLJSONObject.serialize,
  parseValue: GraphQLJSONObject.parseValue,
  parseLiteral: GraphQLJSONObject.parseLiteral,
})

export const GraphQLImpactCategory = new GraphQLObjectType({
  name: 'ImpactCategory',
  fields: lifeCycleModules()
    .map((module) => ({ [module]: { type: GraphQLFloat } }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
})

export const GraphQLImpacts = new GraphQLObjectType({
  name: 'Impacts',
  fields: impactCategories()
    .map((impact) => ({ [impact]: { type: GraphQLImpactCategory } }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
})
