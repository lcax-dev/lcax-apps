/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  query getAssembly($id: String!) {\n    assemblies(where: { id: { eq: $id } }, limit: 1) {\n      id\n      name\n      description\n      quantity\n      unit\n      classification {\n        name\n        system\n        code\n      }\n      products {\n        id\n        name\n        quantity\n        unit\n        impactData {\n          id\n          name\n        }\n      }\n      results {\n        gwp {\n          a1a3\n        }\n        odp {\n          a1a3\n        }\n        ap {\n          a1a3\n        }\n        ep {\n          a1a3\n        }\n        pocp {\n          a1a3\n        }\n        adpe {\n          a1a3\n        }\n        adpf {\n          a1a3\n        }\n      }\n    }\n  }\n': typeof types.GetAssemblyDocument
  '\n  mutation addEpds($values: [EpdsInsertInput!]!) {\n    addEpds(values: $values) {\n      id\n      name\n    }\n  }\n': typeof types.AddEpdsDocument
  '\n  mutation addLCAxData($values: [LCAxInput!]!, $organizationId: String, $visibility: String) {\n    addLCAxData(values: $values, organizationId: $organizationId, visibility: $visibility)\n  }\n': typeof types.AddLcAxDataDocument
  '\n  query getEpd($id: String!) {\n    epds(where: { id: { eq: $id } }, limit: 1) {\n      id\n      name\n      epdId\n      type\n      declaredUnit\n      version\n      publishedDate\n      validUntil\n      referenceServiceLife\n      standard\n      location\n      subtype\n      metaData\n      source {\n        name\n        url\n      }\n      conversions {\n        value\n        to\n        metaData\n      }\n      impacts {\n        gwp {\n          a1a3\n          a4\n          a5\n          b1\n          b2\n          b3\n          b4\n          b5\n          b6\n          b7\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        odp {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        ap {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        ep {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        pocp {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        adpe {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        adpf {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n      }\n    }\n  }\n': typeof types.GetEpdDocument
  '\n  query searchEpds($where: EpdsFilters, $limit: Int, $offset: Int) {\n    epds(where: $where, limit: $limit, offset: $offset) {\n      id\n      name\n      declaredUnit\n      location\n      subtype\n      type\n      standard\n      publishedDate\n      validUntil\n      metaData\n    }\n  }\n': typeof types.SearchEpdsDocument
  '\n  query getLcaxStatistics {\n    lcaxStatistics {\n      totalCount\n      epdsCount\n      assembliesCount\n      productsCount\n      uploads {\n        date\n        count\n        epds\n        assemblies\n        products\n      }\n    }\n  }\n': typeof types.GetLcaxStatisticsDocument
  '\n  query search($q: String, $kinds: [LCAxKind!], $where: SearchFilters, $limit: Int, $offset: Int) {\n    search(q: $q, kinds: $kinds, where: $where, limit: $limit, offset: $offset) {\n      __typename\n      ... on EPD {\n        epdId: id\n        epdName: name\n        declaredUnit\n        location\n        subtype\n        metaData\n      }\n      ... on Assembly {\n        assemblyId: id\n        assemblyName: name\n        unit\n        classification {\n          name\n        }\n      }\n    }\n  }\n': typeof types.SearchDocument
}
const documents: Documents = {
  '\n  query getAssembly($id: String!) {\n    assemblies(where: { id: { eq: $id } }, limit: 1) {\n      id\n      name\n      description\n      quantity\n      unit\n      classification {\n        name\n        system\n        code\n      }\n      products {\n        id\n        name\n        quantity\n        unit\n        impactData {\n          id\n          name\n        }\n      }\n      results {\n        gwp {\n          a1a3\n        }\n        odp {\n          a1a3\n        }\n        ap {\n          a1a3\n        }\n        ep {\n          a1a3\n        }\n        pocp {\n          a1a3\n        }\n        adpe {\n          a1a3\n        }\n        adpf {\n          a1a3\n        }\n      }\n    }\n  }\n':
    types.GetAssemblyDocument,
  '\n  mutation addEpds($values: [EpdsInsertInput!]!) {\n    addEpds(values: $values) {\n      id\n      name\n    }\n  }\n':
    types.AddEpdsDocument,
  '\n  mutation addLCAxData($values: [LCAxInput!]!, $organizationId: String, $visibility: String) {\n    addLCAxData(values: $values, organizationId: $organizationId, visibility: $visibility)\n  }\n':
    types.AddLcAxDataDocument,
  '\n  query getEpd($id: String!) {\n    epds(where: { id: { eq: $id } }, limit: 1) {\n      id\n      name\n      epdId\n      type\n      declaredUnit\n      version\n      publishedDate\n      validUntil\n      referenceServiceLife\n      standard\n      location\n      subtype\n      metaData\n      source {\n        name\n        url\n      }\n      conversions {\n        value\n        to\n        metaData\n      }\n      impacts {\n        gwp {\n          a1a3\n          a4\n          a5\n          b1\n          b2\n          b3\n          b4\n          b5\n          b6\n          b7\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        odp {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        ap {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        ep {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        pocp {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        adpe {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        adpf {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n      }\n    }\n  }\n':
    types.GetEpdDocument,
  '\n  query searchEpds($where: EpdsFilters, $limit: Int, $offset: Int) {\n    epds(where: $where, limit: $limit, offset: $offset) {\n      id\n      name\n      declaredUnit\n      location\n      subtype\n      type\n      standard\n      publishedDate\n      validUntil\n      metaData\n    }\n  }\n':
    types.SearchEpdsDocument,
  '\n  query getLcaxStatistics {\n    lcaxStatistics {\n      totalCount\n      epdsCount\n      assembliesCount\n      productsCount\n      uploads {\n        date\n        count\n        epds\n        assemblies\n        products\n      }\n    }\n  }\n':
    types.GetLcaxStatisticsDocument,
  '\n  query search($q: String, $kinds: [LCAxKind!], $where: SearchFilters, $limit: Int, $offset: Int) {\n    search(q: $q, kinds: $kinds, where: $where, limit: $limit, offset: $offset) {\n      __typename\n      ... on EPD {\n        epdId: id\n        epdName: name\n        declaredUnit\n        location\n        subtype\n        metaData\n      }\n      ... on Assembly {\n        assemblyId: id\n        assemblyName: name\n        unit\n        classification {\n          name\n        }\n      }\n    }\n  }\n':
    types.SearchDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getAssembly($id: String!) {\n    assemblies(where: { id: { eq: $id } }, limit: 1) {\n      id\n      name\n      description\n      quantity\n      unit\n      classification {\n        name\n        system\n        code\n      }\n      products {\n        id\n        name\n        quantity\n        unit\n        impactData {\n          id\n          name\n        }\n      }\n      results {\n        gwp {\n          a1a3\n        }\n        odp {\n          a1a3\n        }\n        ap {\n          a1a3\n        }\n        ep {\n          a1a3\n        }\n        pocp {\n          a1a3\n        }\n        adpe {\n          a1a3\n        }\n        adpf {\n          a1a3\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query getAssembly($id: String!) {\n    assemblies(where: { id: { eq: $id } }, limit: 1) {\n      id\n      name\n      description\n      quantity\n      unit\n      classification {\n        name\n        system\n        code\n      }\n      products {\n        id\n        name\n        quantity\n        unit\n        impactData {\n          id\n          name\n        }\n      }\n      results {\n        gwp {\n          a1a3\n        }\n        odp {\n          a1a3\n        }\n        ap {\n          a1a3\n        }\n        ep {\n          a1a3\n        }\n        pocp {\n          a1a3\n        }\n        adpe {\n          a1a3\n        }\n        adpf {\n          a1a3\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation addEpds($values: [EpdsInsertInput!]!) {\n    addEpds(values: $values) {\n      id\n      name\n    }\n  }\n',
): (typeof documents)['\n  mutation addEpds($values: [EpdsInsertInput!]!) {\n    addEpds(values: $values) {\n      id\n      name\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation addLCAxData($values: [LCAxInput!]!, $organizationId: String, $visibility: String) {\n    addLCAxData(values: $values, organizationId: $organizationId, visibility: $visibility)\n  }\n',
): (typeof documents)['\n  mutation addLCAxData($values: [LCAxInput!]!, $organizationId: String, $visibility: String) {\n    addLCAxData(values: $values, organizationId: $organizationId, visibility: $visibility)\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getEpd($id: String!) {\n    epds(where: { id: { eq: $id } }, limit: 1) {\n      id\n      name\n      epdId\n      type\n      declaredUnit\n      version\n      publishedDate\n      validUntil\n      referenceServiceLife\n      standard\n      location\n      subtype\n      metaData\n      source {\n        name\n        url\n      }\n      conversions {\n        value\n        to\n        metaData\n      }\n      impacts {\n        gwp {\n          a1a3\n          a4\n          a5\n          b1\n          b2\n          b3\n          b4\n          b5\n          b6\n          b7\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        odp {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        ap {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        ep {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        pocp {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        adpe {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        adpf {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query getEpd($id: String!) {\n    epds(where: { id: { eq: $id } }, limit: 1) {\n      id\n      name\n      epdId\n      type\n      declaredUnit\n      version\n      publishedDate\n      validUntil\n      referenceServiceLife\n      standard\n      location\n      subtype\n      metaData\n      source {\n        name\n        url\n      }\n      conversions {\n        value\n        to\n        metaData\n      }\n      impacts {\n        gwp {\n          a1a3\n          a4\n          a5\n          b1\n          b2\n          b3\n          b4\n          b5\n          b6\n          b7\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        odp {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        ap {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        ep {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        pocp {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        adpe {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n        adpf {\n          a1a3\n          a4\n          a5\n          c1\n          c2\n          c3\n          c4\n          d\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query searchEpds($where: EpdsFilters, $limit: Int, $offset: Int) {\n    epds(where: $where, limit: $limit, offset: $offset) {\n      id\n      name\n      declaredUnit\n      location\n      subtype\n      type\n      standard\n      publishedDate\n      validUntil\n      metaData\n    }\n  }\n',
): (typeof documents)['\n  query searchEpds($where: EpdsFilters, $limit: Int, $offset: Int) {\n    epds(where: $where, limit: $limit, offset: $offset) {\n      id\n      name\n      declaredUnit\n      location\n      subtype\n      type\n      standard\n      publishedDate\n      validUntil\n      metaData\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getLcaxStatistics {\n    lcaxStatistics {\n      totalCount\n      epdsCount\n      assembliesCount\n      productsCount\n      uploads {\n        date\n        count\n        epds\n        assemblies\n        products\n      }\n    }\n  }\n',
): (typeof documents)['\n  query getLcaxStatistics {\n    lcaxStatistics {\n      totalCount\n      epdsCount\n      assembliesCount\n      productsCount\n      uploads {\n        date\n        count\n        epds\n        assemblies\n        products\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query search($q: String, $kinds: [LCAxKind!], $where: SearchFilters, $limit: Int, $offset: Int) {\n    search(q: $q, kinds: $kinds, where: $where, limit: $limit, offset: $offset) {\n      __typename\n      ... on EPD {\n        epdId: id\n        epdName: name\n        declaredUnit\n        location\n        subtype\n        metaData\n      }\n      ... on Assembly {\n        assemblyId: id\n        assemblyName: name\n        unit\n        classification {\n          name\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query search($q: String, $kinds: [LCAxKind!], $where: SearchFilters, $limit: Int, $offset: Int) {\n    search(q: $q, kinds: $kinds, where: $where, limit: $limit, offset: $offset) {\n      __typename\n      ... on EPD {\n        epdId: id\n        epdName: name\n        declaredUnit\n        location\n        subtype\n        metaData\n      }\n      ... on Assembly {\n        assemblyId: id\n        assemblyName: name\n        unit\n        classification {\n          name\n        }\n      }\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
