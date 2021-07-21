/* eslint-disable quotes */
module.exports = {
  env: {
    es2021: true,
    jest: true,
  },

  plugins: ['@typescript-eslint', 'react', 'eslint-plugin-import', 'prettier'],

  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],

    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/prop-types': 'off',
    'no-shadow': [
      'error',
      { builtinGlobals: false, hoist: 'functions', allow: [] },
    ],
  },
};
