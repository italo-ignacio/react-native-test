module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      ['nativewind/babel'],
      [
        'module-resolver',
        {
          alias: {
            assets: './src/assets',
            data: './src/data',
            domain: './src/domain',
            infra: './src/infra',
            main: './src/main',
            presentation: './src/presentation',
            store: './src/store',
            validation: './src/validation'
          },
          extensions: ['.ts', '.tsx']
        }
      ]
    ],
    presets: ['babel-preset-expo']
  };
};
