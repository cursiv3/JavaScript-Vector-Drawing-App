const webpack = require("webpack");

let config = {
  entry: "./public/drawApp.js",
  output: {
    filename: "bundle.js",
    libraryTarget: "var",
    library: "entry"
  }
};

module.exports = config;
