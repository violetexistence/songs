import eslint from '@eslint/js';
import functional from 'eslint-plugin-functional';
import esImport from 'eslint-plugin-import'; 
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

// https://typescript-eslint.io/

export default [
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    plugins: {
      functional,
      import: esImport,
      react: reactPlugin,
      '@typescript-eslint': ts,
      'react-hooks': hooksPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    files: ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx", "src/**/*.mjs", "src/**/*.md"],
    ignores: ["**/*.config.js", "!**/eslint.config.js", '.next/*'],
    // flat config approach https://github.com/vercel/next.js/discussions/49337
    rules: {
      ...eslint.configs.recommended.rules, //https://eslint.org/docs/latest/rules/
      //...hooksPlugin.configs.recommended.rules,
      //...reactPlugin.configs.recommended.rules,
      //...reactPlugin.configs['jsx-runtime'].rules,
      ...ts.configs['eslint-recommended'].rules,
      ...ts.configs['recommended'].rules,
      //...ts.configs['recommended-requiring-type-checking'].rules,
      "no-unused-vars": "off",
      "no-undef": "warn"
    },
  },
];