import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'schema.graphql',
  documents: 'src/**/*.ts',
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        onlyOperationTypes: true,
        declarationKind: 'interface',
        skipTypename: true,
      },
      schema: 'schema.graphql',
    },
  },
};

export default config;
