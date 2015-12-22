module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  plugins: [
    'react'
  ],
  rules: {
    'no-unused-vars': [2, { args: 'none' }],
    quotes: [2, 'single'],
    'eol-last': [0],
    'no-mixed-requires': [0],
    'no-underscore-dangle': [0],
    'jsx-quotes': 1,
    'react/jsx-no-undef': 1,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1
  }
}
