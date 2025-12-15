import globals from "globals";
import { defineConfig } from "eslint/config";
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin'
import graphqlPlugin from '@graphql-eslint/eslint-plugin'

export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic/js': stylisticJs,
      '@graphql-eslint': graphqlPlugin,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
  },

  // Lint GraphQL operations inside JS/TS via gql tags and magic comments
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@graphql-eslint': graphqlPlugin,
    },
    rules: {
      // Validates operations found in gql`` and /* GraphQL */ comments
      '@graphql-eslint/no-anonymous-operations': 'error',
      '@graphql-eslint/unique-operation-name': 'error',
      '@graphql-eslint/known-type-names': 'error',
      '@graphql-eslint/no-deprecated': 'warn',
      '@graphql-eslint/no-unused-fragments': 'warn',
      // If you need stricter checks, you can add more rules from the docs.
    },
    settings: {
      // Tell the plugin how to find schema/documents (reads your GraphQL Config)
      'graphql/schema': 'graphql-config',
      'graphql/documents': 'graphql-config',
    },
  },

  //Lint .graphql/.gql files as well
  {
    files: ['**/*.{graphql,gql}'],
    plugins: {
      '@graphql-eslint': graphqlPlugin,
    },
    languageOptions: {
      parser: graphqlPlugin.parser, // use the plugin’s parser for GraphQL files
    },
    rules: {
      '@graphql-eslint/known-type-names': 'error',
      '@graphql-eslint/no-deprecated': 'warn',
      '@graphql-eslint/unique-operation-name': 'error',
      '@graphql-eslint/no-unused-fragments': 'warn',
    },
  },

  {
    ignores: ['dist/**'],
  },
]);