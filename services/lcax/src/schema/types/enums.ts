import { countries, standards, subTypes, units } from 'lcax'
import { GraphQLEnumType } from 'graphql/type'

export const UnitEnum = new GraphQLEnumType({
  name: 'UnitEnum',
  values: units().reduce((acc, unit) => ({ ...acc, [unit.toUpperCase()]: { value: unit.toUpperCase() } }), {}),
})

export const StandardEnum = new GraphQLEnumType({
  name: 'StandardEnum',
  values: standards().reduce((acc, standard) => {
    const value = standard.toUpperCase().replace('EN15804A', 'EN15804_A')
    return { ...acc, [value]: { value } }
  }, {}),
})

export const CountryEnum = new GraphQLEnumType({
  name: 'CountryEnum',
  values: countries().reduce(
    (acc, country) => ({ ...acc, [country.toUpperCase()]: { value: country.toUpperCase() } }),
    {},
  ),
})

export const SubTypeEnum = new GraphQLEnumType({
  name: 'SubTypeEnum',
  values: subTypes().reduce((acc, subType) => {
    const value = subType.charAt(0).toUpperCase() + subType.slice(1)
    return { ...acc, [value]: { value } }
  }, {}),
})
