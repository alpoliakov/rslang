module.exports = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
    });

    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      use: ['graphql-let/schema/loader'],
    });

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: 'yaml-loader',
    });

    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      use: {
        loader: 'file-loader',
      },
    });

    return config;
  },
  env: {
    CLOUD_UPDATE_PRESET: 'travel',
    CLOUD_NAME: 'dixialex',
    CLOUD_API: 'https://api.cloudinary.com/v1_1/dixialex/image/upload',
  },
};
