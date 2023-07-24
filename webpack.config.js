const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";

const config = {
  entry: "./pages/map/Map.js",
  output: {
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    host: "localhost",
    port: "3000"
  },
  externalsType: "script",
  externals: {
    ymaps3: [
      `promise new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = "https://api-maps.yandex.ru/3.0-beta/?apikey=fd528e89-12e5-460b-a4cb-7f2c3b3e00fc&lang=ru-RU";
        script.async = true;
        script.onload = () => {
          ymaps3.ready.then(() => resolve(ymaps3));
          script.remove();
        };
        document.body.appendChild(script);
      })`
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."]
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
