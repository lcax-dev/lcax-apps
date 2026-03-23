import { GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLString } from 'graphql/type'
import { JSONObject } from '@/schema/types/objects'
import { impactCategories, lifeCycleModules } from 'lcax'

export const GraphQLImpactCategoryInput = new GraphQLInputObjectType({
  name: 'ImpactCategoryInput',
  fields: lifeCycleModules()
    .map((module) => ({ [module]: { type: GraphQLFloat } }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
})

export const GraphQLEPDImpactInput = new GraphQLInputObjectType({
  name: 'EPDImpactInput',
  fields: impactCategories()
    .map((impact) => ({ [impact]: { type: GraphQLImpactCategoryInput } }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
})

export const GraphQLEPDSourceInput = new GraphQLInputObjectType({
  name: 'EPDSourceInput',
  fields: {
    name: { type: GraphQLString },
    url: { type: GraphQLString },
  },
})

export const GraphQLEPDConversionInput = new GraphQLList(
  new GraphQLInputObjectType({
    name: 'EPDConversionInput',
    fields: {
      value: { type: GraphQLFloat },
      to: { type: GraphQLString },
      metaData: { type: GraphQLString },
    },
  }),
)

export const GraphQLClassificationInput = new GraphQLInputObjectType({
  name: 'ClassificationInput',
  fields: {
    name: { type: GraphQLString },
    system: { type: GraphQLString },
    code: { type: GraphQLString },
  },
})

export const GraphQLImpactInput = new GraphQLInputObjectType({
  name: 'ImpactInput',
  fields: impactCategories()
    .map((impact) => ({ [impact]: { type: GraphQLImpactCategoryInput } }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
})

export const GraphQLEpdsInsertInput = new GraphQLInputObjectType({
  name: 'EpdsInsertInput',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    declaredUnit: { type: GraphQLString },
    version: { type: GraphQLString },
    publishedDate: { type: GraphQLString },
    validUntil: { type: GraphQLString },
    referenceServiceLife: { type: GraphQLInt },
    standard: { type: GraphQLString },
    comment: { type: GraphQLString },
    location: { type: GraphQLString },
    subtype: { type: GraphQLString },
    formatVersion: { type: GraphQLString },
    metaData: { type: JSONObject },
    source: { type: GraphQLEPDSourceInput },
    conversions: { type: GraphQLEPDConversionInput },
    impacts: { type: GraphQLEPDImpactInput },
  },
})

export const EpdsUpdateInput = new GraphQLInputObjectType({
  name: 'EpdsUpdateInput',
  fields: {
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    declaredUnit: { type: GraphQLString },
    version: { type: GraphQLString },
    publishedDate: { type: GraphQLString },
    validUntil: { type: GraphQLString },
    referenceServiceLife: { type: GraphQLInt },
    standard: { type: GraphQLString },
    comment: { type: GraphQLString },
    location: { type: GraphQLString },
    subtype: { type: GraphQLString },
    metaData: { type: JSONObject },
    source: { type: GraphQLEPDSourceInput },
  },
})

export const GraphQLProductInput = new GraphQLInputObjectType({
  name: 'ProductInput',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    description: { type: GraphQLString },
    referenceServiceLife: { type: GraphQLInt },
    impactData: { type: new GraphQLList(GraphQLEpdsInsertInput) },
    quantity: { type: GraphQLFloat },
    unit: { type: GraphQLString },
    transport: { type: GraphQLString },
    results: { type: GraphQLImpactInput },
    metaData: { type: GraphQLString },
  }),
})

export const GraphQLAssemblyInput = new GraphQLInputObjectType({
  name: 'AssemblyInput',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    description: { type: GraphQLString },
    comment: { type: GraphQLString },
    quantity: { type: GraphQLFloat },
    unit: { type: GraphQLString },
    classification: { type: new GraphQLList(GraphQLClassificationInput) },
    products: { type: new GraphQLList(GraphQLProductInput) },
    results: { type: GraphQLImpactInput },
    workspaceId: { type: GraphQLString },
    projectId: { type: GraphQLString },
    modelId: { type: GraphQLString },
    metaData: { type: GraphQLString },
  }),
})

export const GraphQLProjectLocationInput = new GraphQLInputObjectType({
  name: 'ProjectLocationInput',
  fields: {
    country: { type: GraphQLString },
    city: { type: GraphQLString },
    address: { type: GraphQLString },
  },
})

export const GraphQLProjectAreaInput = new GraphQLInputObjectType({
  name: 'ProjectAreaInput',
  fields: {
    value: { type: GraphQLFloat },
    unit: { type: GraphQLString },
    definition: { type: GraphQLString },
  },
})

export const GraphQLProjectInfoInput = new GraphQLInputObjectType({
  name: 'ProjectInfoInput',
  fields: {
    type: { type: GraphQLString },
    buildingType: { type: GraphQLString },
    buildingTypology: { type: new GraphQLList(GraphQLString) },
    certifications: { type: new GraphQLList(GraphQLString) },
    buildingMass: { type: GraphQLFloat },
    buildingHeight: { type: GraphQLFloat },
    grossFloorArea: { type: GraphQLProjectAreaInput },
    heatedFloorArea: { type: GraphQLProjectAreaInput },
    buildingFootprint: { type: GraphQLFloat },
    floorsAboveGround: { type: GraphQLInt },
    floorsBelowGround: { type: GraphQLInt },
    roofType: { type: GraphQLString },
    frameType: { type: GraphQLString },
    buildingCompletionYear: { type: GraphQLInt },
    buildingPermitYear: { type: GraphQLInt },
    energyDemandHeating: { type: GraphQLFloat },
    energySupplyHeating: { type: GraphQLFloat },
    energyDemandElectricity: { type: GraphQLFloat },
    energySupplyElectricity: { type: GraphQLFloat },
    exportedElectricity: { type: GraphQLFloat },
    generalEnergyClass: { type: GraphQLString },
    localEnergyClass: { type: GraphQLString },
    buildingUsers: { type: GraphQLInt },
    buildingModelScope: { type: new GraphQLList(GraphQLString) },
  },
})

export const GraphQLSoftwareInfoInput = new GraphQLInputObjectType({
  name: 'SoftwareInfoInput',
  fields: {
    lcaSoftware: { type: GraphQLString },
    lcaSoftwareVersion: { type: GraphQLString },
    goalAndScopeDefinition: { type: GraphQLString },
    calculationType: { type: GraphQLString },
  },
})

export const GraphQLProjectInput = new GraphQLInputObjectType({
  name: 'ProjectInput',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    comment: { type: GraphQLString },
    location: { type: GraphQLProjectLocationInput },
    owner: { type: GraphQLString },
    formatVersion: { type: GraphQLString },
    lciaMethod: { type: GraphQLString },
    classificationSystems: { type: new GraphQLList(GraphQLString) },
    referenceStudyPeriod: { type: GraphQLInt },
    lifeCycleModules: { type: new GraphQLList(GraphQLString) },
    impactCategories: { type: new GraphQLList(GraphQLString) },
    assemblies: { type: new GraphQLList(GraphQLAssemblyInput) },
    results: { type: GraphQLImpactInput },
    projectInfo: { type: GraphQLProjectInfoInput },
    projectPhase: { type: GraphQLString },
    softwareInfo: { type: GraphQLSoftwareInfoInput },
    metaData: { type: GraphQLString },
  }),
})
