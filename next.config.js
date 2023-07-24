module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.geojson$/,
      use: ["json-loader"]
    });
    return config
  },
  devIndicators: {
    autoPrerender: true
  },
  reactStrictMode: true,
};
