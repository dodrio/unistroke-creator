module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  settings: {
    'import/resolver': {
      webpack: {},
      'babel-plugin-root-import': {
        rootPathSuffix: './src',
        rootPathPrefix: '#',
      },
    },
    react: {
      createClass: 'createNode',
      pragma: 'BEX',
      version: '*',
    },
  },
}
