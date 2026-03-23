import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql/type'
import { GraphQLImpacts } from '@/schema/types/objects'
import { GraphQLAssembly } from '@/schema/types/assemblies'
import { CountryEnum } from '@/schema/types/enums'

export const GraphQLProjectLocation = new GraphQLObjectType({
  name: 'ProjectLocation',
  fields: {
    country: { type: new GraphQLNonNull(CountryEnum) },
    city: { type: GraphQLString },
    address: { type: GraphQLString },
  },
})

export const GraphQLProjectArea = new GraphQLObjectType({
  name: 'ProjectArea',
  fields: {
    value: { type: GraphQLFloat },
    unit: { type: GraphQLString },
    definition: { type: GraphQLString },
  },
})

export const GraphQLProjectInfo = new GraphQLObjectType({
  name: 'ProjectInfo',
  fields: {
    type: { type: GraphQLString },
    buildingType: { type: GraphQLString },
    buildingTypology: { type: new GraphQLList(GraphQLString) },
    certifications: { type: new GraphQLList(GraphQLString) },
    buildingMass: { type: GraphQLFloat },
    buildingHeight: { type: GraphQLFloat },
    grossFloorArea: { type: GraphQLProjectArea },
    heatedFloorArea: { type: GraphQLProjectArea },
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

export const GraphQLSoftwareInfo = new GraphQLObjectType({
  name: 'SoftwareInfo',
  fields: {
    lcaSoftware: { type: GraphQLString },
    lcaSoftwareVersion: { type: GraphQLString },
    goalAndScopeDefinition: { type: GraphQLString },
    calculationType: { type: GraphQLString },
  },
})

export const GraphQLProject = new GraphQLObjectType({
  name: 'Project',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    comment: { type: GraphQLString },
    location: { type: new GraphQLNonNull(GraphQLProjectLocation) },
    owner: { type: GraphQLString },
    formatVersion: { type: new GraphQLNonNull(GraphQLString) },
    lciaMethod: { type: GraphQLString },
    classificationSystems: { type: new GraphQLList(GraphQLString) },
    referenceStudyPeriod: { type: GraphQLInt },
    lifeCycleModules: { type: new GraphQLList(GraphQLString) },
    impactCategories: { type: new GraphQLList(GraphQLString) },
    assemblies: { type: new GraphQLList(GraphQLAssembly) },
    results: { type: GraphQLImpacts },
    projectInfo: { type: GraphQLProjectInfo },
    projectPhase: { type: GraphQLString },
    softwareInfo: { type: GraphQLSoftwareInfo },
    metaData: { type: GraphQLString },
  },
})
