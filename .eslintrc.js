module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['react-native'],
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    semi: [2, 'always'],
    'no-multiple-empty-lines': [2, { max: 1 }],
    'no-unused-vars': [2, { args: 'none' }],
    'react/react-in-jsx-scope': 0,
    'react-native/no-inline-styles': 2,
    'react-native/no-unused-styles': 2,
    'react-native/no-single-element-style-arrays': 2,
    'react-native/no-color-literals': 2,
    'react/sort-comp': 2,
  },
};
