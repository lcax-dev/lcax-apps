import { countries, standards, subTypes, units } from 'lcax'
import { GraphQLEnumType } from 'graphql/type'

export const UnitEnum = new GraphQLEnumType({
  name: 'UnitEnum',
  values: units().reduce((acc, unit) => ({ ...acc, [unit.toUpperCase()]: { value: unit } }), {}),
})

export const StandardEnum = new GraphQLEnumType({
  name: 'StandardEnum',
  values: standards().reduce((acc, standard) => {
    const key = standard.toUpperCase().replace('EN15804A', 'EN15804_A')
    return { ...acc, [key]: { value: standard } }
  }, {}),
})

export const CountryEnum = new GraphQLEnumType({
  name: 'CountryEnum',
  values: countries().reduce((acc, country) => ({ ...acc, [country.toUpperCase()]: { value: country } }), {}),
})

export const SubTypeEnum = new GraphQLEnumType({
  name: 'SubTypeEnum',
  values: subTypes().reduce((acc, subType) => {
    const key = subType.charAt(0).toUpperCase() + subType.slice(1)
    return { ...acc, [key]: { value: subType } }
  }, {}),
})
