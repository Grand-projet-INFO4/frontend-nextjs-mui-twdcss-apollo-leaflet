import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:5000/graphql",
  documents: "./src/**/*.ts",
  ignoreNoDocuments: true,
  generates: {
    "src/graphql/": {
      preset: "client",
      plugins: [],
    },
    "src/graphql/graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
