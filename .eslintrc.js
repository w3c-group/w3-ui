module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/typescript/recommended'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'prefer-rest-params': 0,
    'max-len': 0,
    indent: 0,
    'operator-linebreak': 0,
    'comma-dangle': 0,
    'no-trailing-spaces': 0,
    'object-curly-newline': 0,
    'no-param-reassign': 0,
    'no-bitwise': 0,
    'no-control-regex': 0,
    'prefer-destructuring': 0,
    semi: 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
