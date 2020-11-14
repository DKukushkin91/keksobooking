const path = require("path");

module.exports = {
  entry: [
  "./js/util.js",
  "./js/data.js",
  "./js/load.js",
  "./js/pins.js",
  "./js/upload.js",
  "./js/debounce.js",
  "./js/filter.js",
  "./js/picture.js",
  "./js/form.js",
  "./js/card.js",
  "./js/main.js",
  ],

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },

  devtool: false
};
