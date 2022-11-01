module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    // semi: ['error', 'never'],
    semi: 0,
    // quotes: ['error', 'single'],
    quoutes: 0,
    avoidEscape: 0,
    allowTemplateLiterals: 0,
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'prettier/prettier': 0,
    'no-console': 0,
    'no-var': 0,
    'prefer-const': 0
  }
}
