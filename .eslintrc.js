module.exports = {
  extends: 'eslint:recommended',
  globals: {
    __DEV__: false
  },
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true
  },
  ecmaFeatures: {
    modules: true,
    jsx: true
  },
  plugins: ['react'],
  rules: {
    indent: 'off',
    'prefer-const': 2,
    'no-unused-vars': 2,
    quotes: [2, 'single'],
    'eol-last': [0],
    'no-mixed-requires': [0],
    'no-underscore-dangle': [0],
    // 'jsx-quotes': [2, 'prefer-double'],
    'react/jsx-no-undef': 1,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1
  },
  settings: {
    'import/extensions': ['js', 'jsx']
  }
}
