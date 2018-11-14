module.exports = function generateConfig(api) {
  api.cache(true)

  const presets = [
    ['@babel/preset-env', { useBuiltIns: 'usage', modules: false }],
  ]

  const plugins = [
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: './src',
        rootPathPrefix: '#',
      },
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'BEX.createNode',
        pragmaFrag: 'BEX.Fragment',
      },
    ],
  ]

  return {
    presets,
    plugins,
  }
}
