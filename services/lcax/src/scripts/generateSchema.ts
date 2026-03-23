import { graphQLSchema } from '../schema'; import { printSchema } from 'graphql'; import { writeFileSync } from 'fs'; writeFileSync('./schema.graphql', printSchema(graphQLSchema));
