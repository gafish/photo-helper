const prettierrc = require('./.prettierrc.js')

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      legacyDecorators: true,
      experimentalDecorators: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
  ],
  plugins: ['react', 'prettier', '@typescript-eslint', 'jest', 'react-hooks'],
  globals: {
    API_SERVER_PLACEHOLDER: true,
    RANDOM_PLACEHOLDER: true,
    getValue: true,
    _throttle: true,
    _isObject: true,
    _cloneDeep: true,
    _debounce: true,
    _isEqual: true,
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    semi: 'off',
    'eol-last': 'warn',
    'no-cond-assign': 'warn',
    'no-trailing-spaces': 'warn',
    'comma-dangle': ['warn', 'always-multiline'],
    // react
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
    // prettier
    'prettier/prettier': ['warn', prettierrc],
    // @typescript-eslint
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    // react-hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // jest
    'jest/valid-describe': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    polyfills: ['promises', 'fetch'],
  },
}
