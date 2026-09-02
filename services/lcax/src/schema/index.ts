import {
  addEPDResolver,
  addLCAxDataResolver,
  calculateAssemblyResolver,
  calculateProductResolver,
  calculateProjectResolver,
  deleteEPDsResolver,
  deleteOrganizationAssemblyResolver,
  getEPDsResolver,
  getAssembliesResolver,
  getOrganizationAssembliesResolver,
  getOrganizationAssemblyResolver,
  saveOrganizationAssemblyResolver,
  updateEPDsResolver,
  getLCAxStatisticsResolver,
  searchResolver,
} from '@/schema/resolvers'
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'
import {
  EpdsFilters,
  GraphQLEpdsInsertInput,
  GraphQLLCAxInput,
  EpdsOrderBy,
  EpdsUpdateInput,
  GraphQLEpd,
  GraphQLProject,
  GraphQLProjectInput,
  AssembliesFilters,
  AssembliesOrderBy,
  GraphQLAssembly,
  GraphQLAssemblyInput,
  GraphQLOrganizationAssembly,
  GraphQLProduct,
  GraphQLProductInput,
  GraphQLCalculationOptionsInput,
  GraphQLAuthResponse,
  GraphQLUser,
  GraphQLLCAxStatistics,
  JSONObject,
  LCAxKind,
  LCAxSearchResult,
  SaveOrganizationAssemblyInput,
  SearchFilters,
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
      assemblies: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLAssembly))),
        args: {
          where: { type: AssembliesFilters },
          offset: { type: GraphQLInt },
          limit: { type: GraphQLInt },
          orderBy: { type: new GraphQLList(AssembliesOrderBy) },
        },
        resolve: getAssembliesResolver,
      },
      search: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(LCAxSearchResult))),
        args: {
          q: { type: GraphQLString },
          kinds: { type: new GraphQLList(new GraphQLNonNull(LCAxKind)) },
          where: { type: SearchFilters },
          offset: { type: GraphQLInt },
          limit: { type: GraphQLInt },
        },
        resolve: searchResolver,
      },
      lcaxStatistics: {
        type: new GraphQLNonNull(GraphQLLCAxStatistics),
        resolve: getLCAxStatisticsResolver,
      },
      organizationAssemblies: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLOrganizationAssembly))),
        resolve: getOrganizationAssembliesResolver,
      },
      organizationAssembly: {
        type: GraphQLOrganizationAssembly,
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: getOrganizationAssemblyResolver,
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
      addLCAxData: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(JSONObject))),
        args: {
          values: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLLCAxInput))) },
          organizationId: { type: GraphQLString },
          visibility: { type: GraphQLString },
        },
        resolve: addLCAxDataResolver,
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
      saveOrganizationAssembly: {
        type: new GraphQLNonNull(GraphQLOrganizationAssembly),
        args: {
          input: { type: new GraphQLNonNull(SaveOrganizationAssemblyInput) },
        },
        resolve: saveOrganizationAssemblyResolver,
      },
      deleteOrganizationAssembly: {
        type: new GraphQLNonNull(GraphQLBoolean),
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: deleteOrganizationAssemblyResolver,
      },
    },
  }),
})
