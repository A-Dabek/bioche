module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'block-spacing': 'off',
    // 'space-before-function-paren': 'off'
    'no-inner-declarations': 'off',
    'space-before-function-paren': 'off',
    'semi': 'off',
    'object-curly-spacing': 'off',
    'comma-dangle': 'off',
    'no-trailing-spaces': 'off'
  },
  parserOptions: {
    parser: 'typescript-eslint-parser'
  }
}
