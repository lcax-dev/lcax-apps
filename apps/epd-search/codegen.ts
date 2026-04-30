import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'http://localhost:4000/graphql',
    generates: {
        './src/queries/generated/': {
            preset: 'client',
            plugins: ['typescript-operations'],
            config: {
                enumType: 'string',
            }
        },
    }
}
export default config