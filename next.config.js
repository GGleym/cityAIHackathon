module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.geojson$/,
      use: ["json-loader"]
    })
    return config
  },
  transpilePackages: ["@deck.gl/layers", "@mapbox/tiny-sdf"],
  experimental: {
    esmExternals: "loose"
  }
}

