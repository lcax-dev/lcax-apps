import { countries, standards, subTypes, units } from 'lcax'
import { GraphQLEnumType } from 'graphql/type'

export const UnitEnum = new GraphQLEnumType({
  name: 'UnitEnum',
  values: units().reduce((acc, unit) => ({ ...acc, [unit]: { value: unit } }), {}),
})

export const StandardEnum = new GraphQLEnumType({
  name: 'StandardEnum',
  values: standards().reduce((acc, standard) => ({ ...acc, [standard]: { value: standard } }), {}),
})

export const CountryEnum = new GraphQLEnumType({
  name: 'CountryEnum',
  values: countries().reduce((acc, country) => ({ ...acc, [country]: { value: country } }), {}),
})

export const SubTypeEnum = new GraphQLEnumType({
  name: 'SubTypeEnum',
  values: subTypes().reduce((acc, subType) => ({ ...acc, [subType]: { value: subType } }), {}),
})
