import {
  addEPDResolver,
  calculateAssemblyResolver,
  calculateProductResolver,
  calculateProjectResolver,
  deleteEPDsResolver,
  getEPDsResolver,
  updateEPDsResolver,
  signupResolver,
  loginResolver,
} from '@/schema/resolvers'
import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import {
  EpdsFilters,
  GraphQLEpdsInsertInput,
  EpdsOrderBy,
  EpdsUpdateInput,
  GraphQLEpd,
  GraphQLProject,
  GraphQLProjectInput,
  GraphQLAssembly,
  GraphQLAssemblyInput,
  GraphQLProduct,
  GraphQLProductInput,
  GraphQLCalculationOptionsInput,
  GraphQLAuthResponse,
} from '@/schema/types'

export const graphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      epds: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLEpd))),
        args: {
          where: { type: EpdsFilters },
          offset: { type: GraphQLInt },
          limit: { type: GraphQLInt },
          orderBy: { type: new GraphQLList(EpdsOrderBy) },
        },
        resolve: getEPDsResolver,
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      calculateProject: {
        type: new GraphQLNonNull(GraphQLProject),
        args: {
          project: { type: GraphQLProjectInput },
        },
        resolve: calculateProjectResolver,
      },
      calculateAssembly: {
        type: new GraphQLNonNull(GraphQLAssembly),
        args: {
          assembly: { type: GraphQLAssemblyInput },
          options: { type: GraphQLCalculationOptionsInput },
        },
        resolve: calculateAssemblyResolver,
      },
      calculateProduct: {
        type: new GraphQLNonNull(GraphQLProduct),
        args: {
          product: { type: GraphQLProductInput },
          options: { type: GraphQLCalculationOptionsInput },
        },
        resolve: calculateProductResolver,
      },
      addEpds: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLEpd))),
        args: {
          values: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLEpdsInsertInput))) },
        },
        resolve: addEPDResolver,
      },
      deleteEpds: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLEpd))),
        args: {
          where: { type: EpdsFilters },
        },
        resolve: deleteEPDsResolver,
      },
      updateEpds: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLEpd))),
        args: {
          set: { type: new GraphQLNonNull(EpdsUpdateInput) },
          where: { type: EpdsFilters },
        },
        resolve: updateEPDsResolver,
      },
      signup: {
        type: new GraphQLNonNull(GraphQLAuthResponse),
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
          name: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: signupResolver,
      },
      login: {
        type: new GraphQLNonNull(GraphQLAuthResponse),
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: loginResolver,
      },
    },
  }),
})
