const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ['@babel/polyfill',"./src/index.js"], // specifie the entry file
  output: {
    // is were we want the compiled js file to go
    path: path.join(__dirname, "./static/frontend/"),
    filename: "main.js", // the name of the compiled file
  },
  module: {
    // here we will specify our loader
    rules: [
      {
        test: /\.js$/, //it is the regular expression that will look for the all the js and JXS files wh
        // which are needed for babel to compile
        exclude: /node_modules/, //excluding node_modules
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/, //excluding node_modules
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
