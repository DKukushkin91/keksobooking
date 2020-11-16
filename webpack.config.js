const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/data.js",
    "./js/picture.js",
    "./js/message.js",
    "./js/backend.js",
    "./js/pins.js",
    "./js/form.js",
    "./js/debounce.js",
    "./js/filter.js",
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
