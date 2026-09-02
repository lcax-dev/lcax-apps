import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType,
} from 'graphql/type'
import { UnitEnum } from '@/schema/types/enums'
import { GraphQLProduct } from '@/schema/types/products'
import { GraphQLEpd } from '@/schema/types/epds'
import { GraphQLImpacts, JSONObject } from '@/schema/types/objects'
import {
  FloatFilter,
  GraphQLClassificationInput,
  GraphQLSortOrder,
  StringFilter,
  UnitFilter,
} from '@/schema/types/inputs'

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

export const OrganizationAssemblySaveKind = new GraphQLEnumType({
  name: 'OrganizationAssemblySaveKind',
  values: {
    DRAFT: { value: 'DRAFT' },
    COMPLETE: { value: 'COMPLETE' },
  },
})

export const GraphQLOrganizationAssemblyProductImpactRef = new GraphQLObjectType({
  name: 'OrganizationAssemblyProductImpactRef',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    version: { type: new GraphQLNonNull(GraphQLString) },
    epd: { type: GraphQLEpd },
  }),
})

export const GraphQLOrganizationAssemblyProduct = new GraphQLObjectType({
  name: 'OrganizationAssemblyProduct',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    quantity: { type: new GraphQLNonNull(GraphQLFloat) },
    unit: { type: new GraphQLNonNull(GraphQLString) },
    referenceServiceLife: { type: new GraphQLNonNull(GraphQLFloat) },
    classification: { type: new GraphQLNonNull(new GraphQLList(GraphQLClassification)) },
    impactData: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLOrganizationAssemblyProductImpactRef))),
    },
    results: { type: GraphQLImpacts },
  }),
})

export const GraphQLOrganizationAssembly = new GraphQLObjectType({
  name: 'OrganizationAssembly',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    comment: { type: GraphQLString },
    quantity: { type: new GraphQLNonNull(GraphQLFloat) },
    unit: { type: new GraphQLNonNull(GraphQLString) },
    classification: { type: new GraphQLNonNull(new GraphQLList(GraphQLClassification)) },
    visibility: { type: new GraphQLNonNull(GraphQLString) },
    incomplete: { type: new GraphQLNonNull(GraphQLBoolean) },
    productCount: { type: new GraphQLNonNull(GraphQLInt) },
    products: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLOrganizationAssemblyProduct))) },
    results: { type: GraphQLImpacts },
    organizationId: { type: GraphQLString },
  }),
})

export const OrganizationAssemblyProductImpactRefInput = new GraphQLInputObjectType({
  name: 'OrganizationAssemblyProductImpactRefInput',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    version: { type: new GraphQLNonNull(GraphQLString) },
  },
})

export const OrganizationAssemblyProductWriteInput = new GraphQLInputObjectType({
  name: 'OrganizationAssemblyProductWriteInput',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    quantity: { type: GraphQLFloat },
    unit: { type: GraphQLString },
    referenceServiceLife: { type: GraphQLFloat },
    classification: { type: new GraphQLList(GraphQLClassificationInput) },
    impactData: { type: new GraphQLList(new GraphQLNonNull(OrganizationAssemblyProductImpactRefInput)) },
  }),
})

export const OrganizationAssemblyWriteInput = new GraphQLInputObjectType({
  name: 'OrganizationAssemblyWriteInput',
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    comment: { type: GraphQLString },
    quantity: { type: GraphQLFloat },
    unit: { type: GraphQLString },
    classification: { type: new GraphQLList(GraphQLClassificationInput) },
    products: { type: new GraphQLList(new GraphQLNonNull(OrganizationAssemblyProductWriteInput)) },
  }),
})

export const SaveOrganizationAssemblyInput = new GraphQLInputObjectType({
  name: 'SaveOrganizationAssemblyInput',
  fields: () => ({
    id: { type: GraphQLString },
    kind: { type: new GraphQLNonNull(OrganizationAssemblySaveKind) },
    visibility: { type: GraphQLString },
    confirmForcePublish: { type: GraphQLBoolean },
    confirmPrivatize: { type: GraphQLBoolean },
    results: { type: JSONObject },
    assembly: { type: new GraphQLNonNull(OrganizationAssemblyWriteInput) },
  }),
})
