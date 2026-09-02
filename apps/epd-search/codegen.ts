import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['src/queries/epds.ts', 'src/queries/search.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/queries/generated/': {
      preset: 'client',
      config: {
        enumType: 'string',
      },
    },
  },
}
export default config