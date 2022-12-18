module.exports = {
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:jest/recommended', 'jest-enzyme', 'plugin:react/recommended'],
  plugins: [
    'babel',
    'import',
    'jsx-a11y',
    'no-use-extend-native',
    'optimize-regex',
    'prettier',
    'promise',
    'react',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'linebreak-style': 'off',
    'arrow-parens': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'never',
        functions: 'never',
      },
    ],
    'object-curly-newline': 'off',
    'no-mixed-operators': 'off',
    'arrow-body-style': 'off',
    'function-paren-newline': 'off',
    'no-plusplus': 'off',
    'no-unused-vars': 'warn',
    'space-before-function-paren': 0,
    'no-underscore-dangle': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

    'max-len': ['warn', 100, 2, { ignoreUrls: true }],
    'no-console': 'warn',
    'no-alert': 'warn',

    'no-param-reassign': 'off',

    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/destructuring-assignment': 'warn',
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', 'jsx'] }],

    'prefer-destructuring': 'off',
    'operator-linebreak': 'off',

    'jsx-a11y/anchor-is-valid': ['warn', { components: ['Link'], specialLink: ['to'] }],
    'jsx-a11y/label-has-for': [
      2,
      {
        required: {
          every: ['id'],
        },
      },
    ],

    'prettier/prettier': ['warn'],
  },
};
